package utez.edu.mx.SAVEM.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;
import java.text.DateFormat;
import java.time.LocalDate;
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

    @Column(name= "codigo", nullable = false)
    private String codigo;

    @Column(name = "caducidad", nullable = false)
    private LocalDate caducidad;

    @Column(name = "marca", nullable = false)
    private String marca;

    @Column(name = "precio", nullable = false)
    private Double precio;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "imagen", nullable = false, columnDefinition = "MEDIUMTEXT")
    private String imagen;

    @Column(name = "prescripcion", nullable = false)
    private boolean prescripcion;

    @Column(name = "cantidadvendidad", nullable = false)
    private Long cantidadvendida;

    @ManyToMany(mappedBy = "medicamentos", cascade = CascadeType.MERGE)
    @JsonIgnore
    private List<Ventas> ventas;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_inventario")
    private Inventario inventario;

    @OneToMany(mappedBy = "medicamento", cascade = CascadeType.ALL)
    private List<DetalleVenta> detallesVenta;
}
