package utez.edu.mx.SAVEM.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "detalle_venta")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
public class DetalleVenta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_venta", nullable = false)
    @JsonIgnore
    private Ventas venta;

    @ManyToOne
    @JoinColumn(name = "id_medicamento", nullable = false)
    @JsonIgnore
    private Medicamentos medicamento;

    @Column(nullable = false)
    private Long cantidad;

}
