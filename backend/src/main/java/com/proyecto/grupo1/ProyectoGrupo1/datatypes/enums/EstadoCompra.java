package com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums;

public enum EstadoCompra {

    PROCESANDO("El cliente finalizó el proceso de pago."),
    ENTREGA_DEFINIDA("Cliente definió método de entrega, pendiente de Vendedor setear horario."),
    ENTREGA_PENDIENTE("Vendedor marcó horario de Envío o Retiro, a la espera de confirmación de recibo por parte del Cliente."),
    ENTREGADA("Entregada"),
    CANCELADA("Cancelada");

    private final String descripcion;

    private EstadoCompra(String descripcion){
        this.descripcion = descripcion;
    }

    public String getDescripcion() {
        return descripcion;
    }
}
