package com.proyecto.grupo1.ProyectoGrupo1.seguridad;

import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.stereotype.Service;

@Service
public class PasswordServiceImpl implements PasswordSevice{
    @Override
    public String hashearPassword(String contra) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String passHasheado = argon2.hash(1,1024, 1, contra);
        //1 = cantidad de iteraciones //1024 = uso de memoria - 1GB //1 = paralelismo, numero de hilos //contraseña a hashear
        return passHasheado;
    }

    @Override
    public boolean verificarHash(String contraBD, String contraLogin) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        //Compara la contrasena guardada en la bd y la que ingresa el usuario
        return argon2.verify(contraBD,contraLogin);
    }
}
