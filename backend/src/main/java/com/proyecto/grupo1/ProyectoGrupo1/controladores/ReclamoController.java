package com.proyecto.grupo1.ProyectoGrupo1.controladores;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtPago;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtReclamo;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.logica.CompraService;
import com.proyecto.grupo1.ProyectoGrupo1.logica.ReclamoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reclamo")
public class ReclamoController {

    @Autowired
    CompraService compraService;
    @Autowired
    ReclamoService reclamoService;

    @RequestMapping(value = "/iniciarReclamo", method = RequestMethod.POST)
    public ObjResponse iniciarReclamo(@RequestBody DtReclamo dtR){
        return reclamoService.iniciar(dtR);
    }

    @RequestMapping(value = "/obtenerReclamos", method = RequestMethod.GET)
    public ObjResponse listarReclamosVendedor(@RequestParam Long idVendedor){
        return reclamoService.listarReclamosVendedor(idVendedor);
    }

    @RequestMapping(value = "/gestionReclamo", method = RequestMethod.PUT)
    public ObjResponse gestionarReclamo(
            @RequestParam Long idCompra,
            @RequestParam int opcion,
            @RequestParam (required = false) String mensaje,
            @RequestParam (required = false) Double monto
            ){
        return reclamoService.gestionarReclamo(idCompra, opcion, mensaje, monto);
    }

}
