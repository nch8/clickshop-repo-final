package com.proyecto.grupo1.ProyectoGrupo1.dao;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Administrador;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Cliente;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ClienteDao extends CrudRepository<Cliente,String> {

    Cliente findClienteByCorreoIgnoreCaseAndEliminadoIsFalse(String correo);

    Cliente findClienteByApellido(String ape);

    Cliente findClienteById(Long id);

    Cliente findClienteByDocumentoIgnoreCase(String doc);
    
    List<Cliente> findAllByEliminadoIsFalse();
}
