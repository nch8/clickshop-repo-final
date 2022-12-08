package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtProducto;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.CategoProd;

import java.util.List;

public interface ProductoService {

    public ObjResponse altaProducto(DtProducto dtP);
    public ObjResponse obtener(Long idProducto);
    public ObjResponse modificarProducto(DtProducto dtP);
    public ObjResponse bajaProducto(Long idProducto, Long IdVendedor);
    public ObjResponse listar();
    public ObjResponse listarTodos();
    public ObjResponse listarPorVendedor(Long idVendedor);
    public ObjResponse listarPorCategoria(CategoProd categoria);
    public ObjResponse buscarPorNombre(String nombre);
    public ObjResponse buscarPorNombreYVendedor(String nombre, Long idVendedor);


}