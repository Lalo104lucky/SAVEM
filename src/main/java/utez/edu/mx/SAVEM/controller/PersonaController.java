package utez.edu.mx.SAVEM.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dto.PersonaDto;
import utez.edu.mx.SAVEM.services.PersonaService;

@RestController
@RequestMapping("/savem/persona")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class PersonaController {
    private final PersonaService service;
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id){
        return service.findById(id);
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll(){
        return service.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> save(@RequestBody PersonaDto personaDto){
        try {
            return service.register(personaDto);
        } catch (Exception e){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/")
    public ResponseEntity<ApiResponse> update(@RequestBody PersonaDto personaDto){
        try {
            service.update(personaDto);
            return new ResponseEntity<>(new ApiResponse(personaDto, HttpStatus.OK), HttpStatus.OK);
        } catch (RuntimeException runtimeException){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, runtimeException.getMessage()), HttpStatus.NOT_FOUND);
        }
    }


}
