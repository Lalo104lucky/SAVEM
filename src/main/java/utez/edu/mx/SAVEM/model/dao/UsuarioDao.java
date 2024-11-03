package utez.edu.mx.SAVEM.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import utez.edu.mx.SAVEM.model.entity.Usuario;

public interface UsuarioDao extends JpaRepository<Usuario,Long> {
}
