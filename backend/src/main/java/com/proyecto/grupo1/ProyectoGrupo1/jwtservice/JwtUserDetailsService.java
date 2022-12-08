package com.proyecto.grupo1.ProyectoGrupo1.jwtservice;

import com.proyecto.grupo1.ProyectoGrupo1.dao.AdministradorDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.ClienteDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.VendedorDao;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.UserGeneric;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Administrador;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Cliente;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Vendedor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class JwtUserDetailsService  {

    final ClienteDao cliDao;
    final AdministradorDao adminDao;
    final VendedorDao vendDao;

    public JwtUserDetailsService(ClienteDao cliDao, AdministradorDao adminDao, VendedorDao vendDao) {

        this.cliDao = cliDao;
        this.adminDao = adminDao;
        this.vendDao = vendDao;
    }

    public UserGeneric loadUserByEmail(String mail) throws UsernameNotFoundException {
        Cliente c = cliDao.findClienteByCorreoIgnoreCaseAndEliminadoIsFalse(mail);
        Vendedor v = null;
        Administrador admin = null;
        if (c != null && c.getVendedor() != null){
            v = c.getVendedor();
        }else{
            admin = adminDao.findAdministradorByCorreoIgnoreCaseAndEliminadoIsFalse(mail);
        }
        if(c == null && v == null && admin == null ){
            return  null;
        }

        if(c!=null && c.getVendedor() == null){
            return new UserGeneric(c.getId(), c.getCorreo(), c.getContrasena(), c.getRol());
        } else if (c != null && c.getVendedor() != null && (c.getVendedor().getHabilitado() == null || c.getVendedor().getHabilitado() == false || c.getVendedor().isEliminado())){
            return new UserGeneric(c.getId(), c.getCorreo(), c.getContrasena(), c.getRol());
        } else if (v != null && v.getHabilitado() == true && !v.isEliminado()) {
            return new UserGeneric(c.getId(), c.getCorreo(), c.getContrasena(), v.getRol());
        }else {
            return new UserGeneric(admin.getId(), admin.getCorreo(), admin.getContrasena(), admin.getRol());
        }
    }
}
