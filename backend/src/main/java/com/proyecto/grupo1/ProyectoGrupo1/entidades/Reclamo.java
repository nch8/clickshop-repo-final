package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtReclamo;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoReclamo;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoResolucion;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;

@Entity
@Table(name = "Reclamo", indexes = {
        @Index(name = "idx_reclamo_id", columnList = "id")
})
@Getter @Setter @ToString
public class Reclamo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Enumerated(EnumType.STRING)
    private EstadoReclamo estado;
    @Enumerated(EnumType.STRING)
    private EstadoResolucion resolucion;
    private String descripcion;
    private Date fechaInicio;
    private Date fechaUltEstado;

    @OneToOne(optional = false)
    private Compra compra;

    public Reclamo() {
    }

    //Constructor inicial
    public Reclamo(String descripcion, Compra compra) {
        this.estado = EstadoReclamo.INICIADO;
        this.descripcion = descripcion;
        this.fechaInicio = Calendar.getInstance().getTime();
        this.fechaUltEstado = Calendar.getInstance().getTime();;
        this.compra = compra;
    }

    public DtReclamo obtenerDtReclamo(){
        return new DtReclamo(
                this.getCompra().getId(),
                this.getEstado(),
                this.getResolucion(),
                this.getDescripcion(),
                this.getFechaUltEstado(),
                this.getCompra().obtenerDtCompra()
        );
    }
}
