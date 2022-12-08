package com.proyecto.grupo1.ProyectoGrupo1.controladores;
import com.proyecto.grupo1.ProyectoGrupo1.dao.AdministradorDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.ClienteDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.DireccionDao;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.*;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.TipoUsuario;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Cliente;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Direccion;
import com.proyecto.grupo1.ProyectoGrupo1.jwtservice.JwtUserDetailsService;
import com.proyecto.grupo1.ProyectoGrupo1.logica.InvitadoService;
import com.proyecto.grupo1.ProyectoGrupo1.seguridad.JwtTokenUtil;
import com.proyecto.grupo1.ProyectoGrupo1.seguridad.PasswordSevice;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthenticationController {


    protected final Log logger = LogFactory.getLog(getClass());


    final InvitadoService serviceInv;
    final AuthenticationManager authenticationManager;
    final JwtUserDetailsService userDetailsService;
    final JwtTokenUtil jwtTokenUtil;


    public AuthenticationController(InvitadoService serviceInv, AuthenticationManager authenticationManager,
                                    JwtUserDetailsService userDetailsService, JwtTokenUtil jwtTokenUtil){
        this.serviceInv = serviceInv;
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.jwtTokenUtil = jwtTokenUtil;
    }

    @PostMapping("/login")
    public ObjResponse loginUser(@RequestBody DtLogin dtLogin) {
        try {
            DtAuxLogin resultado = serviceInv.login(dtLogin);
            if (resultado.isSucces()) {
                UserGeneric user = userDetailsService.loadUserByEmail(dtLogin.getCorreo());
                String token = jwtTokenUtil.generateToken(user);
                ObjResponse response = new ObjResponse("Exito", HttpStatus.OK.value(), user.getIdUsr(), user.getRol(), token);
                logger.info("Logged In");
                return response;
            } else {
                return new ObjResponse(resultado.getMensaje(), HttpStatus.UNAUTHORIZED.value(),0L, null, null);
            }
        } catch (DisabledException e) {
            e.printStackTrace();
            return new ObjResponse("Error inesperado", HttpStatus.INTERNAL_SERVER_ERROR.value(), 0L, null, null);
        } catch (BadCredentialsException e) {
            return new ObjResponse("Error, usuario o contrasena incorrecto", HttpStatus.UNAUTHORIZED.value(),0L, null, null);
        } catch (Exception e) {
            return new ObjResponse("Error inesperado", HttpStatus.INTERNAL_SERVER_ERROR.value(),0L, null, null);
        }
    }

    @PostMapping("/registrar")
    public ObjResponse saveUser(@RequestBody DtRegistroCliente dt) {
        return serviceInv.registrarCliente(dt);
    }

}
