package com.proyecto.grupo1.ProyectoGrupo1.logica;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.proyecto.grupo1.ProyectoGrupo1.entidades.MailRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import org.springframework.mail.MailException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

@Service
public class MailServiceImpl implements MailService{
    Logger log = LoggerFactory.getLogger(getClass());

    @Value("${spring.mail.username}")
    private String from;

    @Autowired
    private JavaMailSender javaMailSender;

    public ResponseEntity<String> sendMail(MailRequest request) {
        MimeMessage msg = javaMailSender.createMimeMessage();
        try {
            MimeMessageHelper helper = new MimeMessageHelper(msg, false);
            helper.setTo(request.getTo());
            helper.setFrom(from);
            helper.setText(request.getText());
            helper.setSubject(request.getSubject());
            javaMailSender.send(msg);
        } catch (MailException | MessagingException e) {
            log.info("error in sending mail, detail: [{}]", e.getMessage());
            return new ResponseEntity<>("Error in sending mail", HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return ResponseEntity.ok("Mail send");
    }
}
