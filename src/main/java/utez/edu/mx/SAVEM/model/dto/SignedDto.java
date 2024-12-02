package utez.edu.mx.SAVEM.model.dto;

import lombok.Value;
import utez.edu.mx.SAVEM.model.entity.Usuario;

@Value
public class SignedDto {
    String token;
    String tokenType;
    Usuario usuario;
    Long personas;
}
