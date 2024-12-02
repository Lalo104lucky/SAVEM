package utez.edu.mx.SAVEM.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dao.InventarioDao;
import utez.edu.mx.SAVEM.model.dto.InventarioDto;
import utez.edu.mx.SAVEM.model.entity.Inventario;

import java.sql.SQLException;
import java.util.Optional;
@Service
public class InventarioService {
    private final InventarioDao repository;

    public InventarioService(InventarioDao repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findAll() {
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findById(Long id) {
        Optional<Inventario> foundTipo = repository.findById(id);
        if (foundTipo.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "InventarioNotFound"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ApiResponse(foundTipo, HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> register(InventarioDto inventarioDto){
        Inventario inventario = new Inventario();
        inventario.setExtencias(inventarioDto.getExtencias());
        repository.save(inventario);
        return new ResponseEntity<>(new ApiResponse(inventario, HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(InventarioDto inventarioDto){
        Inventario foundInventario = repository.findById(inventarioDto.getId_inventario()).orElseThrow(
                () -> new RuntimeException("InventarioNotFound")
        );
        foundInventario.setId_inventario(inventarioDto.getId_inventario());
        foundInventario.setExtencias(inventarioDto.getExtencias());
        repository.saveAndFlush(foundInventario);
        return new ResponseEntity<>(new ApiResponse(foundInventario, HttpStatus.OK), HttpStatus.OK);
    }


}

