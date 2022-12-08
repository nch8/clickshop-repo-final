package com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums;

public enum TipoNotificacion {
    MENSAJE("Mensaje"),
    PUSH("Push"),
    ALERTA("Alerta");

    private final String descripcion;

    private TipoNotificacion(String descripcion){
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}