package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtPago;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;

public interface CompraService {
    public ObjResponse confirmarProductosCarrito(DtPago dtP);
    public ObjResponse listarComprasPendientesDeAsignarEntrega(Long idC);
    public ObjResponse asignarMetodoEntrega(Long idCompra, String tipoEntrega, Long idDireccion);
    public ObjResponse listarComprasPendientesDeRecibir(Long idC);

    public ObjResponse confirmarCompraRecibida(Long idCompra);

    public ObjResponse listarComprasFinalizadas(Long idCliente);

    public ObjResponse buscarComprasCliente(Long idCliente, String nombreProducto);

    public ObjResponse listarComprasCliente(Long idCliente);


}
