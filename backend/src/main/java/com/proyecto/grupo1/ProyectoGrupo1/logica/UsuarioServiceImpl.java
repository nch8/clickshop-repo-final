package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.dao.*;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoCompra;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Cliente;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Compra;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Producto;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Vendedor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UsuarioServiceImpl implements UsuarioService{
    final
    VendedorDao vendedorDao;

    final
    ClienteDao cliDao;

    final
    AdministradorDao administradorDao;
    final
    CompraDao compraDao;

    final ProductoDao pdao;


    public UsuarioServiceImpl(VendedorDao vendedorDao, ClienteDao cliDao, AdministradorDao administradorDao, CompraDao compraDao, ProductoDao pdao) {
        this.vendedorDao = vendedorDao;
        this.cliDao = cliDao;
        this.administradorDao = administradorDao;
        this.compraDao = compraDao;
        this.pdao = pdao;
    }

    @Override
    public ObjResponse eliminarCuenta(Long idUser, Rol rol){
        if(rol == Rol.ROL_CLIENTE){
            try{
                Cliente c = cliDao.findClienteById(idUser);
                c.setEliminado(true);
                cliDao.save(c);
                return new ObjResponse("Exito, se ha eliminado la cuenta de usuario",HttpStatus.OK.value(), 0L, null, "Exito" );
            }catch (Exception e){
                return new ObjResponse("Error inesperado", HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
            }
        } else if (rol == Rol.ROL_VENDEDOR) {
            try{
                Cliente c = cliDao.findClienteById(idUser);
                Vendedor v = vendedorDao.findVendedorByCliente(c);
                List<Compra> compras = compraDao.findCompraByEstadoAndProductoCarrito_Producto_Vendedor(EstadoCompra.ENTREGA_DEFINIDA, v);
                if(compras.isEmpty()){
                    v.setEliminado(true);
                    c.setEliminado(true);
                    List<Producto> productos = pdao.getAllByVendedor_Id(v.getId());
                    for(Producto p : productos){
                        p.setActivo(false);
                    }
                    pdao.saveAll(productos);
                    vendedorDao.save(v);
                    cliDao.save(c);
                    return new ObjResponse("Exito, se ha eliminado la cuenta de usuario",HttpStatus.OK.value(), 0L, null, "Exito" );
                }else{
                    return new ObjResponse("Error, no se ha eliminado la cuenta de usuario, el vendedor tiene compras pendientes",HttpStatus.BAD_REQUEST.value(),  0L, null, "Error" );
                }

            }catch (Exception e){
                return new ObjResponse("Error inesperado", HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error");
            }
        }
        return new ObjResponse("No se ha encontrado usuario", HttpStatus.BAD_REQUEST.value(), null);
    }


}
