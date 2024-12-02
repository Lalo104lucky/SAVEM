package utez.edu.mx.SAVEM.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import utez.edu.mx.SAVEM.model.entity.Usuario;

import java.util.Optional;

public interface UsuarioDao extends JpaRepository<Usuario,Long> {
    Optional<Usuario> findUsuarioByCorreo(String correo);

    Optional<Usuario> findFirstByCorreoAndEstatusIsTrue(String correo);


    @Modifying
    @Query(value = "INSERT INTO usuario (estatus, id_usuario, id_persona, id_rol, correo, contra) VALUES (:estatus, :id_usuario, :id_persona, :id_rol, :correo, :contra)", nativeQuery = true)
    int saveUsuario(@Param("estatus") Boolean estatus, @Param("id_usuario") Long id_usuario, @Param("id_persona") Long id_persona, @Param("id_rol") Long id_rol, @Param("correo") String correo, @Param("contra") String contra);
}
