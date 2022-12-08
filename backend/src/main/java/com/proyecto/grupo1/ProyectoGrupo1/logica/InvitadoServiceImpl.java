package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.dao.AdministradorDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.ClienteDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.DireccionDao;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.*;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.TipoUsuario;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.*;
import com.proyecto.grupo1.ProyectoGrupo1.seguridad.PasswordSevice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;


@Service
public class InvitadoServiceImpl implements InvitadoService{

    final
    ClienteDao clienteDao;

    final
    AdministradorDao adminDao;

    final
    PasswordSevice passService;

    final
    DireccionDao dirDao;
    final
    MailService mailService;

    public InvitadoServiceImpl(ClienteDao clienteDao, AdministradorDao adminDao, PasswordSevice passService, DireccionDao dirDao, MailService mailService) {
        this.clienteDao = clienteDao;
        this.adminDao = adminDao;
        this.passService = passService;
        this.dirDao = dirDao;
        this.mailService = mailService;
    }

    @Override
    public ObjResponse registrarCliente(DtRegistroCliente dt) {

        if (!correoRegistrado(dt.getCorreo()) && !documentoRegistrado(dt.getDocumento())) {
            if (!dt.getDirecciones().isEmpty()) {
                String pass = passService.hashearPassword(dt.getContrasena());
                Cliente cli = new Cliente(dt.getDocumento(), dt.getNombre(), dt.getApellido(), dt.getFechaNacimiento(), dt.getCorreo(), pass);
                try {
                    clienteDao.save(cli);
                    for (DtDireccion dtDir : dt.getDirecciones()) {
                        Direccion dir = new Direccion(dtDir.getCalle(), dtDir.getNumero(), dtDir.getApto(), dtDir.getBarrio(), dtDir.getCiudad(), dtDir.getDepartamento(), dtDir.isPrincipal(), TipoUsuario.CLIENTE);
                        dir.setCliente(cli);
                        dirDao.save(dir);
                        //cli.getDirecciones().add(dir); Probar getDirecciones
                    }

                    Cliente c = clienteDao.findClienteByCorreoIgnoreCaseAndEliminadoIsFalse(cli.getCorreo());
                    return new ObjResponse("Exito", HttpStatus.CREATED.value(), c.getId(), c.getRol(), null);
                } catch (Exception e) {
                    return new ObjResponse("Error inesperado", HttpStatus.BAD_REQUEST.value(), null);
                }
            }
            return new ObjResponse("Error, no se ha ingresado direccion", HttpStatus.BAD_REQUEST.value(), null);
        }

        return new ObjResponse("Error, ya existe un usuario registrado con los datos ingresados documento o correo", HttpStatus.BAD_REQUEST.value(), null);
    }
    @Override
    public DtAuxLogin login(DtLogin dtLogin) {
        Cliente c = clienteDao.findClienteByCorreoIgnoreCaseAndEliminadoIsFalse(dtLogin.getCorreo());
        if(c!=null){
            if(!c.isBloqueado()){
                if (passService.verificarHash(c.getContrasena(), dtLogin.getContrasena())){
                    if(dtLogin.getMobileToken() != null) {
                        c.setMobileToken(dtLogin.mobileToken);
                        clienteDao.save(c);
                    }
                    return new DtAuxLogin(true, "Exito");
                }
            }else{
                return new DtAuxLogin(false, "Usuario bloqueado");
            }
        }else{
            Administrador admin = adminDao.findAdministradorByCorreoIgnoreCaseAndEliminadoIsFalse(dtLogin.getCorreo());
            if(admin != null){
                if(!admin.isBloqueado()){
                    if(passService.verificarHash(admin.getContrasena(), dtLogin.getContrasena())){
                        return new DtAuxLogin(true, "Exito");
                    }
                }else{
                    return new DtAuxLogin(false, "Usuario bloqueado");
                }
            }
        }
        return new DtAuxLogin(false, "Error, usuario o contrasena incorrecto");
    }

    @Override
    public DtCliente obtenerCliente(Long id) {
        Cliente c = clienteDao.findClienteById(id);
        if (c != null) {
            return c.obtenerDt();
        }
        return null;
    }

    @Override
    public ObjResponse recuperarContrasena(String correo) {
        ObjResponse obj = new ObjResponse();
        obj.setCodeHttp(HttpStatus.BAD_REQUEST.value());
        obj.setMensaje("No se ha encontrado ningun usuario asociado al correo ingresado");
        obj.setObjeto("Error");
        obj.setIdUser(0L);
        if(!correo.isEmpty()){
            Cliente c = clienteDao.findClienteByCorreoIgnoreCaseAndEliminadoIsFalse(correo);
            Administrador admin = null;

            if(c == null){
                admin = adminDao.findAdministradorByCorreoIgnoreCaseAndEliminadoIsFalse(correo);
            }
            if(c == null && admin == null){
                return obj;
            }

            //Generacion de contrasena
            String caracteres =  "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqQqRrSsTtUuVvWwXxXxYyZz0123456789*-+/$"; //71 carac
            String newPass = "";
            for(int x = 0; x < 8; x++){
                int numero = (int)(Math.random()*71+1);
                newPass += caracteres.charAt(numero);
            }
            System.out.println("\n\nContrasena generada: "+newPass);
            String pass = passService.hashearPassword(newPass);
            if(c != null){
                c.setContrasena(pass);
                clienteDao.save(c);
            }else{
                admin.setContrasena(pass);
                adminDao.save(admin);
            }

            String asunto = "ClickShop, no responder - Recuperacion de contrasena ";
            String mensaje = "Estimado usuario, el preceso de recuperacion de contrasena se ha completado correctamente." +
                    "\nSu nueva contrasena es: "+newPass+"" +
                    "\nInicie sesion con las credeciales otorgadas, se recomienda cambiar la contrasena por una nueva." +
                    "\n\n.: ClickShop :.";
            enviarMailRecuperacion(correo,asunto,mensaje);

            obj.setCodeHttp(HttpStatus.OK.value());
            obj.setMensaje("Se ha restablecido la contrasena correctamente");
            obj.setObjeto("Exito");
        }

        return obj;
    }

    public boolean correoRegistrado(String correo){
        return clienteDao.findClienteByCorreoIgnoreCaseAndEliminadoIsFalse(correo) != null || adminDao.findAdministradorByCorreoIgnoreCaseAndEliminadoIsFalse(correo) != null;
    }
    public boolean documentoRegistrado(String documento) {
        return clienteDao.findClienteByDocumentoIgnoreCase(documento) != null || adminDao.findAdministradorByDocumentoIgnoreCase(documento) != null;
    }

    public String enviarMailRecuperacion(String correo, String asunto, String mensaje){
        MailRequest mail = new MailRequest();
        mail.setTo(correo);
        mail.setSubject(asunto);
        mail.setText(mensaje);
        try {
            mailService.sendMail(mail);
            return "";
        }catch (Exception e){
            return "\n No se ha podido enviar correo al vendedor para notificarlo.";
        }

    }

    /*
    @Override
    public ObjResponse registrarAdministrador(String correo, String contra) {

        if (!correoRegistrado(correo)) {
            String pass = passService.hashearPassword(contra);
            String[] parts = correo.split("@");
            String nombre = parts[0]; // seteo la parte anteriro al @ del correo como nombre

            Administrador admin = new Administrador(nombre, correo, pass);
            try {
                adminDao.save(admin);
                return new ObjResponse("Exito", HttpStatus.CREATED.value(), 0L, null, "Exito");
            } catch (Exception e) {
                return new ObjResponse("Error inesperado", HttpStatus.BAD_REQUEST.value(), null);
            }
        }
        return new ObjResponse("Error, ya existe un usuario registrado con los datos ingresados documento o correo", HttpStatus.BAD_REQUEST.value(), null);
    }*/
}
