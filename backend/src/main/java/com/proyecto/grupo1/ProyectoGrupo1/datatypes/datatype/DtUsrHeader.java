package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DtUsrHeader {
    private Long idUser;
    private Rol rol;

    public DtUsrHeader(Long idUser, Rol rol) {
        this.idUser = idUser;
        this.rol = rol;
    }

    public DtUsrHeader() {

    }
}
