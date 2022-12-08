package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoReclamo;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoResolucion;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class DtReclamo {
    private Long idCompra;
    private EstadoReclamo estado;
    private EstadoResolucion resolucion;
    private String descripcion;
    private Date fechaUltEstado;
    private DtCompra infoCompra;

    public DtReclamo() {
    }

    public DtReclamo(Long idCompra, String descripcion) {
        this.idCompra = idCompra;
        this.descripcion = descripcion;
    }

    public DtReclamo(Long idCompra, EstadoReclamo estado, EstadoResolucion resolucion, String descripcion, Date fechaUltEstado, DtCompra infoCompra) {
        this.idCompra = idCompra;
        this.estado = estado;
        this.resolucion = resolucion;
        this.descripcion = descripcion;
        this.fechaUltEstado = fechaUltEstado;
        this.infoCompra = infoCompra;
    }
}
