package utez.edu.mx.SAVEM.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dto.CategoriaDto;
import utez.edu.mx.SAVEM.services.CategoriaService;

@RestController
@RequestMapping("/savem/categoria")
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequiredArgsConstructor
public class CategoriaController {
    private final CategoriaService service;

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getById(@PathVariable Long id){
        return service.findById(id);
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> getAll(){
        return service.findAll();
    }

    /*
    @PostMapping("/")
    public ResponseEntity<ApiResponse> save(@RequestBody CategoriaDto categoriaDto){
        try {
            return service.register(categoriaDto);
        } catch (Exception e){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/")
    public ResponseEntity<ApiResponse> update(@RequestBody CategoriaDto categoriaDto){
        try {
            service.update(categoriaDto);
            return new ResponseEntity<>(new ApiResponse(categoriaDto, HttpStatus.OK), HttpStatus.OK);
        } catch (RuntimeException runtimeException){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, runtimeException.getMessage()), HttpStatus.NOT_FOUND);
        }
    }
    */

}
