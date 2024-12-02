package utez.edu.mx.SAVEM.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dao.CategoriaDao;
import utez.edu.mx.SAVEM.model.dto.CategoriaDto;
import utez.edu.mx.SAVEM.model.entity.Categoria;

import java.util.Optional;
@Service
public class CategoriaService {
    private final CategoriaDao categoriaDao;

    public CategoriaService(CategoriaDao categoriaDao) {
        this.categoriaDao = categoriaDao;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findAll() {
        return new ResponseEntity<>(new ApiResponse(categoriaDao.findAll(), HttpStatus.OK), HttpStatus.OK);
    }
    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findById(Long id) {
        Optional<Categoria> foundCategoria = categoriaDao.findById(id);
        if (foundCategoria.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "CategoriaNotFound"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ApiResponse(foundCategoria, HttpStatus.OK), HttpStatus.OK);
    }
    /*
    @Transactional(rollbackFor = {Exception.class})
    public ResponseEntity<ApiResponse> register(CategoriaDto categoria) {
        Optional<Categoria> foundCategoria = categoriaDao.findById(categoria.getId_categoria());
        if (foundCategoria.isPresent()) {
            Categoria categoria1 = foundCategoria.get();
            categoria1.setId_categoria(categoria.getId_categoria());
            categoria1.setNombre(categoria.getNombre());

            categoriaDao.save(categoria1);
            return new ResponseEntity<>(new ApiResponse(categoria1, HttpStatus.OK), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "CategoriaNotFound"), HttpStatus.NOT_FOUND);
        }
    }

    @Transactional(rollbackFor = {Exception.class})
    public ResponseEntity<ApiResponse> update(CategoriaDto categoria) {
        Categoria foundCategoria = categoriaDao.findById(categoria.getId_categoria()).orElseThrow(
                () -> new RuntimeException("CategoriaNotFound")
        );
        foundCategoria.setId_categoria(categoria.getId_categoria());
        foundCategoria.setNombre(categoria.getNombre());

        categoriaDao.save(foundCategoria);
        return new ResponseEntity<>(new ApiResponse(foundCategoria, HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {Exception.class})
    public ResponseEntity<ApiResponse> delete(Long id) {
        Optional<Categoria> foundCategoria = categoriaDao.findById(id);
        if (foundCategoria.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "CategoriaNotFound"), HttpStatus.NOT_FOUND);
        }
        categoriaDao.deleteById(id);
        return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, true, "CategoriaDeleted"), HttpStatus.OK);
    }
    */
}
