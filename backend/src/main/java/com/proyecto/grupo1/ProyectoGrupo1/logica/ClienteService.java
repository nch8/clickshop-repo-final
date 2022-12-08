package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.*;

import java.util.List;

public interface ClienteService {
    public ObjResponse ingresarDireccion(DtRegistroDireccion dt);
    public ObjResponse consultarDirecciones(Long id);
    public ObjResponse modificarDireccion(DtDireccion dtD);
    public ObjResponse eliminarDireccion(Long idDireccion);
    public ObjResponse modificarDatosCliente(DtCliente dtCliente);
    public ObjResponse getCliente(Long idCliente);


}
