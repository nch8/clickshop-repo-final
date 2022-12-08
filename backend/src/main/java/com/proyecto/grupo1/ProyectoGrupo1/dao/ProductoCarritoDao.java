package com.proyecto.grupo1.ProyectoGrupo1.dao;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoProdCarrito;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Cliente;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Producto;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.ProductoCarrito;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductoCarritoDao extends CrudRepository<ProductoCarrito, Long> {

    ProductoCarrito findProductoCarritoById(Long id);

    ProductoCarrito findProductoCarritoByProductoAndClienteAndEstado(Producto p, Cliente c, EstadoProdCarrito e);

    List<ProductoCarrito> findProductoCarritoByClienteAndEstado(Cliente c, EstadoProdCarrito e);
}
