package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DtVendedorBO {
    private Long idVendedor;
    private String nombreComercial;
    private Boolean habilitado;

    public DtVendedorBO(Long idVendedor, String nombreComercial, Boolean habilitado) {
        this.idVendedor = idVendedor;
        this.nombreComercial = nombreComercial;
        this.habilitado = habilitado;
    }
}
