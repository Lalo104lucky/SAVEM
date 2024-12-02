package utez.edu.mx.SAVEM.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dao.RolDao;
import utez.edu.mx.SAVEM.model.entity.Rol;

import java.util.Optional;

@Service
public class RolService {
    private final RolDao repository;

    public RolService(RolDao repository) {
        this.repository = repository;
    }
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> finAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findById(Long id){
        Optional<Rol> foundTipo = repository.findById(id);
        if (foundTipo.isEmpty()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "RolNotFound"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ApiResponse(foundTipo, HttpStatus.OK), HttpStatus.OK);
    }
}
