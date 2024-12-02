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
@Table(name = "usuario")
public class Usuario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id_usuario;
    @Column(name = "correo", nullable = false)
    private String correo;
    @Column(name = "contra", nullable = false)
    private String contra;
    @Column(name="estatus", nullable = false)
    private Boolean estatus;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_rol")
    private Rol rol;

    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "id_persona")
    private Persona persona;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "usuario")
    @JsonIgnore
    private List<Ventas> ventas;
}
