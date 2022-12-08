package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.CategoProd;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;

@Getter
@Setter
@ToString
public class DtProductoCarrito implements Serializable {
    private Long id;
    private Long idProducto;
    private String nombreProducto;
    private CategoProd categoria;
    private String descripcion;
    private int cantidad;
    private double total;
    private DtProducto dtProducto;

    public DtProductoCarrito() {
    }

    public DtProductoCarrito(Long id, Long idProducto, String nombreProducto, CategoProd categoria, String descripcion, int cantidad, double total) {
        this.id = id;
        this.idProducto = idProducto;
        this.nombreProducto = nombreProducto;
        this.categoria = categoria;
        this.descripcion = descripcion;
        this.cantidad = cantidad;
        this.total = total;
    }
}
