package com.proyecto.grupo1.ProyectoGrupo1.controladores;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtCalificacion;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.logica.CalificacionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/calificacion")
public class CalifiacionController {
    @Autowired
    CalificacionService calificacionService;

    @RequestMapping(value = "/calificar", method = RequestMethod.POST)
    public ObjResponse calificar(
            @RequestBody DtCalificacion dtC
    ){
        return calificacionService.calificar(dtC);
    }

    @RequestMapping(value = "/calificar", method = RequestMethod.PUT)
    public ObjResponse modificar(
            @RequestBody DtCalificacion dtC
    ){
        return calificacionService.modificar(dtC);
    }

    @RequestMapping(value = "/eliminar", method = RequestMethod.PUT)
    public ObjResponse eliminar(
            @RequestBody DtCalificacion dtC
    ){
        return calificacionService.eliminar(dtC);
    }

    @RequestMapping(value = "/consultarPromedio", method = RequestMethod.GET)
    public ObjResponse promedio(@RequestParam Long idCliente){
        return calificacionService.promedio(idCliente);
    }
}
