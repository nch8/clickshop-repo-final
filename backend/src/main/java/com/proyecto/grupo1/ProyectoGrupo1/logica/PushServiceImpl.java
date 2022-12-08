package com.proyecto.grupo1.ProyectoGrupo1.logica;

import com.proyecto.grupo1.ProyectoGrupo1.dao.NotificacionDao;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.Notificacion;
import com.proyecto.grupo1.ProyectoGrupo1.entidades.PushRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.net.URL;
import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import javax.json.JsonObject;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.Invocation;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Form;
import javax.ws.rs.core.Response;

@Service
public class PushServiceImpl implements PushService{

    Logger log = LoggerFactory.getLogger(getClass());

    final String ENDPOINT_PUSH = "https://fcm.googleapis.com";

    @Autowired
    NotificacionDao notificacionDao;

    @Override
    public ResponseEntity<String> sendPush(PushRequest request) {

    try {
        //Creamos el cliente de conexión al API Restful
        Client client = ClientBuilder.newClient();

        //Creamos el target lo cuál es nuestra URL junto con el nombre del método a llamar
        WebTarget target = client.target(ENDPOINT_PUSH + "/fcm/send");

        //Creamos nuestra solicitud que realizará el request
        Invocation.Builder solicitud = target.request();
        solicitud.header("Authorization", "key=AAAAEvHqA7s:APA91bEMv3Op-bYpYzj9zeIrY5G21aKQNb83fLEAho9fH7BUsZGeS7p2ZRiPlTgNpuKVKlQKHM_zN1vBoVtVKsvybbQ9HIkggpFGQKKAyESJ9FUIi29GebE2uADNrk8EErx2SxxVTuvT");

        //Convertimos el objeto req a un json
        Gson gson = new Gson();
        String jsonString = gson.toJson(request);
        log.info(jsonString);

        //Enviamos nuestro json vía post al API Restful
        Response post = solicitud.post(Entity.json(jsonString));

        //Recibimos la respuesta y la leemos en una clase de tipo String, en caso de que el json sea tipo json y no string, debemos usar la clase de tipo JsonObject.class en lugar de String.class
        String responseJson = post.readEntity(String.class);

        //Imprimimos el status de la solicitud
        log.info("Estatus: " + post.getStatus());

        switch (post.getStatus()) {
            case 200:
                log.info("Push enviada. Response: " + responseJson);
                //notificacionDao.save(request.getNotification());
                return ResponseEntity.ok("Push enviada. Response: " + responseJson);
            default:
                log.warn("Error enviando push");
                return new ResponseEntity<>("Error enviando push", HttpStatus.INTERNAL_SERVER_ERROR);
        }


    } catch (Exception e) {
            log.warn("Error enviando push, detail: [{}]", e.getMessage());
            return new ResponseEntity<>("Error enviando push", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
