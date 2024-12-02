package utez.edu.mx.SAVEM.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "categoria")
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_categoria")
    private Long id_categoria;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "categoria")
    @JsonIgnore
    private List<Medicamentos> medicamentos;

}
