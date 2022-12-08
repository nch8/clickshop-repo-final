package com.proyecto.grupo1.ProyectoGrupo1.controladores;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtUsuarioBO;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;
import com.proyecto.grupo1.ProyectoGrupo1.logica.AdministradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class AdministradorController {
    @Autowired
    AdministradorService admServ;

    @RequestMapping(value = "api/administrador/getPendientes", method = RequestMethod.GET)
    public ObjResponse listarVendedoresRegistradosPendientes(){
        return admServ.vendedoresPendientes();
    }
    @RequestMapping(value = "api/administrador/getAprobados", method = RequestMethod.GET)
    public ObjResponse listarVendedoresRegistradosAprobados(){
        return admServ.vendedoresAprobados();
    }
    @RequestMapping(value = "api/administrador/getVendedores", method = RequestMethod.GET)
    public ObjResponse listarVendedoresRegistrados(){
        return admServ.listadoVendedores();
    }
    @RequestMapping(value = "api/administrador/cambiarEstadoPendientes", method = RequestMethod.POST)
    public ObjResponse cambiarEstadoVendedoresPendientes(@RequestParam Long idVendedor,
                                                   @RequestParam boolean aprobado){
        return admServ.cambiarEstadoVendedor(idVendedor, aprobado);
    }
    @RequestMapping(value = "api/administrador/listarTodosUsuarios", method = RequestMethod.GET)
    public ObjResponse listarTodosUsuarios(){
        return admServ.listarUsuarios();
    }
    @RequestMapping(value = "api/administrador/habilitarDeshabilitarUsuarios", method = RequestMethod.POST)
    public ObjResponse habilitarDeshabilitarUsuarios(@RequestParam String correo,
                                                         @RequestParam String rol, @RequestParam boolean bloqueado){
        return admServ.bloquearDesbloquerUsuarios(correo, rol, bloqueado);
    }
    @RequestMapping(value = "api/administrador/buscarUsuarios", method = RequestMethod.GET)
    public ObjResponse buscarUsuarios(@RequestParam String correo){
            return admServ.buscarUsuarios(correo);
    }
    @RequestMapping(value = "api/administrador/eliminarCuentaUsuario", method = RequestMethod.POST)
    public ObjResponse eliminarCuentaUsuario(@RequestParam Long idUsuario, @RequestParam Rol rol){
        return admServ.eliminarCuentaUsuario(idUsuario, rol);
    }
    @RequestMapping(value = "api/administrador/registrarAdmin", method = RequestMethod.POST)
    public ObjResponse registrarAdmin(@RequestParam String correo, @RequestParam String pass){
        return admServ.registrarAdministrador(correo, pass);
    }
}
