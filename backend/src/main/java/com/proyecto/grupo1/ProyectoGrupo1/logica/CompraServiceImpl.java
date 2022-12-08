package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.dao.*;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.*;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoCompra;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoProdCarrito;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CompraServiceImpl implements CompraService {

    @Autowired
    ProductoCarritoDao pcDao;
    @Autowired
    CompraDao compraDao;
    @Autowired
    ClienteDao clienteDao;
    @Autowired
    PagoDao pagoDao;
    @Autowired
    EnvioDao envioDao;
    @Autowired
    RetiroDao retiroDao;
    @Autowired
    DireccionDao direccionDao;
    @Autowired
    CalificacionDao calificacionDao;

    @Override
    public ObjResponse confirmarProductosCarrito(DtPago dtP){
        Cliente cliente = clienteDao.findClienteById(dtP.getIdCliente());
        List<ProductoCarrito> prods = pcDao.findProductoCarritoByClienteAndEstado(cliente, EstadoProdCarrito.AGREGADO);

        Pago pago = new Pago(dtP.getFecha(), dtP.getMetodo(),false, dtP.getReferenciaExterna());
        List<Compra> compras = new ArrayList<Compra>();
        pagoDao.save(pago);

        for(ProductoCarrito pc : prods){
            Compra c = new Compra(true, EstadoCompra.PROCESANDO, pc, pago);
            pc.getProducto().setStock(pc.getProducto().getStock()-pc.getCantidad());
            pc.setEstado(EstadoProdCarrito.COMPRADO);
            c.setPago(pago);
            compras.add(c);
            compraDao.save(c);
        }

        pago.setCompras(compras);

        try {
            return new ObjResponse("Exito al procesar el pago", HttpStatus.OK.value(),pago.getId());
        }catch (Exception e){
            return new ObjResponse("Error al procesar el pago", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse listarComprasPendientesDeAsignarEntrega(Long idC){
        Cliente cliente = clienteDao.findClienteById(idC);
        List<Compra> comprasPendientes = compraDao.findCompraByEstadoAndProductoCarrito_Cliente(EstadoCompra.PROCESANDO, cliente);
        List<DtCompra> ret = new ArrayList<DtCompra>();

        for (Compra c : comprasPendientes){
            List<String> tiposEntrega = new ArrayList<String>();
            List<Direccion> direcciones = c.getProductoCarrito().getProducto().getVendedor().getDirecciones();
            DtDireccion dirPrincipal = new DtDireccion();

            for(Direccion d : direcciones){
                if(d.isPrincipal()){
                    dirPrincipal = d.obtenerDtDireccion();
                }
            }

            tiposEntrega.add("RETIRO " + dirPrincipal);

            if(c.getProductoCarrito().getProducto().getVendedor().isHabilitaEnvio()){
                tiposEntrega.add("ENVIO");
            }

            DtCompra dtC = new DtCompra(
                    c.getId(),
                    c.getFecha(),
                    c.getProductoCarrito().getProducto().getNombre(),
                    c.getProductoCarrito().getCantidad(),
                    c.getProductoCarrito().getTotal(),
                    tiposEntrega
            );
            dtC.setProducto(c.getProductoCarrito().getProducto().obtenerDtProducto());
            ret.add(dtC);
        }

        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse asignarMetodoEntrega(Long idCompra, String tipoEntrega, Long idDireccion){
        Compra compra = compraDao.findCompraById(idCompra);
        Envio e = new Envio();
        Retiro r = new Retiro();

        if(tipoEntrega.equals("ENVIO")){
            e.setCompra(compra);
            e.setDireccion(direccionDao.getById(idDireccion));
        } else if(tipoEntrega.equals("RETIRO")){
            r.setCompra(compra);
        }

        compra.setEstado(EstadoCompra.ENTREGA_DEFINIDA);

        try {
             if(tipoEntrega.equals("ENVIO")){
                envioDao.save(e);
                return new ObjResponse("Exito", HttpStatus.OK.value(), envioDao.findAllByCompra(compra).getId());
            } else{
                 retiroDao.save(r);
                return new ObjResponse("Exito", HttpStatus.OK.value(), retiroDao.findAllByCompra(compra).getId());
            }
        }catch (Exception exception){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse listarComprasPendientesDeRecibir(Long idCliente){
        Cliente cliente = clienteDao.findClienteById(idCliente);
        List<Compra> comprasPendientes = compraDao.findCompraByEstadoAndProductoCarrito_Cliente(EstadoCompra.ENTREGA_PENDIENTE, cliente);
        List<DtCompra> ret = new ArrayList<DtCompra>();

        for (Compra c : comprasPendientes){
            DtEntregaCompra entrega = new DtEntregaCompra();

            if(c.getEnvio() != null){
                Direccion d = direccionDao.getById(c.getEnvio().getDireccion().getId());
                DtDireccion dtDirEnvio = (d.obtenerDtDireccion());

                entrega.setTipoEntrea("ENVIO");
                entrega.setFechaHoraDesde(c.getEnvio().getFechaDesde());
                entrega.setFechaHoraHasta(c.getEnvio().getFechaHasta());
                entrega.setDireccion(dtDirEnvio);

            } else {
                Direccion d = direccionDao.findByVendedorAndPrincipalIsTrue(c.getProductoCarrito().getProducto().getVendedor());
                DtDireccion dtDirRetiro = d.obtenerDtDireccion();

                entrega.setTipoEntrea("RETIRO");
                entrega.setFechaHoraDesde(c.getRetiro().getFechaDesde());
                entrega.setFechaHoraHasta(c.getRetiro().getFechaHasta());
                entrega.setDireccion(dtDirRetiro);
            }

            DtCompra dtC = new DtCompra(
                    c.getId(),
                    c.getFecha(),
                    c.getProductoCarrito().getProducto().getNombre(),
                    c.getProductoCarrito().getCantidad(),
                    c.getProductoCarrito().getTotal(),
                    entrega
            );
            dtC.setProducto(c.getProductoCarrito().getProducto().obtenerDtProducto());
            ret.add(dtC);
        }

        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse confirmarCompraRecibida(Long idCompra){
        Compra compra = compraDao.findCompraById(idCompra);

        try{
            if(compra.getEnvio() != null ){
                compra.getEnvio().setConfirmado(true);
            } else {
                compra.getRetiro().setConfirmado(true);
            }

            compra.setEstado(EstadoCompra.ENTREGADA);
            compra.getProductoCarrito().getProducto().getVendedor().setSaldo(
                    compra.getProductoCarrito().getProducto().getVendedor().getSaldo()
                    + compra.getProductoCarrito().getTotal()
            );

            compraDao.save(compra);

            return new ObjResponse("Exito", HttpStatus.OK.value(), null);

        } catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse listarComprasFinalizadas(Long idCliente) {
        Cliente cliente = clienteDao.findClienteById(idCliente);
        List<Compra> compras = compraDao.findCompraByEstadoAndProductoCarrito_Cliente(EstadoCompra.ENTREGADA, cliente);
        List<DtCompra> ret = new ArrayList<DtCompra>();

        for (Compra c : compras) {
            List<String> tiposEntrega = new ArrayList<String>();

            if(c.getEnvio() == null){
                tiposEntrega.add("RETIRO");
            } else {
                tiposEntrega.add("ENVIO");
            }

            DtCompra dtC = new DtCompra(
                    c.getId(),
                    c.getFecha(),
                    c.getProductoCarrito().getProducto().getNombre(),
                    c.getProductoCarrito().getCantidad(),
                    c.getProductoCarrito().getTotal(),
                    tiposEntrega
            );
            dtC.setProducto(c.getProductoCarrito().getProducto().obtenerDtProducto());
            ret.add(dtC);
        }
        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse listarComprasCliente(Long idCliente){
        List<Compra> compras = compraDao.getAllByProductoCarrito_Cliente_IdOrderByFechaDesc(idCliente);
        List<DtCompra> ret = new ArrayList<DtCompra>();

        for(Compra c : compras){
            DtCompra dtC = new DtCompra(
                    c.getId(),
                    c.getFecha(),
                    c.getProductoCarrito().getProducto().getNombre(),
                    c.getProductoCarrito().getCantidad(),
                    c.getProductoCarrito().getTotal()
            );

            dtC.setProducto(c.getProductoCarrito().getProducto().obtenerDtProducto());

            if(calificacionDao.existsCalificacionByCompraAndCliente(c, c.getProductoCarrito().getCliente())){
                dtC.setCalificacionCli(calificacionDao.findCalificacionByCompraAndCliente(c, c.getProductoCarrito().getCliente()).obtenerDtCalificacion());
                dtC.getCalificacionCli().setIdCliente(c.getProductoCarrito().getCliente().getId());
            }
            if(calificacionDao.existsCalificacionByCompraAndVendedor(c, c.getProductoCarrito().getProducto().getVendedor())){
                dtC.setCalificacionVen(calificacionDao.findCalificacionByCompraAndVendedor(c, c.getProductoCarrito().getProducto().getVendedor()).obtenerDtCalificacion());
                dtC.getCalificacionVen().setIdVendedor(c.getProductoCarrito().getProducto().getVendedor().getId());
            }
            if(c.getReclamo() != null){
                dtC.setReclamo(c.getReclamo().obtenerDtReclamo());
            }

            ret.add(dtC);
        }

        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse buscarComprasCliente(Long idCliente, String nombreProducto){
        List<Compra> compras = compraDao.findCompraByProductoCarrito_Cliente_IdAndProductoCarrito_Producto_NombreContainingIgnoreCase(idCliente, nombreProducto);
        List<DtCompra> ret = new ArrayList<DtCompra>();

        for(Compra c : compras){
            DtCompra dtC = new DtCompra(
                    c.getId(),
                    c.getFecha(),
                    c.getProductoCarrito().getProducto().getNombre(),
                    c.getProductoCarrito().getCantidad(),
                    c.getProductoCarrito().getTotal()
            );
            dtC.setProducto(c.getProductoCarrito().getProducto().obtenerDtProducto());
            ret.add(dtC);
        }

        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

}
