package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.entidades.MailRequest;
import org.springframework.http.ResponseEntity;

public interface MailService {
    public ResponseEntity<String> sendMail(MailRequest request);
}
