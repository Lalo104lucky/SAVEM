package utez.edu.mx.SAVEM.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utez.edu.mx.SAVEM.model.entity.Inventario;

@Repository
public interface InventarioDao extends JpaRepository<Inventario,Long> {
}
