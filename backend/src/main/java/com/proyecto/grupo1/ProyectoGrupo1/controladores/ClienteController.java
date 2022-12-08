package com.proyecto.grupo1.ProyectoGrupo1.controladores;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.*;
import com.proyecto.grupo1.ProyectoGrupo1.logica.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ClienteController {
    @Autowired
    ClienteService cliService;

    @RequestMapping(value = "api/cliente/altadireccion", method = RequestMethod.POST)
    public ObjResponse insertar(@RequestBody DtRegistroDireccion dt) {
        return cliService.ingresarDireccion(dt);
    }
    @RequestMapping(value = "api/cliente/consultar", method = RequestMethod.GET)
    public ObjResponse insertar(@RequestParam Long idCliente) {
        return cliService.getCliente(idCliente);
    }
    @RequestMapping(value = "api/cliente/modificarDatos", method = RequestMethod.PUT)
    public ObjResponse modificarDatos(@RequestBody DtCliente dtCliente) {
        return cliService.modificarDatosCliente(dtCliente);
    }
    @RequestMapping(value = "api/cliente/consultarDirecciones", method = RequestMethod.GET)
    public ObjResponse consultarDireccion(@RequestParam Long idCliente) {
        return cliService.consultarDirecciones(idCliente);
    }
    @RequestMapping(value = "api/cliente/modificarDireccion", method = RequestMethod.PUT)
    public ObjResponse modificarDireccion(@RequestBody DtDireccion dtD) {
        return cliService.modificarDireccion(dtD);
    }
    @RequestMapping(value = "api/cliente/eliminarDireccion", method = RequestMethod.PUT)
    public ObjResponse eliminarDireccion(@RequestParam Long idDireccion) {
        return cliService.eliminarDireccion(idDireccion);
    }
}
