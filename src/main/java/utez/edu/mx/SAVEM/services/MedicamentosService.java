package utez.edu.mx.SAVEM.services;

import org.hibernate.validator.constraints.CreditCardNumber;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dao.CategoriaDao;
import utez.edu.mx.SAVEM.model.dao.InventarioDao;
import utez.edu.mx.SAVEM.model.dao.MedicamentosDao;
import utez.edu.mx.SAVEM.model.dto.MedicamentosDto;
import utez.edu.mx.SAVEM.model.entity.Categoria;
import utez.edu.mx.SAVEM.model.entity.Inventario;
import utez.edu.mx.SAVEM.model.entity.Medicamentos;

import java.sql.SQLException;
import java.util.Optional;
@Service
public class MedicamentosService {
    private final MedicamentosDao medicamentosDao;
    private final CategoriaDao categoriaDao;
    private final InventarioDao inventarioDao;

    public MedicamentosService(CategoriaDao categoriaDao, MedicamentosDao medicamentosDao, InventarioDao inventarioDao) {
        this.categoriaDao = categoriaDao;
        this.medicamentosDao = medicamentosDao;
        this.inventarioDao = inventarioDao;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findAll(){
        return new ResponseEntity<>(new ApiResponse(medicamentosDao.findAll(), HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findById(Long id){
        Optional<Medicamentos> foundMedicamento = medicamentosDao.findById(id);
        if (foundMedicamento.isEmpty()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "MedicamentoNotFound"), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(new ApiResponse(foundMedicamento, HttpStatus.OK), HttpStatus.OK);
    }


    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> register(MedicamentosDto medicamentosDto){
        Categoria foundCategoria = categoriaDao.findById(medicamentosDto.getId_categoria())
                .orElseThrow(()-> new RuntimeException("CategoriaNotFound"));
        Inventario foundInventario = inventarioDao.findById(medicamentosDto.getId_inventario())
                .orElseThrow(()-> new RuntimeException("InventarioNotFound"));

        Long cantidadV = 0L;
        Medicamentos medicamento = new Medicamentos();
        medicamento.setNombre(medicamentosDto.getNombre());
        medicamento.setClave(medicamentosDto.getClave());
        medicamento.setCodigo(medicamentosDto.getCodigo());
        medicamento.setCaducidad(medicamentosDto.getCaducidad());
        medicamento.setMarca(medicamentosDto.getMarca());
        medicamento.setPrecio(medicamentosDto.getPrecio());
        medicamento.setDescripcion(medicamentosDto.getDescripcion());
        medicamento.setImagen(medicamentosDto.getImagen());
        medicamento.setPrescripcion(medicamento.isPrescripcion());
        medicamento.setCategoria(foundCategoria);
        medicamento.setInventario(foundInventario);
        medicamento.setCantidadvendida(cantidadV);
        medicamentosDao.save(medicamento);
        return new ResponseEntity<>(
                new ApiResponse(medicamento, HttpStatus.OK), HttpStatus.OK
        );
   }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(MedicamentosDto medicamentosDto){
        Medicamentos foundMedicamento = medicamentosDao.findById(medicamentosDto.getId_medicamento()).orElseThrow(
                () -> new RuntimeException("MedicamentoNotFound"));
        Categoria foundCategoria = categoriaDao.findById(medicamentosDto.getId_categoria())
                .orElseThrow(()-> new RuntimeException("CategoriaNotFound"));
        Inventario foundInventario = inventarioDao.findById(medicamentosDto.getId_inventario())
                .orElseThrow(()-> new RuntimeException("InventarioNotFound"));

        foundMedicamento.setId_medicamento(medicamentosDto.getId_medicamento());
        foundMedicamento.setNombre(medicamentosDto.getNombre());
        foundMedicamento.setClave(medicamentosDto.getClave());
        foundMedicamento.setCaducidad(medicamentosDto.getCaducidad());
        foundMedicamento.setCodigo(medicamentosDto.getCodigo());
        foundMedicamento.setMarca(medicamentosDto.getMarca());
        foundMedicamento.setPrecio(medicamentosDto.getPrecio());
        foundMedicamento.setDescripcion(medicamentosDto.getDescripcion());
        foundMedicamento.setImagen(medicamentosDto.getImagen());
        foundMedicamento.setCategoria(foundCategoria);
        foundMedicamento.setInventario(foundInventario);
        medicamentosDao.saveAndFlush(foundMedicamento);
        return new ResponseEntity<>(new ApiResponse(foundMedicamento, HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {Exception.class})
    public ResponseEntity<ApiResponse> delete(Long id){
        Optional<Medicamentos>  foundmedicamento = medicamentosDao.findById(id);
        if (foundmedicamento.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "MedicamentoNotfound"), HttpStatus.NOT_FOUND);
        }
        medicamentosDao.deleteById(id);
        return new ResponseEntity<>(new ApiResponse(HttpStatus.OK, false, "MedicamentoEliminado"), HttpStatus.OK);
    }
}





