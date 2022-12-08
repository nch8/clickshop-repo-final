package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

@Getter @Setter @ToString
public class ObjResponse {
    private String mensaje;
    private Integer codeHttp;
    private Long IdUser;
    private Rol rol;
    private Object objeto;

    public ObjResponse(String mensaje, Integer codeHttp, Long idUser, Rol rol, Object objeto) {
        this.mensaje = mensaje;
        this.codeHttp = codeHttp;
        IdUser = idUser;
        this.rol = rol;
        this.objeto = objeto;
    }

    public ObjResponse(String mensaje, Integer codigo, Object objeto) {
        this.mensaje = mensaje;
        this.codeHttp = codigo;
        this.objeto = objeto;
    }

    public ObjResponse() {
    }
}
