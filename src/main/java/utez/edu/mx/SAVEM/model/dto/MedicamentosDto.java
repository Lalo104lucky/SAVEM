package utez.edu.mx.SAVEM.model.dto;

import jakarta.persistence.*;
import lombok.*;
import utez.edu.mx.SAVEM.model.entity.Categoria;
import utez.edu.mx.SAVEM.model.entity.Inventario;
import utez.edu.mx.SAVEM.model.entity.Ventas;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MedicamentosDto {

    private Long id_medicamento;
    private String nombre;
    private String clave;
    private LocalDateTime caducidad;
    private String marca;
    private Double precio;
    private String descripcion;
    private Blob imagen;
    private Long id_categoria;
    private Long id_inventario;

}
