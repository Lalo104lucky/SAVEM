package utez.edu.mx.SAVEM.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;
import java.time.LocalDateTime;
import java.util.List;


@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@ToString
@Table(name = "medicamentos")
public class Medicamentos {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_medicamento")
    private Long id_medicamento;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "clave", nullable = false)
    private String clave;

    @Column(name = "caducidad", nullable = false)
    private LocalDateTime caducidad;

    @Column(name = "marca", nullable = false)
    private String marca;

    @Column(name = "precio", nullable = false)
    private Double precio;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "imagen", nullable = false)
    private Blob imagen;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "medicamentos")
    private List<Ventas> ventas;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_inventario")
    private Inventario inventario;
}
