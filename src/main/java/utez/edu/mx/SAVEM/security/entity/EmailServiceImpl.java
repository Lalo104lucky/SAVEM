package utez.edu.mx.SAVEM.security.entity;

import jakarta.mail.MessagingException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import utez.edu.mx.SAVEM.model.dto.EmailDto;
import utez.edu.mx.SAVEM.services.IEmailService;
import jakarta.mail.internet.MimeMessage;
import org.thymeleaf.TemplateEngine;


@Service
public class EmailServiceImpl implements IEmailService {

    private final JavaMailSender javaMailSender;
    private final TemplateEngine templateEngine;

    public EmailServiceImpl(JavaMailSender javaMailSender, TemplateEngine templateEngine) {
        this.javaMailSender = javaMailSender;
        this.templateEngine = templateEngine;
    }

    @Override
    public void enviarCorreo(EmailDto emailDto) {
        try{
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(emailDto.getDestinatario());
            helper.setSubject(emailDto.getAsunto());

            Context context = new Context();
            context.setVariable("pin", emailDto.getPin());
            String contenidoHtml = templateEngine.process("email", context);

            helper.setText(contenidoHtml, true);
            javaMailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Error al enviar el correo: " + e.getMessage(), e);
        }
    }
}
