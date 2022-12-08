package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.*;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Cliente;

import java.util.List;

public interface InvitadoService {

    public ObjResponse registrarCliente(DtRegistroCliente cliente);
    public DtAuxLogin login(DtLogin dtLogin);
    public DtCliente obtenerCliente(Long id);
    public ObjResponse recuperarContrasena(String correo);
    //public ObjResponse registrarAdministrador(String correo, String contra);
}
