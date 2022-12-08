package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class PushRequest {

    private String to;
    private Notificacion notification;

    public PushRequest(String to, Notificacion notification) {
        this.to = to;
        this.notification = notification;
    }
}
