package utez.edu.mx.SAVEM.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "persona")
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_persona")
    private Long id_persona;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name ="ap1", nullable = false)
    private String ap1;

    @Column(name = "ap2", nullable = false)
    private String ap2;

    @Column(name = "Rfc", nullable = false)
    private String rfc;

    @Column(name = "Genero", nullable = false)
    private String genero;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "persona")
    @JsonIgnore
    private Usuario usuario;
}
