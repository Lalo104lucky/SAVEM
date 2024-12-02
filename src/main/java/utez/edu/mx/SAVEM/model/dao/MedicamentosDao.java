package utez.edu.mx.SAVEM.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import utez.edu.mx.SAVEM.model.entity.Medicamentos;

import java.util.List;
import java.util.Optional;

public interface MedicamentosDao extends JpaRepository<Medicamentos,Long> {

}
