package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.dao.ClienteDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.DireccionDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.ProductoDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.VendedorDao;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.*;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.CategoProd;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.TipoUsuario;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class VendedorServiceImpl implements VendedorService{
    @Autowired
    ClienteDao clienteDao;

    @Autowired
    VendedorDao vendedorDao;

    @Autowired
    DireccionDao dirDao;

    @Autowired
    ProductoDao productoDao;


    @Override
    public ObjResponse registrardireccion(DtRegistroDireccion dt) {

        Vendedor v = vendedorDao.findVendedorById(dt.getIdUsuario());
        if(v == null){
            return new ObjResponse("Error, no existe el usuario ingresado o no esta registrado como vendedor", HttpStatus.BAD_REQUEST.value(), null);
        }

        try {
            for (DtDireccion dtDir : dt.getDirecciones()) {
                Direccion dir = new Direccion(dtDir.getCalle(), dtDir.getNumero(), dtDir.getApto(), dtDir.getBarrio(), dtDir.getCiudad(), dtDir.getDepartamento(), dtDir.isPrincipal(), TipoUsuario.VENDEDOR);
                dir.setVendedor(v);
                dirDao.save(dir);
                //v.getDirecciones().add(dir);
            }
            return new ObjResponse("Se ha registrado la/s direccion/es", HttpStatus.OK.value(), null);
        }catch (Exception e){
            return new ObjResponse("Error al ingresar direccion", HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
        }

    }

    @Override
    public ObjResponse registrarseComoVendedor(DtRegistroVendedor dt) {
        Cliente c = clienteDao.findClienteById(dt.getIdUsr());

        if(c == null || c.getVendedor() != null){
            String mensaje = "Error, ya existe un registro como vendedor asociado al cliente";
            if(c == null)
                mensaje = "No se ha encontrado el cliente";
            return new ObjResponse(mensaje, HttpStatus.BAD_REQUEST.value(), null);
        }
        Vendedor v = new Vendedor(c, dt.getNombreComercial(), dt.isHabilitaEnvio());
        try {
            vendedorDao.save(v);
            try {
                for (DtDireccion dtDir : dt.getDirecciones()) {
                    Direccion dir = new Direccion(dtDir.getCalle(), dtDir.getNumero(), dtDir.getApto(), dtDir.getBarrio(), dtDir.getCiudad(), dtDir.getDepartamento(), dtDir.isPrincipal(), TipoUsuario.VENDEDOR);
                    dir.setVendedor(v);
                    dirDao.save(dir);
                    //cli.getDirecciones().add(dir); Probar getDirecciones
                }
            }catch (Exception e){
                return new ObjResponse("Error al ingresar direccion, debe dar de alta por datos USR", HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
            }

            return new ObjResponse("Vendedor registrado", HttpStatus.CREATED.value(), vendedorDao.findVendedorByCliente(c).getId(), null, null);
        }catch (Exception e){
            return new ObjResponse("Error inesperado", HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
        }

    }

    @Override
    public ObjResponse registrarProductos(List<DtProducto> productos) {
        if(productos.size() < 3){
            return new ObjResponse("Error se deben ingresar al menos 3 productos", HttpStatus.BAD_REQUEST.value(), null);
        }
        DtProducto dtp = productos.get(0);
        Vendedor vendedor = vendedorDao.findVendedorById(dtp.getIdVendedor());
        if(vendedor == null){
            return new ObjResponse("Error, no se ha encontrado el vendedor", HttpStatus.BAD_REQUEST.value(), null);
        }

        for(DtProducto dt : productos){

            List<ImagenProducto> imagenes = new ArrayList<>();

            Producto producto = new Producto(
                    dt.getNombre(),
                    dt.getDescripcion(),
                    dt.getPrecio(),
                    dt.getStock(),
                    CategoProd.valueOf(dt.getCategoria()),
                    false,
                    vendedor
            );

            for(String url : dt.getImagenesUrl()){
                ImagenProducto aux = new ImagenProducto(url, producto);
                imagenes.add(aux);
            }

            producto.setImagenesProducto(imagenes);

            try {
                productoDao.save(producto);
            }catch (Exception e) {
                return new ObjResponse("Error inesperado", HttpStatus.BAD_REQUEST.value(),null);
            }
        }
        return new ObjResponse("Exito, se han registrado los productos", HttpStatus.CREATED.value(),null);
    }

    @Override
    public ObjResponse cambiarEstadoEnvios(Long idVendedor, boolean habilitado) {
        Vendedor v = vendedorDao.findVendedorById(idVendedor);
        ObjResponse obj = new ObjResponse("Exito, ", HttpStatus.CREATED.value(),0L, null,"Exito");
        String msjOp = "";
        if(v!= null && v.getHabilitado() != null && v.getHabilitado()){
            try {
                v.setHabilitaEnvio(habilitado);
                vendedorDao.save(v);
                if(habilitado)
                    msjOp = "se ha habilitado correctamente el envio de productos";
                else
                    msjOp = "se ha deshabilitado correctamente el envio de productos";
                obj.setMensaje(obj.getMensaje()+msjOp);
            }catch (Exception e){
                obj = new ObjResponse("Error inesperado", HttpStatus.INTERNAL_SERVER_ERROR.value(),0L,null, "Error");
            }
        }else {
            obj = new ObjResponse("No se ha encontrado al vendedor", HttpStatus.BAD_REQUEST.value(),0L,null, "Error");
        }
        return obj;
    }
}
