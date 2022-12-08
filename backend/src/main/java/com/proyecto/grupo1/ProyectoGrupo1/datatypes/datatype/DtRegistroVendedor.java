package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Getter @Setter @ToString
public class DtRegistroVendedor {
    private Long idUsr;
    private String nombreComercial;
    boolean habilitaEnvio;
    List<DtDireccion> direcciones;

    public DtRegistroVendedor(Long idUsr, String nombreComercial, boolean habilitaEnvio, List<DtDireccion> direcciones) {
        this.idUsr = idUsr;
        this.nombreComercial = nombreComercial;
        this.habilitaEnvio = habilitaEnvio;
        this.direcciones = direcciones;
    }

    public DtRegistroVendedor() {

    }
}
