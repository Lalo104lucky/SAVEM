package utez.edu.mx.SAVEM.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class InventarioDto {
    private Long id_inventario;
    private Long extencias;
}
