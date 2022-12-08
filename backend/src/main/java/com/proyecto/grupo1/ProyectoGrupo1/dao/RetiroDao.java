package com.proyecto.grupo1.ProyectoGrupo1.dao;

import com.proyecto.grupo1.ProyectoGrupo1.entidades.Compra;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Retiro;
import org.springframework.data.repository.CrudRepository;

public interface RetiroDao extends CrudRepository<Retiro, Long> {

    Retiro findAllByCompra(Compra c);
    Retiro findAllById(Long id);
}
