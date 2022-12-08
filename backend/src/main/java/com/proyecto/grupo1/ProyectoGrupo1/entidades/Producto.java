package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtProducto;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.CategoProd;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Producto", indexes = {
        @Index(name = "idx_producto_id", columnList = "id")
})
@Getter @Setter @ToString
public class Producto {
    @Id
    @SequenceGenerator(name = "producto_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "producto_seq")
    private Long id;
    private String nombre;
    private String descripcion;
    private double precio;
    private int stock;
    @Enumerated(EnumType.STRING)
    private CategoProd categoria;
    private boolean activo;

    @ManyToOne(optional = false)
    private Vendedor vendedor;

    @OneToMany(mappedBy = "producto", cascade = { CascadeType.PERSIST, CascadeType.REFRESH }, orphanRemoval = true)
    private List<ProductoCarrito> productoCarritos = new ArrayList<ProductoCarrito>();

    @OneToMany(mappedBy = "producto", cascade = { CascadeType.PERSIST, CascadeType.REFRESH }, orphanRemoval = true)
    private List<ImagenProducto> imagenesProducto = new ArrayList<ImagenProducto>();

    public Producto() {

    }

    public Producto(String nombre, String descripcion, double precio, int stock, CategoProd categoria, boolean activo, Vendedor vendedor) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.stock = stock;
        this.categoria = categoria;
        this.activo = activo;
        this.vendedor = vendedor;
    }

    public DtProducto obtenerDtProducto(){
        return new DtProducto(
                this.id,
                this.nombre,
                this.descripcion,
                this.precio,
                this.stock,
                this.categoria.toString(),
                this.activo,
                this.vendedor.getId(),
                this.obtenerArregloImagenes()
        );
    }

    public List<String> obtenerArregloImagenes(){
        List<String> img = new ArrayList<String>();
        for (ImagenProducto i : this.imagenesProducto){
            img.add(i.getUrl());
        }
        return  img;
    }
}
