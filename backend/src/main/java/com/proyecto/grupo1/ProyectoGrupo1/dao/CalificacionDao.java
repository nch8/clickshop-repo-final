package com.proyecto.grupo1.ProyectoGrupo1.dao;

import com.proyecto.grupo1.ProyectoGrupo1.entidades.Calificacion;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Cliente;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Compra;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Vendedor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CalificacionDao extends CrudRepository<Calificacion, Long> {
    Calificacion findCalificacionByCompraAndCliente(Compra compra, Cliente cliente);
    Calificacion findCalificacionByCompraAndVendedor(Compra compra, Vendedor vendedor);
    Boolean existsCalificacionByCompraAndCliente(Compra compra, Cliente cliente);
    Boolean existsCalificacionByCompraAndVendedor(Compra compra, Vendedor vendedor);
    List<Calificacion> getAllByCliente_Id(Long idCliente);

}
