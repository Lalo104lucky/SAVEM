package utez.edu.mx.SAVEM.model.dto;

import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.*;
import utez.edu.mx.SAVEM.model.entity.Usuario;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class VentasDto {

    private Long id_venta;
    private LocalDateTime fecha;
    private String nombre;
    private Double total;
    private Long id_usuario;
    private Long id_codigo;
}
