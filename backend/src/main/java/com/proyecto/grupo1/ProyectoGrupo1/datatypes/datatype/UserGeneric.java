package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class UserGeneric {

    private Long idUsr;
    private String correo;
    private String contrasena;
    private Rol rol;

    public UserGeneric() {
    }

    public UserGeneric(Long idUsr, String correo, String contrasena, Rol rol) {
        this.idUsr = idUsr;
        this.correo = correo;
        this.contrasena = contrasena;
        this.rol = rol;
    }
}
