package com.proyecto.grupo1.ProyectoGrupo1.controladores;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtProducto;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.CategoProd;
import com.proyecto.grupo1.ProyectoGrupo1.logica.ProductoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/producto")
public class ProductoController {
    @Autowired
    ProductoService productoService;

    @RequestMapping(value = "/alta", method = RequestMethod.POST)
    public ObjResponse insertar(@RequestBody DtProducto dtP){
            return productoService.altaProducto(dtP);
    }
    @RequestMapping(value = "/obtener", method = RequestMethod.GET)
    public ObjResponse obtener(@RequestParam Long idProducto){
        return productoService.obtener(idProducto);
    }
    @RequestMapping(value = "/modificar", method = RequestMethod.PUT)
    public ObjResponse modificar(@RequestBody DtProducto dtP){
        return productoService.modificarProducto(dtP);
    }
    @RequestMapping(value = "/baja", method = RequestMethod.PUT)
    public ObjResponse insertar(@RequestParam Long idProducto, Long idVendedor){
        return productoService.bajaProducto(idProducto, idVendedor);
    }
    @RequestMapping(value = "/listarActivos", method = RequestMethod.GET)
    public ObjResponse listarActivos(){
        return productoService.listar();
    }
    @RequestMapping(value = "/listarTodos", method = RequestMethod.GET)
    public ObjResponse listarTodos(){
        return productoService.listarTodos();
    }
    @RequestMapping(value = "/listarPorVendedor", method = RequestMethod.GET)
    public ObjResponse listarTodos(@RequestParam Long idVendedor){
        return productoService.listarPorVendedor(idVendedor);
    }
    @RequestMapping(value = "/listarPorCategoria", method = RequestMethod.GET)
    public ObjResponse listarTodos(@RequestParam CategoProd categoria){
        return productoService.listarPorCategoria(categoria);
    }
    @RequestMapping(value = "/buscarPorNombre", method = RequestMethod.GET)
    public ObjResponse listarTodos(@RequestParam String nombre){
        return productoService.buscarPorNombre(nombre);
    }
    @RequestMapping(value = "/buscarPorNombreYVendedor", method = RequestMethod.GET)
    public ObjResponse listarTodos(@RequestParam String nombre, @RequestParam Long idVendedor){
        return productoService.buscarPorNombreYVendedor(nombre, idVendedor);
    }

}