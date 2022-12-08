package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.TipoPago;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "Pago", indexes = {
        @Index(name = "idx_pago_id", columnList = "id")
})
@Getter
@Setter
@ToString
public class Pago {
    @Id
    @SequenceGenerator(name = "pago_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "pago_id_seq")
    private Long id;
    private LocalDateTime fecha;
    @Enumerated(EnumType.STRING)
    private TipoPago metodo;
    private boolean liberado;

    private String idPagoExterno;

    @OneToMany(mappedBy = "pago",fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Compra> compras;
    public Pago() {
    }

    public Pago(LocalDateTime fecha, TipoPago metodo, boolean liberado, String idPagoExterno) {
        this.fecha = fecha;
        this.metodo = metodo;
        this.liberado = liberado;
        this.idPagoExterno = idPagoExterno;
    }
}
