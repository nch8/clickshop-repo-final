package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;


import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DtAuxLogin {
    private boolean succes;
    private String mensaje;

    public DtAuxLogin(boolean succes, String mensaje) {
        this.succes = succes;
        this.mensaje = mensaje;
    }

    public DtAuxLogin() {
    }
}
