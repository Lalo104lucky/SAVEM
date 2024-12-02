package utez.edu.mx.SAVEM.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dto.VentasDto;
import utez.edu.mx.SAVEM.services.VentasService;

@RestController
@RequestMapping("/savem/ventas")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class VentasController {
    private final VentasService ventasService;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id){
        return ventasService.findById(id);
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll(){
        return ventasService.findAll();
    }

    @PostMapping("/")
    public ResponseEntity<ApiResponse> save(@RequestBody VentasDto ventasDto){
        try {
            return ventasService.register(ventasDto);
        } catch (Exception e){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
