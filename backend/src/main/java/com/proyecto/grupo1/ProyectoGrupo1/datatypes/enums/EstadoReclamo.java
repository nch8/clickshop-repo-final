package com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums;

public enum EstadoReclamo {
    INICIADO("Iniciado"),
    ACEPTADO("Aceptado"),
    PENDIENTE("Pendiente"),
    FINALIZADO("Finalizado");

    private final String descripcion;

    private EstadoReclamo(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }

}