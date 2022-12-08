package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.TipoPago;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.List;

@Getter @Setter
public class DtPago {

    private Long idCliente;
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd' 'HH:mm:ss[.SSS][.SS][.S]")
    private LocalDateTime fecha;
    private TipoPago metodo;
    private String referenciaExterna;
}
