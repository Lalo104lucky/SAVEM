package utez.edu.mx.SAVEM.model.dto;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.*;
import utez.edu.mx.SAVEM.model.entity.Rol;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class UsuarioDto {
    private Long id_usuario;
    private String correo;
    private String contra;
    private Boolean estatus;
    private Long id_rol;
    private Long id_persona;
}
