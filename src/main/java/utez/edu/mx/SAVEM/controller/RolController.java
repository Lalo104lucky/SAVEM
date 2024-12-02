package utez.edu.mx.SAVEM.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.services.RolService;

@RestController
@RequestMapping("/savem/rol")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class RolController {
    private final RolService service;
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id){
        return service.findById(id);
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll(){
        return service.finAll();
    }
}
