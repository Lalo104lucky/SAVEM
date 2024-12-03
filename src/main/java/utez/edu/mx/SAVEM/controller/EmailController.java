package utez.edu.mx.SAVEM.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dto.EmailDto;
import utez.edu.mx.SAVEM.model.entity.Usuario;
import utez.edu.mx.SAVEM.security.entity.EmailServiceImpl;
import utez.edu.mx.SAVEM.services.IEmailService;
import utez.edu.mx.SAVEM.services.UsuarioService;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/savem")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmailController {
    private final IEmailService emailService;
    private final UsuarioService usuarioService;

    public EmailController(IEmailService emailService, UsuarioService usuarioService) {
        this.emailService = emailService;
        this.usuarioService = usuarioService;
    }

    @PostMapping("/send-email")
    private ResponseEntity<ApiResponse> sendEmail(@RequestBody EmailDto email) {
        try {
            Optional<Usuario> foundUsuario = usuarioService.findUserByCorreo(email.getDestinatario());

            if (foundUsuario.isPresent()) {
                Usuario usuario = foundUsuario.get(); // Obtener el usuario encontrado
                emailService.enviarCorreo(email); // Enviar el correo
                Map<String, Object> responseBody = new HashMap<>();
                responseBody.put("email", email);
                responseBody.put("usuarioId", usuario.getId_usuario()); // Agregar el ID del usuario a la respuesta

                return new ResponseEntity<>(new ApiResponse(responseBody, HttpStatus.OK), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "Usuario no encontrado"), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
