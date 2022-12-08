package com.proyecto.grupo1.ProyectoGrupo1.controladores;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtUsrHeader;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.UserGeneric;
import com.proyecto.grupo1.ProyectoGrupo1.logica.UsuarioService;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/priv")
public class UserController {
    final UsuarioService usuServ;

    public UserController(UsuarioService usuServ) {
        this.usuServ = usuServ;
    }

    /*
    @GetMapping
    public Map<String, Object> getUserName() {
        //Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //UserGeneric usr = authentication.getClass()
        // usr = (UserGeneric) authentication.getPrincipal(); //Obtengo el userGeneric con los datos del usuario que esta loguado

        Map<String, Object> userMap = new HashMap<>();
        //userMap.put("correo", usr.getCorreo());
        //userMap.put("username", authentication.getName());
        userMap.put("error", false);
        userMap.put("Nombre ", "Peñarol");
        userMap.put("Club ", " deportivo Maldonado");
        return userMap;
    }*/

    @RequestMapping(value = "/getHeader", method = RequestMethod.GET)
    public DtUsrHeader getHeader() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserGeneric usr = (UserGeneric) authentication.getPrincipal(); //Obtengo el userGeneric con los datos del usuario que esta loguado
        return  new DtUsrHeader(usr.getIdUsr(), usr.getRol());
    }

    @RequestMapping(value = "/eliminarCuenta", method = RequestMethod.POST)
    public ObjResponse eliminarCuenta(@RequestParam Long idUsuario){
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserGeneric usr = (UserGeneric) authentication.getPrincipal(); //Obtengo el userGeneric con los datos del usuario que esta loguado
        if(usr.getIdUsr() == idUsuario){
            return usuServ.eliminarCuenta(usr.getIdUsr(),usr.getRol());
        }
        return new ObjResponse("Error, datos incorrectos", HttpStatus.INTERNAL_SERVER_ERROR.value(), "Error");
    }


}
