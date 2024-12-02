package utez.edu.mx.SAVEM.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import utez.edu.mx.SAVEM.model.entity.Rol;

public interface RolDao extends JpaRepository<Rol,Long> {
    @Modifying
    @Query(value = "INSERT INTO rol (id_rol, rol) VALUES (:id_rol, :rol)", nativeQuery = true)
    int saveRole(@Param("id_rol") Long id_rol, @Param("rol") String rol);
}
