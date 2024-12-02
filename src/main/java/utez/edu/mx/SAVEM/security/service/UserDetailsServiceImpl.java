package utez.edu.mx.SAVEM.security.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.SAVEM.model.entity.Usuario;
import utez.edu.mx.SAVEM.security.entity.UserDetailsImpl;
import utez.edu.mx.SAVEM.services.UsuarioService;

import java.util.Optional;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {
    private final UsuarioService service;

    public UserDetailsServiceImpl(UsuarioService service) {
        this.service = service;
    }

    @Override
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        Optional<Usuario> foundUsuario = service.findUserByCorreo(correo);
        if(foundUsuario.isPresent()){
            return UserDetailsImpl.build(foundUsuario.get());
        }
        throw new UsernameNotFoundException("UserNoFound");
    }
}
