package com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums;

public enum EstadoProdCarrito {
    AGREGADO("AGREGADO"),
    ELIMINADO("ELIMINADO"),
    COMPRADO("COMPRADO");

    private final String descripcion;

    private EstadoProdCarrito(String descripcion) {
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }

}