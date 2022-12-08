package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.dao.*;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtCompra;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtDireccion;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtEntregaCompra;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.CategoProd;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoCompra;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.TipoNotificacion;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class VentaServiceImpl implements VentaService{
    @Autowired
    CompraDao compraDao;
    @Autowired
    VendedorDao vendedorDao;
    @Autowired
    DireccionDao direccionDao;
    @Autowired
    MailService mailService;
    @Autowired
    PushService pushService;
    @Autowired
    NotificacionDao notificacionDao;
    @Autowired
    CalificacionDao calificacionDao;
        @Override
    public ObjResponse listarVentasEntregaPendienteSinMarcar(Long idVendedor) {
        Vendedor vendedor = vendedorDao.findVendedorById(idVendedor);
        List<Compra> compras = compraDao.findCompraByEstadoAndProductoCarrito_Producto_Vendedor(EstadoCompra.ENTREGA_DEFINIDA, vendedor);
        List<DtCompra> ret = new ArrayList<DtCompra>();

        for (Compra c : compras) {
            List<String> tiposEntrega = new ArrayList<String>();

            if(c.getEnvio() == null){
                tiposEntrega.add("RETIRO");
            } else {
                tiposEntrega.add("ENVIO");
            }
            DtCompra dtC = c.obtenerDtCompra();
            dtC.setMetodosEntrega(tiposEntrega);
            ret.add(dtC);
        }
        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse listarVentasEntregaPendienteYMarcada(Long idVendedor) {
        Vendedor vendedor = vendedorDao.findVendedorById(idVendedor);
        List<Compra> compras = compraDao.findCompraByEstadoAndProductoCarrito_Producto_Vendedor(EstadoCompra.ENTREGA_PENDIENTE, vendedor);
        List<DtCompra> ret = new ArrayList<DtCompra>();

        for (Compra c : compras) {
            DtEntregaCompra entrega = new DtEntregaCompra();

            if(c.getEnvio() != null){
                Direccion d = direccionDao.getById(c.getEnvio().getDireccion().getId());
                DtDireccion dtDirEnvio = (d.obtenerDtDireccion());

                entrega.setTipoEntrea("ENVIO");
                entrega.setFechaHoraDesde(c.getEnvio().getFechaDesde());
                entrega.setFechaHoraHasta(c.getEnvio().getFechaHasta());
                entrega.setDireccion(dtDirEnvio);

            } else {
                Direccion d = direccionDao.findByVendedorAndPrincipalIsTrue(vendedor);
                DtDireccion dtDirRetiro = d.obtenerDtDireccion();

                entrega.setTipoEntrea("RETIRO");
                entrega.setFechaHoraDesde(c.getRetiro().getFechaDesde());
                entrega.setFechaHoraHasta(c.getRetiro().getFechaHasta());
                entrega.setDireccion(dtDirRetiro);
            }

            DtCompra dtC = c.obtenerDtCompra();
            dtC.setEntrega(entrega);
            ret.add(dtC);
        }
        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse listarVentasFinalizadas(Long idVendedor) {
        Vendedor vendedor = vendedorDao.findVendedorById(idVendedor);
        List<Compra> compras = compraDao.findCompraByEstadoAndProductoCarrito_Producto_Vendedor(EstadoCompra.ENTREGADA, vendedor);
        List<DtCompra> ret = new ArrayList<DtCompra>();

        for (Compra c : compras) {
            List<String> tiposEntrega = new ArrayList<String>();

            if(c.getEnvio() == null){
                tiposEntrega.add("RETIRO");
            } else {
                tiposEntrega.add("ENVIO");
            }

            DtCompra dtC = c.obtenerDtCompra();
            dtC.setMetodosEntrega(tiposEntrega);
            ret.add(dtC);
        }
        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse setearEntrega(DtEntregaCompra dtEC){
        Compra compra = compraDao.findCompraById(dtEC.getIdCompra());

        if(compra.getEnvio() == null){
            compra.getRetiro().setFechaDesde(dtEC.getFechaHoraDesde());
            compra.getRetiro().setFechaHasta(dtEC.getFechaHoraHasta());
        } else {
            compra.getEnvio().setFechaDesde(dtEC.getFechaHoraDesde());
            compra.getEnvio().setFechaHasta(dtEC.getFechaHoraHasta());
        }
        compra.setEstado(EstadoCompra.ENTREGA_PENDIENTE);

        if(dtEC.getFechaHoraDesde().isAfter(dtEC.getFechaHoraHasta())){
            return new ObjResponse("Error. La fecha inicial debe ser mayor a la final", HttpStatus.BAD_REQUEST.value(), null);
        }

        String mensaje = "";
        if(compra.getEnvio() == null) {
            mensaje = "Su compra fue despachada por el vendedor. Podrá pasar a retirarla entre: "
                    + dtEC.getFechaHoraDesde()
                    + " y "
                    + dtEC.getFechaHoraHasta() + ".";
        } else {
            mensaje = "Su compra fue despachada por el vendedor. Será enviada entre: "
                    + compra.getEnvio().getFechaDesde()
                    + " y "
                    + compra.getEnvio().getFechaHasta() + ".";
        }

        //armo notificación mail
        MailRequest mail = new MailRequest();
        mail.setTo(compra.getProductoCarrito().getCliente().getCorreo());
        mail.setSubject("Compra lista para ser recibida. Id: "+compra.getId());
        mail.setText(mensaje);

        //armo nueva push
        PushRequest push = new PushRequest(
            compra.getProductoCarrito().getCliente().getMobileToken(),
            new Notificacion(TipoNotificacion.PUSH, "Click-Store", mensaje, compra.getProductoCarrito().getCliente().getId())
        );

        try {
            compraDao.save(compra);
            //notificaciones
            mailService.sendMail(mail);
            notificacionDao.save(push.getNotification());
            pushService.sendPush(push);
            return new ObjResponse("Exito", HttpStatus.OK.value(), null);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse listarVentasVendedor(Long idVendedor){
        List<Compra> compras = compraDao.getAllByProductoCarrito_Producto_Vendedor_IdOrderByFechaDesc(idVendedor);
        List<DtCompra> ret = new ArrayList<DtCompra>();

        for(Compra c : compras){
            DtCompra dtC = c.obtenerDtCompra();

            if(calificacionDao.existsCalificacionByCompraAndCliente(c, c.getProductoCarrito().getCliente())){
                dtC.setCalificacionCli(calificacionDao.findCalificacionByCompraAndCliente(c, c.getProductoCarrito().getCliente()).obtenerDtCalificacion());
                dtC.getCalificacionCli().setIdCliente(c.getProductoCarrito().getCliente().getId());
            }
            if(calificacionDao.existsCalificacionByCompraAndVendedor(c, c.getProductoCarrito().getProducto().getVendedor())){
                dtC.setCalificacionVen(calificacionDao.findCalificacionByCompraAndVendedor(c, c.getProductoCarrito().getProducto().getVendedor()).obtenerDtCalificacion());
                dtC.getCalificacionVen().setIdVendedor(c.getProductoCarrito().getProducto().getVendedor().getId());
            }
            dtC.setIdCliente(c.getProductoCarrito().getCliente().getId());
            ret.add(dtC);
        }

        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse listarBalanceVentas(Long idVendedor, Date fechaDesde, Date fechaHasta, CategoProd categoria, Double montoDesde, Double montoHasta) {
        List<Compra> compras = compraDao.getAllByProductoCarrito_Producto_Vendedor_IdOrderByFechaDesc(idVendedor);
        List<Compra> aux = new ArrayList<Compra>();
        List<DtCompra> ret = new ArrayList<DtCompra>();

        //seteo variables nulas para comparar
        if(fechaHasta != null && fechaDesde == null ){
            fechaDesde = new Date(Long.MIN_VALUE);
        }
        if(fechaHasta == null && fechaDesde != null ){
            fechaHasta = Calendar.getInstance().getTime();
        }
        if(montoHasta != null && montoDesde == null ){
            montoDesde = 0.00;
        }
        if(montoHasta == null && montoDesde != null ){
            montoHasta = Double.MAX_VALUE;
        }

        //si no llega ningun parametro
        if(fechaHasta == null && fechaHasta == null && montoDesde == null && montoHasta == null && categoria == null){
            for(Compra c : compras){
                aux.add(c);
            }
        }

        //si vienen las dos fechas
        if(fechaHasta != null && fechaDesde != null && fechaHasta.before(fechaDesde)){
            return new ObjResponse("fechaHasta debe ser mayor a fechaDesde", HttpStatus.BAD_REQUEST.value(),null);
        } else if (fechaHasta != null && fechaDesde != null ){
            for(Compra c : compras){
                if(c.getFecha().after(fechaDesde) && c.getFecha().before(fechaHasta)){
                    if(!aux.contains(c))
                        aux.add(c);
                }
            }
        }

        //si vienen los dos montos
        if( montoHasta != null && montoDesde != null && montoHasta.compareTo(montoDesde) < 0 ){
            return new ObjResponse("montoHasta debe ser mayor a montoDesde", HttpStatus.BAD_REQUEST.value(),null);
        } else if (montoHasta != null && montoDesde != null ) {
            for(Compra c : compras){
                if(c.getProductoCarrito().getTotal() < montoHasta && c.getProductoCarrito().getTotal() > montoDesde){
                    if(!aux.contains(c))
                        aux.add(c);
                }
            }
        }

        //si viene Categoría
        if( categoria != null ){
            for(Compra c : compras){
                if(c.getProductoCarrito().getProducto().getCategoria().equals(categoria)){
                    if(!aux.contains(c))
                        aux.add(c);
                }
            }
        }

        try {
            for(Compra c : aux){
                ret.add(c.obtenerDtCompra());
            }
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }
}
