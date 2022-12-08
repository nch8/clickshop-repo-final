package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtCalificacion;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Calificacion", indexes = {
        @Index(name = "idx_calificacion_id", columnList = "id")
})
@Getter @Setter @ToString
public class Calificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private int estrellas;
    private String comentario;
    private Date fecha;

    @ManyToOne
    private Compra compra;
    @ManyToOne
    private Cliente cliente;
    @ManyToOne
    private Vendedor vendedor;

    public Calificacion() {
    }

    public Calificacion(Compra compra, int estrellas, String comentario) {
        this.compra = compra;
        this.estrellas = estrellas;
        this.comentario = comentario;
        this.fecha = new java.util.Date();;
    }

    public DtCalificacion obtenerDtCalificacion(){
        return new DtCalificacion(
                this.compra.getId(),
                this.estrellas,
                this.comentario
        );
    }
}

