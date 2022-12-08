package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.dao.CompraDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.ReclamoDao;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtPago;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtReclamo;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoCompra;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoReclamo;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.EstadoResolucion;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.TipoPago;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Compra;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.MailRequest;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.ProductoCarrito;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Reclamo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Service
public class ReclamoServiceImpl implements ReclamoService{

    @Autowired
    CompraDao compraDao;
    @Autowired
    ReclamoDao reclamoDao;
    @Autowired
    MailService mailService;
    @Autowired
    CompraService compraService;

    @Override
    public ObjResponse iniciar (DtReclamo dtR){
        Compra compra = compraDao.findCompraById(dtR.getIdCompra());

        if(compra.getReclamo() != null){
            return new ObjResponse("Error. Ya existe reclamo para esta compra.", HttpStatus.BAD_REQUEST.value(),null);
        }

        Reclamo reclamo = new Reclamo(
            dtR.getDescripcion(),
            compra
        );

        //armo notificación mail
        MailRequest mail = new MailRequest();
        String mensaje = "Se ha iniciado reclamo por la compra con id: " + compra.getId() + "."
                + "Por favor póngase en contacto con el cliente: " + compra.getProductoCarrito().getCliente().getCorreo() + "\r\n\r\n"
                + "Mensaje del cliente: \r\n" + "'" + dtR.getDescripcion() + "'";

        mail.setTo(compra.getProductoCarrito().getProducto().getVendedor().getCliente().getCorreo());
        mail.setSubject("Reclamo iniciado. Compra Id: "+compra.getId());
        mail.setText(mensaje);

        try {
            reclamoDao.save(reclamo);
            mailService.sendMail(mail);
            DtReclamo ret = reclamoDao.findByCompra(compra).obtenerDtReclamo();
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse listarReclamosVendedor (Long idVendedor){
        List<Reclamo> reclamos = reclamoDao.findByCompra_ProductoCarrito_Producto_Vendedor_IdOrderByFechaUltEstadoDesc(idVendedor);
        List<DtReclamo> ret = new ArrayList<DtReclamo>();

        for (Reclamo r : reclamos){
            DtReclamo dtR = r.obtenerDtReclamo();
            ret.add(dtR);
        }

        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), ret);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse gestionarReclamo(Long idCompra, int opcion, String mensaje, Double monto){
        Compra compra = compraDao.findCompraById(idCompra);
        Reclamo reclamo = reclamoDao.findByCompra(compra);
    /*
         1 = Enviar mensaje al cliente
         2 = Cambiar producto
         3 = Devolver dinero
    */
        switch (opcion){
            case 1:
                enviarMensaje(compra, mensaje);
                reclamo.setEstado(EstadoReclamo.PENDIENTE);
                reclamo.setFechaUltEstado(Calendar.getInstance().getTime());
                break;
            case 2:
                cambiarProducto(compra);
                reclamo.setEstado(EstadoReclamo.FINALIZADO);
                reclamo.setResolucion(EstadoResolucion.REENVIO);
                reclamo.setFechaUltEstado(Calendar.getInstance().getTime());
                break;
            case 3:
                devolverDinero(compra, monto);
                reclamo.setEstado(EstadoReclamo.FINALIZADO);
                reclamo.setResolucion(EstadoResolucion.REEMBOLSO);
                reclamo.setFechaUltEstado(Calendar.getInstance().getTime());
                break;
            default:
                return new ObjResponse("Opcion no existente", HttpStatus.BAD_REQUEST.value(),null);
        }

        try {
            reclamoDao.save(reclamo);
            return new ObjResponse("Exito", HttpStatus.OK.value(), null);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    private void enviarMensaje (Compra compra, String mensaje){
        MailRequest mail = new MailRequest();
        mail.setTo(compra.getProductoCarrito().getCliente().getCorreo());
        mail.setSubject("Mensaje del vendedor. Compra Id: "+compra.getId());
        mail.setText(mensaje);
        mailService.sendMail(mail);
    }

    private void cambiarProducto(Compra compra){
        compra.setEstado(EstadoCompra.CANCELADA);

        ProductoCarrito pc = new ProductoCarrito(
            compra.getProductoCarrito().getCantidad(),
            compra.getProductoCarrito().getCliente(),
            compra.getProductoCarrito().getProducto()
            );

        DtPago dtP = new DtPago();
        dtP.setIdCliente(pc.getCliente().getId());
        dtP.setMetodo(TipoPago.COORDINA);
        dtP.setReferenciaExterna("Reenvio de producto");

        compraService.confirmarProductosCarrito(dtP);

        String mensaje = "Se ha gestionado el envío de un nuevo producto";

        enviarMensaje(compra, mensaje);
    }

    private void devolverDinero(Compra compra, Double monto){
        compra.setEstado(EstadoCompra.CANCELADA);

        //si se le pasa monto reembolsa el monto, sino lo hace por el total de la compra.
        if(monto != null){
            compra.getProductoCarrito().getCliente().setSaldo(
                compra.getProductoCarrito().getCliente().getSaldo()+
                monto
            );

            compra.getProductoCarrito().getProducto().getVendedor().setSaldo(
                compra.getProductoCarrito().getProducto().getVendedor().getSaldo()-
                monto
            );
        } else {
            compra.getProductoCarrito().getCliente().setSaldo(
                compra.getProductoCarrito().getCliente().getSaldo()+
                compra.getProductoCarrito().getTotal()
            );

            compra.getProductoCarrito().getProducto().getVendedor().setSaldo(
                    compra.getProductoCarrito().getProducto().getVendedor().getSaldo()-
                    compra.getProductoCarrito().getTotal()
            );
        }

        String mensaje = "Se ha reembolsado el dinero por el producto";
        enviarMensaje(compra, mensaje);
    }
}
