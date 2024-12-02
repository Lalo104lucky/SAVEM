package utez.edu.mx.SAVEM.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dto.EmailDto;
import utez.edu.mx.SAVEM.security.entity.EmailServiceImpl;
import utez.edu.mx.SAVEM.services.IEmailService;

@RestController
@RequestMapping("/savem")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmailController {
    private final IEmailService emailService;

    public EmailController(IEmailService emailService) {
        this.emailService = emailService;
    }

    @PostMapping("/send-email")
    private ResponseEntity<ApiResponse> sendEmail(@RequestBody EmailDto email) {
        try{
            emailService.enviarCorreo(email);
            return new ResponseEntity<>(new ApiResponse(email, HttpStatus.OK), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND,true, e.getMessage()), HttpStatus.NOT_FOUND);
        }

    }

}
