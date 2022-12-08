package com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums;

public enum CategoProd {

    INDUMENTARIA("Infumentaria"),
    ELECTRODOMESTICOS("Electrodomésticos"),
    VIVERES("Víveres"),
    INSTRUMENTOS("Instrumentos"),
    LIBROS("Libros"),
    ACCESORIOS("Accesorios"),
    CALZADOS("Calzados");

    private final String descripcion;

    private CategoProd(String descripcion){
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
