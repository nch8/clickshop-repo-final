package com.proyecto.grupo1.ProyectoGrupo1.dao;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.CategoProd;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Producto;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductoDao extends CrudRepository<Producto, Long> {
    Producto findProductoById(Long id);
    List<Producto> getAllBy();
    List<Producto> findAll();
    List<Producto> getAllByActivo(Boolean status);
    List<Producto> findProductoByNombreContainingAndActivoIsTrue(String nombre);
    List<Producto> findProductoByNombreContainingAndVendedor_Id(String nombre, Long idVendedor);
    List<Producto> getAllByVendedor_Id(Long idVendedor);
    List<Producto> getAllByCategoriaAndActivoIsTrue(CategoProd categoria);
    List<Producto> findProductoByNombreOrCategoriaAndVendedor_Id(Long idVendedor, String nombre, String categoria);

}
