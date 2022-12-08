package com.proyecto.grupo1.ProyectoGrupo1.controladores;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.logica.EstadisticaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RestController
@RequestMapping("/api/estadistica")
public class EstadisticaController {

    @Autowired
    EstadisticaService estadisticaService;

    @RequestMapping(value = "/comprasPorDia", method = RequestMethod.GET)
    public ObjResponse compraPorDia(
            @RequestParam(required = false) Date fechaDesde,
            @RequestParam(required = false) Date fechaHasta
    ){
        return estadisticaService.comprasPorDia(fechaDesde, fechaHasta);
    }
    @RequestMapping(value = "/productosPorCategoria", method = RequestMethod.GET)
    public ObjResponse productosPorCategoria(){
        return estadisticaService.productosPorCategoria();
    }
    @RequestMapping(value = "/tipoUsuarios", method = RequestMethod.GET)
    public ObjResponse cantUsuariosYVendedores(){
        return estadisticaService.cantidadUsuariosYVendedores();
    }

}
