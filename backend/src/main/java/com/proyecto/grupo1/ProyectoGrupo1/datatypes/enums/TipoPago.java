package com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums;

public enum TipoPago {
    COORDINA("Coordinar con el vendedor"),
    PAYPAL("Pago por PayPal");

    private final String descripcion;

    private TipoPago(String descripcion){
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}