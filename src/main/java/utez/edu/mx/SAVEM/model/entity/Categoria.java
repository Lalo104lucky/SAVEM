package utez.edu.mx.SAVEM.model.entity;

import jakarta.persistence.*;
import lombok.*;

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

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "categoria")
    private Medicamentos medicamentos;

}
