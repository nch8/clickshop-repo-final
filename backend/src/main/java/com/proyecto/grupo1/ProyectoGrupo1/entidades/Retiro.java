package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.OneToOne;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter @Setter @ToString
public class Retiro extends MetodoEntrega{
    private boolean confirmado;

    @OneToOne(optional = false)
    private Compra compra;

    public Retiro(Long id, LocalDateTime fechaDesde, LocalDateTime fechaHasta, boolean confirmado) {
        super(id, fechaDesde, fechaHasta);
        this.confirmado = confirmado;
    }

    public Retiro(boolean confirmado) {
        this.confirmado = confirmado;
    }

    public Retiro() {

    }
}
