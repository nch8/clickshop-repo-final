package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Date;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
@Table(name = "Usuario", indexes = {
        @Index(name = "idx_usuario_correo", columnList = "correo", unique= true),
        @Index(name = "idx_usuario_id", columnList = "id")
})
@Getter @Setter
public abstract class Usuario {
    @Id
    @SequenceGenerator(name = "usuario_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "usuario_seq")
    private Long id;
    private String documento;
    private String nombre;
    private String apellido;
    private Date fechaNacimiento;
    private String correo;
    private String contrasena;
    private boolean bloqueado;
    private boolean correoValidado;
    @Column(columnDefinition = "boolean default false")
    private boolean eliminado;
    public Usuario(String documento, String nombre, String apellido, Date fechaNacimiento, String correo, String contrasena) {
        this.documento = documento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNacimiento = fechaNacimiento;
        this.correo = correo;
        this.contrasena = contrasena;
        this.setBloqueado(false);
    }

    public Usuario() {

    }
}
