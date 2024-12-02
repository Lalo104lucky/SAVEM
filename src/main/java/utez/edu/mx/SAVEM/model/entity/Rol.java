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
@Table(name = "Rol")
public class Rol {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_rol")
    private Long id_rol;

    @Column(name = "rol", nullable = false)
    private String rol;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "rol")
    @JsonIgnore
    private List<Usuario> usuario;
}
