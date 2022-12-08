package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MailRequest {

    private String subject;
    private String to;
    private String from;
    private String text;

    public MailRequest() {}

}