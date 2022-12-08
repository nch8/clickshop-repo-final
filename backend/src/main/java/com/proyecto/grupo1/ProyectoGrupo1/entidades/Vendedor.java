package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtUsuarioBO;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@DiscriminatorValue("vendedor")
@Getter @Setter @ToString
public class Vendedor {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "id")
    private Cliente cliente;
    private String nombreComercial;
    private Boolean habilitado;
    private boolean habilitaEnvio;
    private double saldo;
    @Enumerated(EnumType.STRING)
    private Rol rol;
    @Column(columnDefinition = "boolean default false")
    private boolean eliminado;

    @OneToMany(mappedBy = "vendedor", cascade = { CascadeType.PERSIST, CascadeType.REFRESH }, orphanRemoval = true)
    private List<Calificacion> calificacionesVendedor = new ArrayList<Calificacion>();;

    @OneToMany(mappedBy = "vendedor", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Direccion> direcciones;

    public Vendedor() {
        super();
    }

    public Vendedor(Cliente cliente, String nombreComercial, boolean habilitaEnvio) {
        this.cliente = cliente;
        this.nombreComercial = nombreComercial;
        this.habilitado = null;
        this.habilitaEnvio = habilitaEnvio;
        this.saldo = 0;
        this.rol = Rol.ROL_VENDEDOR;
    }

    public DtUsuarioBO dtBackOfficeAdmin(){
        boolean bloqueado = true;
        if(this.getHabilitado() != null){
            if(this.getHabilitado() == true){
                bloqueado = false;
            }
        }
        return new DtUsuarioBO(this.id, this.getCliente().getCorreo(), this.getRol(), this.nombreComercial, bloqueado);
    }
}
