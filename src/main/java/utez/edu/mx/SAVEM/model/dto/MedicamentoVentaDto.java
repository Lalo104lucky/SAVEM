package utez.edu.mx.SAVEM.model.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class MedicamentoVentaDto {
    private Long id_medicamento;
    private Long cantidad;
}
