package com.proyecto.grupo1.ProyectoGrupo1.dao;

import com.proyecto.grupo1.ProyectoGrupo1.entidades.Compra;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Envio;
import org.springframework.data.repository.CrudRepository;

public interface EnvioDao extends CrudRepository<Envio, Long> {

    Envio findAllByCompra(Compra c);
    Envio findAllById(Long id);
}
