package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import lombok.Getter;

import java.util.Date;
import java.util.List;

@Getter
public class DtRegistroCliente {
    private String documento;
    private String nombre;
    private String apellido;
    private Date fechaNacimiento;
    private String correo;
    private String contrasena;
    List<DtDireccion> direcciones;

    public DtRegistroCliente(String documento, String nombre, String apellido, Date fechaNacimiento, String correo, String contrasena, List<DtDireccion> direcciones) {
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo;
        this.contrasena = contrasena;
        this.direcciones = direcciones;
    }
}
