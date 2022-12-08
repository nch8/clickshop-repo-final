package com.proyecto.grupo1.ProyectoGrupo1.dao;

import com.proyecto.grupo1.ProyectoGrupo1.entidades.Notificacion;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface NotificacionDao extends MongoRepository<Notificacion, Long> {
    List<Notificacion> findNotificacionByIdClienteAndVista();
    List<Notificacion> getAllByIdCliente();
}
