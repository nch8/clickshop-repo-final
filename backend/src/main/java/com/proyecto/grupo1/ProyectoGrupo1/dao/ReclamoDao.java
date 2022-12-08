package com.proyecto.grupo1.ProyectoGrupo1.dao;

import com.proyecto.grupo1.ProyectoGrupo1.entidades.Compra;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Reclamo;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ReclamoDao extends CrudRepository<Reclamo, Long> {
    Reclamo findByCompra(Compra compra);
    List<Reclamo> findByCompra_ProductoCarrito_Producto_Vendedor_IdOrderByFechaUltEstadoDesc(Long idVendedor);
}
