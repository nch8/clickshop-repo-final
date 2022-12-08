package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtCliente;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtUsuarioBO;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Getter @Setter @ToString
public class Cliente  extends Usuario {
    @Enumerated(EnumType.STRING)
    private Rol rol;
    private double saldo;
    private boolean envioDomicilio;
    private String mobileToken;


    @OneToMany(mappedBy = "cliente", cascade = { CascadeType.PERSIST, CascadeType.REFRESH }, orphanRemoval = true)
    private List<Calificacion> calificacionesCliente = new ArrayList<Calificacion>();

    @OneToMany(mappedBy = "cliente", cascade = { CascadeType.PERSIST, CascadeType.REFRESH }, orphanRemoval = true)
    private List<ProductoCarrito> productoCarritos = new ArrayList<ProductoCarrito>();

    @OneToMany(mappedBy = "cliente",fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Direccion> direcciones  = new ArrayList<Direccion>();

    @OneToOne(mappedBy = "cliente", cascade = { CascadeType.PERSIST, CascadeType.REFRESH }, orphanRemoval = true)
    private Vendedor vendedor;
    public Cliente() { super(); }

    public Cliente(String documento, String nombre, String apellido, Date fechaNacimiento, String correo, String contrasena) {
        super(documento, nombre, apellido, fechaNacimiento, correo, contrasena);
        this.rol = Rol.ROL_CLIENTE;
        this.saldo = 0.00;
    }

    public DtCliente obtenerDt(){
        DtCliente dt = new DtCliente(this.getId(), this.getDocumento(),this.getNombre(), this.getApellido(), this.getFechaNacimiento(), this.getCorreo(), this.getContrasena(), this.isBloqueado(), this.isCorreoValidado());
        if(!this.direcciones.isEmpty()){
            for(Direccion dir : this.direcciones){
                dt.getDirecciones().add(dir.obtenerDtDireccion());
            }
        }
        return dt;
    }

    public DtUsuarioBO dtBackOfficeAdmin(){
        return new DtUsuarioBO(this.getId(), this.getCorreo(), this.getRol(), this.getNombre(), this.isBloqueado());
    }

    public DtCliente obtenerDtPublico(){
        return new DtCliente(
                this.getId(),
                this.getDocumento(),
                this.getNombre(),
                this.getApellido(),
                this.getFechaNacimiento(),
                this.getCorreo(),
                null,
                null
        );
    }
}
