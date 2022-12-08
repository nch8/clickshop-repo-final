package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtCalificacion {
    private Long idCompra;
    private Long idVendedor;
    private Long idCliente;
    private int estrellas;
    private String comentario;

    public DtCalificacion() {
    }

    public DtCalificacion(Long idCompra, int estrellas, String comentario) {
        this.idCompra = idCompra;
        this.estrellas = estrellas;
        this.comentario = comentario;
    }

    public DtCalificacion(Long idCompra, Long idVendedor, Long idCliente, int estrellas, String comentario) {
        this.idCompra = idCompra;
        this.idVendedor = idVendedor;
        this.idCliente = idCliente;
        this.estrellas = estrellas;
        this.comentario = comentario;
    }
}
