package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DtUsuarioBO {
    private Long idUsr;
    private String correo;
    private Rol rol;
    private String nombre;
    private boolean bloqueado;

    public DtUsuarioBO(Long idUsr, String correo, Rol rol, String nombre, boolean bloqueado) {
        this.idUsr = idUsr;
        this.correo = correo;
        this.rol = rol;
        this.nombre = nombre;
        this.bloqueado = bloqueado;
    }

    public DtUsuarioBO() {
    }
}
