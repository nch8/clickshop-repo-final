package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter @Setter
public class DtCliente {
    private Long id;
    private String documento;
    private String nombre;
    private String apellido;
    private Date fechaNacimiento;
    private String correo;
    private String contrasena;
    private String contrasenaNueva;

    private boolean bloqueado;
    private boolean correoValidado;

    private List<DtDireccion> direcciones = new ArrayList<>();

    public DtCliente(Long id, String documento, String nombre, String apellido, Date fechaNacimiento, String correo, String contrasena, boolean bloqueado, boolean correoValidado) {
        this.id = id;
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo;
        this.contrasena = contrasena;
        this.bloqueado = bloqueado;
        this.correoValidado = correoValidado;
    }

    public DtCliente(Long id, String documento, String nombre, String apellido, Date fechaNacimiento, String correo, String contrasena, boolean bloqueado, boolean correoValidado, List<DtDireccion> dirs) {
        this.id = id;
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo;
        this.contrasena = contrasena;
        this.bloqueado = bloqueado;
        this.correoValidado = correoValidado;
        this.direcciones = dirs;
    }

    public DtCliente(Long id, String documento, String nombre, String apellido, Date fechaNacimiento, String correo, String contrasena, String contrasenaNueva) {
        this.id = id;
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo;
        this.contrasena = contrasena;
        this.contrasenaNueva = contrasenaNueva;
    }

    public DtCliente() {

    }
}
