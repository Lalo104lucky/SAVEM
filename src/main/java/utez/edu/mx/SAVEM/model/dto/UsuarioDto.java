package utez.edu.mx.SAVEM.model.dto;

import lombok.*;

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
