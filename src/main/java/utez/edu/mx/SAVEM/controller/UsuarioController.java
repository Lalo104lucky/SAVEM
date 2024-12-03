package utez.edu.mx.SAVEM.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dto.UsuarioDto;
import utez.edu.mx.SAVEM.services.IEmailService;
import utez.edu.mx.SAVEM.services.UsuarioService;

import java.util.Map;

@RestController
@RequestMapping("/savem/usuario")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class UsuarioController {
    private final UsuarioService usuarioService;
    private final PasswordEncoder passwordEncoder;

    private String tokenComp;

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll(){
        return usuarioService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id){
        return usuarioService.findBydId(id);
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> register(@RequestBody UsuarioDto usuario){
        usuarioService.register(usuario, passwordEncoder);
        return new ResponseEntity<>(new ApiResponse(usuario, HttpStatus.OK), HttpStatus.OK);
    }

    @PutMapping("/")
    public ResponseEntity<ApiResponse> update(@RequestBody UsuarioDto usuario){
        try {
            usuarioService.update(usuario, passwordEncoder);
            return new ResponseEntity<>(new ApiResponse(usuario, HttpStatus.OK), HttpStatus.OK);
        } catch (Exception e){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PatchMapping("/chagestatus/{id}")
    public ResponseEntity<ApiResponse> chagestatus(@PathVariable Long id){
        usuarioService.chagestatus(id);
        return new ResponseEntity<>(new ApiResponse(id, HttpStatus.OK), HttpStatus.OK);
    }

    @PatchMapping("/changeContra/{id}")
    public ResponseEntity<ApiResponse> changeContrasena(@PathVariable("id") Long id, @RequestBody UsuarioDto usuarioDto){
        return usuarioService.changeContrasena(id, usuarioDto, passwordEncoder);
    }



}
