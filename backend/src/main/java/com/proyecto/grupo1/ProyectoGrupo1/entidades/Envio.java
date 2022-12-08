package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Getter @Setter @ToString
public class Envio extends MetodoEntrega{
    private boolean confirmado;

    @ManyToOne
    private Direccion direccion;

    @OneToOne(optional = false)
    private Compra compra;

    public Envio(Long id, LocalDateTime fechaDesde, LocalDateTime fechaHasta, boolean confirmado) {
        super(id, fechaDesde, fechaHasta);
        this.confirmado = confirmado;
    }

    public Envio(boolean confirmado) {
        this.confirmado = confirmado;
    }

    public Envio() {

    }
}
