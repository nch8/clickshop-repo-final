package com.proyecto.grupo1.ProyectoGrupo1.datatypes.datatype;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class DtEntregaCompra {
    private Long idCompra;
    private String tipoEntrea;
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd' 'HH:mm:ss[.SSS][.SS][.S]")
    private LocalDateTime fechaHoraDesde;
    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd' 'HH:mm:ss[.SSS][.SS][.S]")
    private LocalDateTime fechaHoraHasta;
    private Long idDireccion;
    private DtDireccion direccion;
}
