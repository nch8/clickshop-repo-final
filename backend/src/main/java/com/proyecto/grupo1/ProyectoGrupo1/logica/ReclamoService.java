package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.DtReclamo;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype.ObjResponse;

public interface ReclamoService {

    public ObjResponse iniciar (DtReclamo dtR);
    public ObjResponse listarReclamosVendedor (Long idVendedor);
    public ObjResponse gestionarReclamo(Long idCompra, int opcion, String mensaje, Double monto);


}
