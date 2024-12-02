package utez.edu.mx.SAVEM.model.dto;

import jakarta.persistence.Column;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class RolDto {
    private Long id_rol;
    private String rol;
}
