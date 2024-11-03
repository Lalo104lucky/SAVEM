package utez.edu.mx.SAVEM.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import utez.edu.mx.SAVEM.model.entity.Ventas;

public interface VentasDao extends JpaRepository<Ventas,Long> {
}
