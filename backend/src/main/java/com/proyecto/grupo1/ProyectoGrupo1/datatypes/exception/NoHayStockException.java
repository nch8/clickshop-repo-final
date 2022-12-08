package com.proyecto.grupo1.ProyectoGrupo1.datatypes.exception;

public class NoHayStockException extends Exception {
    private static final long serialVersionUID = 1L;
    public NoHayStockException(String message) {
        super(message);
    }
}
