package utez.edu.mx.SAVEM.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
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
    @Min(value = 1, message = "La cantidad debe ser al menos 1.")
    private Long extencias;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "inventario")
    @JsonIgnore
    private List<Medicamentos> medicamentos;
}
