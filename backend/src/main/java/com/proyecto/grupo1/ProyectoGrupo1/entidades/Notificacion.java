package com.proyecto.grupo1.ProyectoGrupo1.entidades;

import com.proyecto.grupo1.ProyectoGrupo1.dao.NotificacionDao;
import com.proyecto.grupo1.ProyectoGrupo1.datatypes.enums.TipoNotificacion;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;
import java.util.Calendar;
import java.util.Date;

@Document("notificaciones")
@Getter @Setter @ToString
public class Notificacion {
    @Enumerated(EnumType.STRING)
    private TipoNotificacion tipo;
    private String title;
    private String body;
    private Date fecha = Calendar.getInstance().getTime();
    private boolean vista = false;
    private Long idCliente;

    public Notificacion() {
    }

    public Notificacion(TipoNotificacion tipo, String title, String body, Long idCliente) {
        this.tipo = tipo;
        this.title = title;
        this.body = body;
        this.idCliente = idCliente;
    }
}
