package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter @Setter @ToString
public class DtDireccion {
    private Long id;
    private String calle;
    private int numero;
    private String apto;
    private String barrio;
    private String ciudad;
    private String departamento;
    private boolean principal;

    public DtDireccion(Long id, String calle, int numero, String apto, String barrio, String ciudad, String departamento, boolean principal) {
        this.id = id;
        this.calle = calle;
        this.numero = numero;
        this.apto = apto;
        this.barrio = barrio;
        this.ciudad = ciudad;
        this.departamento = departamento;
        this.principal = principal;
    }

    public DtDireccion(String calle, int numero, String apto, String barrio, String ciudad, String departamento, boolean principal) {
        this.calle = calle;
        this.numero = numero;
        this.apto = apto;
        this.barrio = barrio;
        this.ciudad = ciudad;
        this.departamento = departamento;
        this.principal = principal;
    }

    public DtDireccion(String calle, int numero, String apto, String barrio, String ciudad, String departamento) {
        this.calle = calle;
        this.numero = numero;
        this.apto = apto;
        this.barrio = barrio;
        this.ciudad = ciudad;
        this.departamento = departamento;

    }

    public DtDireccion(Long id,String calle, int numero, String apto, String barrio, String ciudad, String departamento) {
        this.id = id;
        this.calle = calle;
        this.numero = numero;
        this.apto = apto;
        this.barrio = barrio;
        this.ciudad = ciudad;
        this.departamento = departamento;

    }

    public DtDireccion() {
    }
}

