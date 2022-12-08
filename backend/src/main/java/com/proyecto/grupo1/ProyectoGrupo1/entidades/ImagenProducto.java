package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "ImagenProducto", indexes = {
        @Index(name = "idx_imagenproducto_id", columnList = "id")
})
@Getter
@Setter
public class ImagenProducto {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String url;

    @ManyToOne(optional = false)
    private Producto producto;

    public ImagenProducto() {
    }

    public ImagenProducto(String url) {
        this.id = id;
        this.url = url;
        this.producto = producto;
    }

    public ImagenProducto(String url, Producto producto) {
        this.url = url;
        this.producto = producto;
    }
}
