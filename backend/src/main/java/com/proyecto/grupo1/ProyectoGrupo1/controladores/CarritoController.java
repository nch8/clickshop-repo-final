package com.proyecto.grupo1.ProyectoGrupo1.controladores;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.exception.NoHayStockException;
import com.proyecto.grupo1.ProyectoGrupo1.logica.CarritoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carrito")
public class CarritoController {

    @Autowired
    CarritoService carritoService;

    @RequestMapping(value = "/ingresar", method = RequestMethod.POST)
    public ObjResponse ingresarProductoCarrito(
            @RequestParam Long idProducto,
            @RequestParam Long idCliente,
            @RequestParam int cantidad) throws NoHayStockException {
        return carritoService.ingresarProductoCarrito(idProducto, idCliente, cantidad);
    }

    @RequestMapping(value = "/eliminar", method = RequestMethod.PUT)
    public ObjResponse eliminarProductoCarrito(
            @RequestParam Long idProducto,
            @RequestParam Long idCliente){
        return carritoService.eliminarProductoCarrito(idProducto, idCliente);
    }

    @RequestMapping(value = "/consultar", method = RequestMethod.GET)
    public ObjResponse eliminarProductoCarrito(
            @RequestParam Long idCliente){
        return carritoService.consultarCarrito(idCliente);
    }

    @RequestMapping(value = "/totalizar", method = RequestMethod.GET)
    public ObjResponse totalizarCarrito(
            @RequestParam Long idCliente){
        return carritoService.totalizarCarrito(idCliente);
    }

}
