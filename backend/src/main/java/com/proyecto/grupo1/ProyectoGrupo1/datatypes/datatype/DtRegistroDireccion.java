package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class DtRegistroDireccion {
    private Long idUsuario;
    private List<DtDireccion> direcciones;

    public DtRegistroDireccion(Long idUsuario, List<DtDireccion> direcciones) {
        this.idUsuario = idUsuario;
        this.direcciones = direcciones;
    }

    public DtRegistroDireccion() {
    }
}
