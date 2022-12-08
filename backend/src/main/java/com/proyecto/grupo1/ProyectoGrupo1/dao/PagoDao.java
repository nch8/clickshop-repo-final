package com.proyecto.grupo1.ProyectoGrupo1.dao;

import com.proyecto.grupo1.ProyectoGrupo1.entidades.Pago;
import org.springframework.data.repository.CrudRepository;


public interface PagoDao extends CrudRepository<Pago, String> {

    Pago getPagoById(Long id);
}
