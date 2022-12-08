package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;

import java.util.Date;

public interface EstadisticaService {
    public ObjResponse comprasPorDia(Date fechaDesde, Date fechaHasta);
    public ObjResponse productosPorCategoria();
    public ObjResponse cantidadUsuariosYVendedores();

}
