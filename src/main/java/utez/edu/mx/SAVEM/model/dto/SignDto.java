package utez.edu.mx.SAVEM.model.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

@Data
public class SignDto {
    @NotBlank
    @NotEmpty
    private String correo;
    @NotBlank
    @NotEmpty
    private String contrasena;
}
