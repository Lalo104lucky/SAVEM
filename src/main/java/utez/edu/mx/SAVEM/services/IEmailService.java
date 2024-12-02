package utez.edu.mx.SAVEM.services;

import jakarta.mail.MessagingException;
import utez.edu.mx.SAVEM.model.dto.EmailDto;

public interface IEmailService {
    void enviarCorreo(EmailDto emailDto);
}
