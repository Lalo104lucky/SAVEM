package utez.edu.mx.SAVEM.model.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import utez.edu.mx.SAVEM.model.entity.Categoria;

@Repository
public interface CategoriaDao extends JpaRepository<Categoria,Long> {
    @Modifying
    @Query(value = "INSERT INTO categoria (id_categoria, nombre) VALUES (:id_categoria, :nombre)", nativeQuery = true)
    int saveCategoria(@Param("id_categoria")Long id_categoria, @Param("nombre") String nombre);
}
