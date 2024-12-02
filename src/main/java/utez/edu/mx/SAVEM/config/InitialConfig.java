package utez.edu.mx.SAVEM.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.SAVEM.model.dao.CategoriaDao;
import utez.edu.mx.SAVEM.model.dao.PersonaDao;
import utez.edu.mx.SAVEM.model.dao.RolDao;
import utez.edu.mx.SAVEM.model.dao.UsuarioDao;

import java.sql.SQLException;

@Configuration
@RequiredArgsConstructor
public class InitialConfig implements CommandLineRunner {
    private final PersonaDao personaDao;
    private final UsuarioDao usuarioDao;
    private final RolDao rolDao;
    private final PasswordEncoder encoder;
    private final CategoriaDao categoriaDao;

    @Override
    @Transactional(rollbackFor = {SQLException.class})
    public void run(String... args) throws Exception {
        if(!rolDao.existsById(1L)){
            rolDao.saveRole(1L, "Administrador");
        }

        if(!rolDao.existsById(2L)){
            rolDao.saveRole(2L, "Empleado");
        }

        if(!categoriaDao.existsById(1L)){
            categoriaDao.saveCategoria(1L, "Patente");
        }

        if(!categoriaDao.existsById(2L)){
            categoriaDao.saveCategoria(2L, "Generico");
        }

        if(!personaDao.existsById(1L)){
            personaDao.savePersona(2020, 1L, "Carrera", "Oropeza","Masculino", "Maximiliano");
        }

        if(!personaDao.existsById(2L)){
            personaDao.savePersona(2020, 2L, "Jaimez", "Flores","Masculino", "Diego Eduardo");
        }

        if(!usuarioDao.existsById(1L)){
            usuarioDao.saveUsuario(true,1L, 1L, 1L, "20223tn012@utez.edu.mx", encoder.encode("20223tn012"));
        }

        if(!usuarioDao.existsById(2L)){
            usuarioDao.saveUsuario(true,2L, 2L, 2L, "20223tn021@utez.edu.mx", encoder.encode("20223tn021"));
        }



    }
}
