package utez.edu.mx.SAVEM.model.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class PersonaDto {
    private Long id_persona;
    private String nombre;
    private String ap1;
    private String ap2;
    private String rfc;
    private String genero;
}
