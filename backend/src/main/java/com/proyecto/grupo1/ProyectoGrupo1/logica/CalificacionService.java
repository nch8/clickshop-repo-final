package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtCalificacion;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;

public interface CalificacionService {

    public ObjResponse calificar(DtCalificacion dtC);
    public ObjResponse modificar(DtCalificacion dtC);
    public ObjResponse eliminar(DtCalificacion dtC);

    public ObjResponse promedio(Long idCliente);

}
