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
@Table(name = "Rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Long id_rol;

    @Column(name = "rol", nullable = false)
    private String rol;

    @OneToOne(cascade = CascadeType.ALL, mappedBy = "rol")
    private Usuario usuario;
}
