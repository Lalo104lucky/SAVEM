package utez.edu.mx.SAVEM.model.dto;

import lombok.*;
import utez.edu.mx.SAVEM.model.entity.Medicamentos;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class VentasDto {
    private Long no_venta;
    private LocalDateTime fecha;
    private String tipo_pago;
    private double total;
    private Long id_usuario;
    private List<MedicamentoVentaDto> medicamentos;
}
