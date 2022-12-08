package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoProdCarrito;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.TipoNotificacion;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Table(name = "ProductoCarrito", indexes = {
        @Index(name = "idx_productocarrito_id", columnList = "id")
})
@Getter
@Setter
@ToString
public class ProductoCarrito {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Enumerated(EnumType.STRING)
    private EstadoProdCarrito estado;
    private int cantidad;
    private double total;

    @ManyToOne(optional = false)
    private Cliente cliente;

    @ManyToOne(optional = false)
    private Producto producto;

    @OneToOne(mappedBy = "productoCarrito", cascade = { CascadeType.PERSIST, CascadeType.REFRESH }, orphanRemoval = true)
    private Compra compra;

    public ProductoCarrito() {
    }

    public ProductoCarrito(int cantidad, Cliente cliente, Producto producto) {
        this.estado = EstadoProdCarrito.AGREGADO;
        this.cantidad = cantidad;
        this.total = cantidad * producto.getPrecio();
        this.cliente = cliente;
        this.producto = producto;
    }

}
