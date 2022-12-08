package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtDireccion;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.TipoUsuario;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Direccion", indexes = {
        @Index(name = "idx_direccion_id", columnList = "id")
})
@Getter
@Setter
@ToString
public class Direccion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String calle;
    private int numero;
    private String apto;
    private String barrio;
    private String ciudad;
    private String departamento;
    private boolean principal;
    private TipoUsuario tipoUsuario;
    @ManyToOne
    private Cliente cliente;

    @OneToMany(mappedBy = "direccion",fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Envio> envios  = new ArrayList<Envio>();
    @ManyToOne
    private Vendedor vendedor;

    public Direccion() {
    }

    public Direccion(Long id, String calle, int numero, String apto, String barrio, String ciudad, String departamento, boolean principal, Cliente cliente, Vendedor vendedor) {
        this.id = id;
        this.calle = calle;
        this.numero = numero;
        this.apto = apto;
        this.barrio = barrio;
        this.ciudad = ciudad;
        this.departamento = departamento;
        this.principal = principal;
        this.cliente = cliente;
        this.vendedor = vendedor;
    }

    public Direccion(String calle, int numero, String apto, String barrio, String ciudad, String departamento, boolean principal, Cliente cliente, Vendedor vendedor) {
        this.calle = calle;
        this.numero = numero;
        this.apto = apto;
        this.barrio = barrio;
        this.ciudad = ciudad;
        this.departamento = departamento;
        this.principal = principal;
        this.cliente = cliente;
        this.vendedor = vendedor;
    }
    public Direccion(String calle, int numero, String apto, String barrio, String ciudad, String departamento, boolean principal, TipoUsuario tipoUsuario) {
        this.calle = calle;
        this.numero = numero;
        this.apto = apto;
        this.barrio = barrio;
        this.ciudad = ciudad;
        this.departamento = departamento;
        this.principal = principal;
        this.tipoUsuario = tipoUsuario;
    }

    public DtDireccion obtenerDtDireccion(){
        return new DtDireccion(this.id, this.calle, this.numero, this.apto, this.barrio, this.ciudad, this.departamento);
    }
}
