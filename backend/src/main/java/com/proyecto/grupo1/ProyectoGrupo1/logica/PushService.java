package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.entidades.PushRequest;
import org.springframework.http.ResponseEntity;

public interface PushService {
    ResponseEntity<String> sendPush(PushRequest request);
}
