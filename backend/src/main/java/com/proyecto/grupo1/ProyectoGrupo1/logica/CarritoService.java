package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.exception.NoHayStockException;

public interface CarritoService {
    public ObjResponse ingresarProductoCarrito(Long idP, Long idC, int cant) throws NoHayStockException;

    public ObjResponse eliminarProductoCarrito(Long idP, Long idC);

    public ObjResponse consultarCarrito(Long idC);

    public ObjResponse totalizarCarrito(Long idC);
}
