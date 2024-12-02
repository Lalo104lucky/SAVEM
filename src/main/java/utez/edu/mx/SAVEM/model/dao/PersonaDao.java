package utez.edu.mx.SAVEM.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import utez.edu.mx.SAVEM.model.entity.Persona;

@Repository
public interface PersonaDao extends JpaRepository<Persona,Long> {
    @Modifying
    @Query(value = "INSERT INTO persona(rfc, id_persona, ap1, ap2, genero, nombre) VALUES(:rfc, :id_persona, :ap1, :ap2, :genero, :nombre)", nativeQuery = true)
    int savePersona(@Param("rfc") double rfc, @Param("id_persona") Long id_persona, @Param("ap1") String ap1, @Param("ap2") String ap2, @Param("genero") String genero, @Param("nombre") String nombre);
}
