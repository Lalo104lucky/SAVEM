package utez.edu.mx.SAVEM.model.entity;

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
@Table(name = "inventario")
public class Inventario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_inventario")
    private Long id_inventario;

    @Column(name = "extencias", nullable = false)
    private Long extencias;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "inventario")
    private List<Medicamentos> medicamentos;
}
