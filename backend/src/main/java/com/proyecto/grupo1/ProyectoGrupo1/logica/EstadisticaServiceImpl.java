package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.dao.ClienteDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.CompraDao;
import com.proyecto.grupo1.ProyectoGrupo1.dao.ProductoDao;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtUsuarioBO;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.CategoProd;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.Rol;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Compra;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class EstadisticaServiceImpl implements EstadisticaService{

    @Autowired
    CompraDao compraDao;
    @Autowired
    ProductoDao productoDao;
    @Autowired
    AdministradorService admService;

    @Override
    public ObjResponse comprasPorDia(Date fechaInicio, Date fechaFin) {
        List<Compra> compras = new ArrayList<Compra>();

        if(fechaInicio == null || fechaFin == null){
             compras = compraDao.findAll();
        } else {
            fechaFin.setHours(23);
            fechaFin.setMinutes(59);
            compras = compraDao.getAllByFechaIsAfterAndFechaIsBefore(fechaInicio, fechaFin);
        }

        Map<String, Integer> estadisticas = new HashMap<String, Integer>();;

        SimpleDateFormat dt = new SimpleDateFormat("yyyy-MM-dd");

        for(Compra c : compras){
            String fecha = dt.format(c.getFecha());

            if(estadisticas.get(fecha) == null){
                estadisticas.put(fecha, 1 );
            } else {
                Integer i = estadisticas.get(fecha)+1;
                estadisticas.put(fecha, i);
            }
        }

        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), estadisticas);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse productosPorCategoria() {
        List<Producto> productos = productoDao.findAll();
        Map<CategoProd, Integer> estadisticas = new HashMap<CategoProd, Integer>();;

        for(Producto p : productos){
            if(estadisticas.get(p.getCategoria()) == null){
                estadisticas.put(p.getCategoria(), 1 );
            } else {
                Integer i = estadisticas.get(p.getCategoria())+1;
                estadisticas.put(p.getCategoria(), i);
            }
        }

        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), estadisticas);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

    @Override
    public ObjResponse cantidadUsuariosYVendedores() {
        List<DtUsuarioBO> usuarios = (List<DtUsuarioBO>) admService.listarUsuarios().getObjeto();
        Map<Rol, Integer> estadisticas = new HashMap<Rol, Integer>();

        for(DtUsuarioBO u : usuarios){
            if(estadisticas.get(u.getRol()) == null){
                estadisticas.put(u.getRol(), 1 );
            } else {
                Integer i = estadisticas.get(u.getRol())+1;
                estadisticas.put(u.getRol(), i);
            }
        }

        try {
            return new ObjResponse("Exito", HttpStatus.OK.value(), estadisticas);
        }catch (Exception e){
            return new ObjResponse("Error", HttpStatus.BAD_REQUEST.value(),null);
        }
    }

}
