package com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums;

public enum EstadoResolucion {

    RECHAZADO("Reclamo rechazado"),
    REEMBOLSO("Reembolso del producto"),
    REENVIO("Reenvío del producto");

    private final String descripcion;

    private EstadoResolucion(String descripcion){
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
