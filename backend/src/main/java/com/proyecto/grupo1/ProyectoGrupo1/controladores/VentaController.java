package com.proyecto.grupo1.ProyectoGrupo1.controladores;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtEntregaCompra;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.CategoProd;
import com.proyecto.grupo1.ProyectoGrupo1.logica.VentaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/venta")
public class VentaController {

    @Autowired
    VentaService ventaService;

    @RequestMapping(value = "/listarVentasSinHorarioEntrega", method = RequestMethod.GET) //devuelve lista de ventas con envío o retiro marcado por el Cliente, pero que no tienen horario marcado por el Vendedor.
    public ObjResponse listarVentasEntregaPendienteSinMarcar(@RequestParam Long idVendedor){
        return ventaService.listarVentasEntregaPendienteSinMarcar(idVendedor);
    }

    @RequestMapping(value = "/setearEntrega", method = RequestMethod.PUT)
    public ObjResponse setearEntrega(@RequestBody DtEntregaCompra dtEC){
        return ventaService.setearEntrega(dtEC);
    }

    @RequestMapping(value = "/listarVentasEntregaPendiente", method = RequestMethod.GET) //devuelve lista de ventas que tiene el vendedor con horario de Retiro o Envío setedo, pero aún no confirmadas como recibidas por el Cliente.
    public ObjResponse listarVentasEntregaPendienteYMarcada(@RequestParam Long idVendedor){
        return ventaService.listarVentasEntregaPendienteYMarcada(idVendedor);
    }

    @RequestMapping(value = "/listarVentasFinalizadas", method = RequestMethod.GET) // devuelve lista de ventas confirmadas como recibidas por el Cliente.
    public ObjResponse listarVentasFinalizadas(@RequestParam Long idVendedor){
        return ventaService.listarVentasFinalizadas(idVendedor);
    }

    @RequestMapping(value = "/listarVentasVendedor", method = RequestMethod.GET)
    public ObjResponse listarVentasVendedor(@RequestParam Long idVendedor){
        return ventaService.listarVentasVendedor(idVendedor);
    }

    @RequestMapping(value = "/balance", method = RequestMethod.GET)
    public ObjResponse listarBalanceVentas(
            @RequestParam Long idVendedor,
            @RequestParam(required = false) Date fechaDesde,
            @RequestParam(required = false) Date fechaHasta,
            @RequestParam(required = false) CategoProd categoria,
            @RequestParam(required = false) Double montoDesde,
            @RequestParam(required = false) Double montoHasta
            ){
        return ventaService.listarBalanceVentas(idVendedor, fechaDesde, fechaHasta, categoria, montoDesde, montoHasta);
    }


}
