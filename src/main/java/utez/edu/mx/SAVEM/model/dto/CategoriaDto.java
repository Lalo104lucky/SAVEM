package utez.edu.mx.SAVEM.model.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class CategoriaDto {
    private Long id_categoria;
    private String nombre;
}

