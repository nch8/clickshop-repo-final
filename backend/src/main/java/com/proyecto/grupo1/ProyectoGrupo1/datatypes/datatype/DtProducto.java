package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@ToString
public class DtProducto implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String nombre;
    private String descripcion;
    private double precio;
    private int stock;
    private String categoria;
    private boolean activo;

    private Long idVendedor;

    private List<String> imagenesUrl;

    public DtProducto() {
    }

    public DtProducto(Long id, String nombre, String descripcion, double precio, int stock, String categoria, boolean activo, Long idVendedor, List<String> imagenesUrl) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.activo = activo;
        this.idVendedor = idVendedor;
        this.imagenesUrl = imagenesUrl;
    }

    public DtProducto(Long id, List<String> imagenesUrl) {
        this.id = id;
        this.imagenesUrl = imagenesUrl;
    }
}