package utez.edu.mx.SAVEM.model.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;


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
    private String codigo;
    private LocalDate caducidad;
    private String marca;
    private Double precio;
    private String descripcion;
    private String imagen;
    private Long id_categoria;
    private Long id_inventario;
    private Boolean prescripcion;
    private Long cantidadvendida;
}
