package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "MetodoEntrega", indexes = {
        @Index(name = "idx_metodoentrega_id", columnList = "id")
})
@Getter
@Setter
@ToString
public abstract class MetodoEntrega {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private LocalDateTime fechaDesde;
    private LocalDateTime fechaHasta;

    public MetodoEntrega(Long id, LocalDateTime fechaDesde, LocalDateTime fechaHasta) {
        this.id = id;
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
    }


    public MetodoEntrega() {

    }
}
