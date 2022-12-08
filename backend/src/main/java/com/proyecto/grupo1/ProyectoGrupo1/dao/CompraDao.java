package com.proyecto.grupo1.ProyectoGrupo1.dao;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoCompra;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Cliente;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Compra;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Vendedor;
import org.springframework.data.repository.CrudRepository;

import java.util.Date;
import java.util.List;

public interface CompraDao extends CrudRepository<Compra, Long> {

    Compra findCompraById(Long id);
    List<Compra> findAll();
    List<Compra> getAllByFechaIsAfterAndFechaIsBefore(Date fechaInicio, Date fechaFin);
    List<Compra> findCompraByEstadoAndProductoCarrito_Cliente(EstadoCompra estado, Cliente cliente);
    List<Compra> findCompraByEstadoAndProductoCarrito_Producto_Vendedor(EstadoCompra estado, Vendedor vendedor);
    List<Compra> getAllByProductoCarrito_Cliente_IdOrderByFechaDesc(Long idCliente);
    List<Compra> findCompraByProductoCarrito_Cliente_IdAndProductoCarrito_Producto_NombreContainingIgnoreCase(Long idCliente, String nombreProducto);
    List<Compra> getAllByProductoCarrito_Producto_Vendedor_IdOrderByFechaDesc(Long idVendedor);
}
