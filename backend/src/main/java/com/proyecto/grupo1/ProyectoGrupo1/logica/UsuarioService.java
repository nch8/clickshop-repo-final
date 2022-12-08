package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;

public interface UsuarioService {
    public ObjResponse eliminarCuenta(Long idUser, Rol rol);
}
