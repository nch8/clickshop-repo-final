package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.dao.ClienteDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.DireccionDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.VendedorDao;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.*;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.TipoUsuario;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Cliente;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Direccion;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Vendedor;
import com.proyecto.grupo1.ProyectoGrupo1.seguridad.PasswordSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ClienteServiceImpl implements ClienteService{

    @Autowired
    ClienteDao clienteDao;
    @Autowired
    VendedorDao vendedorDao;
    @Autowired
    DireccionDao dirDao;
    @Autowired
    PasswordSevice passService;

    @Override
    public ObjResponse ingresarDireccion(DtRegistroDireccion dt) {
        Cliente c = clienteDao.findClienteById(dt.getIdUsuario());
        if(c == null ){
            return new ObjResponse("Error, no existe el usuario ingresado", HttpStatus.BAD_REQUEST.value(), null);
        }
        try {
            for (DtDireccion dtDir : dt.getDirecciones()) {
                Direccion dir = new Direccion(dtDir.getCalle(), dtDir.getNumero(), dtDir.getApto(), dtDir.getBarrio(), dtDir.getCiudad(), dtDir.getDepartamento(), dtDir.isPrincipal(), TipoUsuario.VENDEDOR);
                dir.setCliente(c);
                dirDao.save(dir);
                //c..getDirecciones().add(dir);
            }
            return new ObjResponse("Se ha registrado la/s direccion/es", HttpStatus.OK.value(), null);
        }catch (Exception e){
            return new ObjResponse("Error al ingresar direccion", HttpStatus.BAD_REQUEST.value(), null);
        }
    }

    @Override
    public ObjResponse consultarDirecciones(Long idCliente){
        List<Direccion> direcciones = dirDao.getAllByCliente_Id(idCliente);
        List<DtDireccion> ret = new ArrayList<DtDireccion>();

        for(Direccion d : direcciones){
            DtDireccion aux = new DtDireccion(
                    d.getId(),
                    d.getCalle(),
                    d.getNumero(),
                    d.getApto(),
                    d.getBarrio(),
                    d.getCiudad(),
                    d.getDepartamento(),
                    d.isPrincipal()
            );
            ret.add(aux);
        }

        try{
            return new ObjResponse("Exito", HttpStatus.OK.value(), idCliente, null, ret);
        }catch (Exception e){
            return new ObjResponse("Error genérico", HttpStatus.BAD_REQUEST.value(), null);
        }
    }

    @Override
    public ObjResponse modificarDireccion(DtDireccion dtD){
        Direccion direccion = dirDao.getById(dtD.getId());

        direccion.setCalle(dtD.getCalle());
        direccion.setNumero(dtD.getNumero());
        direccion.setApto(dtD.getApto());
        direccion.setBarrio(dtD.getBarrio());
        direccion.setCiudad(dtD.getCiudad());
        direccion.setDepartamento(dtD.getDepartamento());

        //cambio a false las otras direcciones si la que llegó es principal
        if(dtD.isPrincipal()){
            List<Direccion> direcciones = dirDao.getAllByCliente_Id(direccion.getCliente().getId());
            for (Direccion d : direcciones){
                if(d.isPrincipal()){
                    d.setPrincipal(false);
                }
            }
        }

        direccion.setPrincipal(dtD.isPrincipal());
        try{
            dirDao.save(direccion);
            return new ObjResponse("Exito", HttpStatus.OK.value(), dirDao.getById(dtD.getId()).obtenerDtDireccion());
        }catch (Exception e){
            return new ObjResponse("Error genérico", HttpStatus.BAD_REQUEST.value(), null);
        }
    }

    @Override
    public ObjResponse eliminarDireccion(Long idDireccion){
        Direccion direccion = dirDao.getById(idDireccion);
        try{
            dirDao.delete(direccion);
            return new ObjResponse("Exito", HttpStatus.OK.value(), null);
        }catch (Exception e){
            return new ObjResponse("Error genérico", HttpStatus.BAD_REQUEST.value(), null);
        }
    }

    @Override
    public ObjResponse modificarDatosCliente(DtCliente dtCliente) {
        Cliente cliente = clienteDao.findClienteById(dtCliente.getId());

        //cambio de contraseña
        if(dtCliente.getContrasenaNueva() != null && dtCliente.getContrasena() != null &&
                passService.verificarHash(cliente.getContrasena(), dtCliente.getContrasena())){
            cliente.setContrasena(passService.hashearPassword(dtCliente.getContrasenaNueva()));
        } else if (dtCliente.getContrasenaNueva() != null && dtCliente.getContrasena() != null &&
                !passService.verificarHash(cliente.getContrasena(), dtCliente.getContrasena())){
            return new ObjResponse("Error. Contraseña ingresada no coincide con la actual.", HttpStatus.BAD_REQUEST.value(), null);
        } else if (dtCliente.getContrasenaNueva() == null && dtCliente.getContrasena() != null ||
                dtCliente.getContrasenaNueva() != null && dtCliente.getContrasena() == null ){
            return new ObjResponse("Error. Contraseña ingresada no coincide con la actual.", HttpStatus.BAD_REQUEST.value(), null);
        }

        cliente.setDocumento(dtCliente.getDocumento());
        cliente.setNombre(dtCliente.getNombre());
        cliente.setApellido(dtCliente.getApellido());
        cliente.setFechaNacimiento(dtCliente.getFechaNacimiento());

        try{
            clienteDao.save(cliente);
            return new ObjResponse("Exito", HttpStatus.OK.value(), cliente.obtenerDtPublico());
        }catch (Exception e){
            return new ObjResponse("Error genérico", HttpStatus.BAD_REQUEST.value(), null);
        }
    }

    @Override
    public ObjResponse getCliente(Long idCliente) {
        Cliente cliente = clienteDao.findClienteById(idCliente);
        try{
            clienteDao.save(cliente);
            return new ObjResponse("Exito", HttpStatus.OK.value(), cliente.obtenerDtPublico());
        }catch (Exception e){
            return new ObjResponse("Error genérico", HttpStatus.BAD_REQUEST.value(), null);
        }
    }

}
