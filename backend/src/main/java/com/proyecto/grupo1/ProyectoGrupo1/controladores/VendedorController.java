package com.proyecto.grupo1.ProyectoGrupo1.controladores;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtProducto;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtRegistroDireccion;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtRegistroVendedor;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.logica.VendedorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class VendedorController {

    @Autowired
    VendedorService vendedorService;

    @RequestMapping(value = "api/vendedor/registrardireccion", method = RequestMethod.POST)
    public ObjResponse insertar(@RequestBody DtRegistroDireccion dt) {
        return vendedorService.registrardireccion(dt);
    }

    @RequestMapping(value = "api/vendedor/registrarVendedor", method = RequestMethod.POST)
    public ObjResponse registrarVendedor(@RequestBody DtRegistroVendedor dt) {
        return vendedorService.registrarseComoVendedor(dt);
    }

    @RequestMapping(value = "api/vendedor/registrarProductos", method = RequestMethod.POST)
    public ObjResponse registrarProductos(@RequestBody List<DtProducto> dt) {
        return vendedorService.registrarProductos(dt);
    }

    @RequestMapping(value = "api/vendedor/cambiarEstadoEnvios", method = RequestMethod.POST)
    public ObjResponse cambiarEstadoEnvios(@RequestParam Long idVendedor, @RequestParam boolean habilitado) {
        return vendedorService.cambiarEstadoEnvios(idVendedor, habilitado);
    }
}
