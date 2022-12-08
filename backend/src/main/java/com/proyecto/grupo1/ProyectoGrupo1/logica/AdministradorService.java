package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtUsuarioBO;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;

public interface AdministradorService {

    public ObjResponse vendedoresPendientes();
    public ObjResponse vendedoresAprobados();
    public ObjResponse listadoVendedores();
    public ObjResponse cambiarEstadoVendedor(Long idVendedor, boolean aprobado);
    public ObjResponse listarUsuarios();
    public ObjResponse buscarUsuarios(String correo);
    public ObjResponse bloquearDesbloquerUsuarios(String correo, String rol, boolean bloqueado);
    public ObjResponse eliminarCuentaUsuario(Long idUser, Rol rol);
    public ObjResponse registrarAdministrador(String correo, String contra);

}
