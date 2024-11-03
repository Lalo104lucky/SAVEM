package utez.edu.mx.SAVEM.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import utez.edu.mx.SAVEM.model.entity.Persona;

public interface PersonaDao extends JpaRepository<Persona,Long> {
}
