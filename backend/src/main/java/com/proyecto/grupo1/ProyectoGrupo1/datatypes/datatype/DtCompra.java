package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoCompra;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.Date;
import java.util.List;

@Getter
@Setter
@ToString
public class DtCompra {
    private Long id;
    private Long idCliente;
    private Date fecha;
    private String nombreProducto;
    private int cantidad;
    private double total;
    private EstadoCompra estado;
    private DtProducto producto;
    private DtReclamo reclamo;
    private List<String> metodosEntrega;
    private DtEntregaCompra entrega;

    private DtCalificacion calificacionCli;

    private DtCalificacion calificacionVen;

    public DtCompra(Long id, Date fecha, String nombreProducto, int cantidad, double total, List<String> metodosEntrega) {
        this.id = id;
        this.fecha = fecha;
        this.nombreProducto = nombreProducto;
        this.cantidad = cantidad;
        this.total = total;
        this.metodosEntrega = metodosEntrega;
    }

    public DtCompra(Long id, Date fecha, String nombreProducto, int cantidad, double total, DtEntregaCompra entrega) {
        this.id = id;
        this.fecha = fecha;
        this.nombreProducto = nombreProducto;
        this.cantidad = cantidad;
        this.total = total;
        this.entrega = entrega;
    }

    public DtCompra(Long id, Date fecha, String nombreProducto, int cantidad, double total) {
        this.id = id;
        this.fecha = fecha;
        this.nombreProducto = nombreProducto;
        this.cantidad = cantidad;
        this.total = total;
    }

    public DtCompra(Long id, Date fecha, String nombreProducto, int cantidad, double total, EstadoCompra estado, DtProducto producto) {
        this.id = id;
        this.fecha = fecha;
        this.nombreProducto = nombreProducto;
        this.cantidad = cantidad;
        this.total = total;
        this.estado = estado;
        this.producto = producto;
    }
}
