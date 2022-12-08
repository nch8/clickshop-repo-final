package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtProducto;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtRegistroDireccion;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtRegistroVendedor;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;

import java.util.List;

public interface VendedorService {

    public ObjResponse registrardireccion(DtRegistroDireccion dt);
    public ObjResponse registrarseComoVendedor(DtRegistroVendedor dt);
    public ObjResponse registrarProductos(List<DtProducto> productos);
    public ObjResponse cambiarEstadoEnvios(Long idVendedor, boolean habilitado);
}
