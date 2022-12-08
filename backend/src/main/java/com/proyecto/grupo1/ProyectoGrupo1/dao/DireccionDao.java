package com.proyecto.grupo1.ProyectoGrupo1.dao;

import com.proyecto.grupo1.ProyectoGrupo1.entidades.Direccion;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Vendedor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DireccionDao extends CrudRepository<Direccion,Long> {
    List<Direccion> getAllByCliente_Id(Long id);

    Direccion findByVendedorAndPrincipalIsTrue(Vendedor v);

    Direccion getById(Long id);

}
