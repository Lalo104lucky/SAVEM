package utez.edu.mx.SAVEM.services;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dao.PersonaDao;
import utez.edu.mx.SAVEM.model.dao.RolDao;
import utez.edu.mx.SAVEM.model.dao.UsuarioDao;
import utez.edu.mx.SAVEM.model.dto.UsuarioDto;
import utez.edu.mx.SAVEM.model.entity.Persona;
import utez.edu.mx.SAVEM.model.entity.Rol;
import utez.edu.mx.SAVEM.model.entity.Usuario;

import java.sql.SQLException;
import java.util.Optional;

@Service
@Transactional
public class UsuarioService {
    private final UsuarioDao repository;
    private final RolDao rolDao;
    private final PersonaDao personaDao;

    public UsuarioService(UsuarioDao repository, RolDao rolDao, PersonaDao personaDao) {
        this.repository = repository;
        this.rolDao = rolDao;
        this.personaDao = personaDao;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findAll() {
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findBydId(Long id) {
        Optional<Usuario> foundUser = repository.findById(id);
        if (foundUser.isEmpty()) {
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, "UserNotFound"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ApiResponse(foundUser.get(), HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> changeContrasena(Long id, UsuarioDto usuarioDto, PasswordEncoder passwordEncoder){
        Optional<Usuario> foundUsuario = repository.findById(id);
        if (foundUsuario.isEmpty()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "UserNotFound"), HttpStatus.NOT_FOUND);
        }
        Usuario usuario = foundUsuario.get();
        String encryptedPassowrd = passwordEncoder.encode(usuarioDto.getContra());
        usuario.setContra(encryptedPassowrd);

        return new ResponseEntity<>(new ApiResponse(repository.save(usuario), HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> register(UsuarioDto usuarioDto, PasswordEncoder passwordEncoder) {
        Rol tipoUsuario = rolDao.findById(usuarioDto.getId_rol()).orElseThrow(
                () -> new RuntimeException("RolNotFound")
        );
        Persona persona = personaDao.findById(usuarioDto.getId_persona()).orElseThrow(
                () -> new RuntimeException("PersonaNotFound")
        );
        Usuario usuario = new Usuario();
        usuario.setCorreo(usuarioDto.getCorreo());
        usuario.setContra(passwordEncoder.encode(usuarioDto.getContra()));
        usuario.setEstatus(true);
        usuario.setRol(tipoUsuario);
        usuario.setPersona(persona);
        repository.save(usuario);
        return new ResponseEntity<>(new ApiResponse(usuario, HttpStatus.OK), HttpStatus.OK);
    }


    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(UsuarioDto usuarioDto, PasswordEncoder passwordEncoder) {
        Usuario foundUsuario = repository.findById(usuarioDto.getId_usuario()).orElseThrow(
                ()-> new RuntimeException("UsuarioNotFound")
        );
        Rol tipoUsuario = rolDao.findById(usuarioDto.getId_rol()).orElseThrow(
                () -> new RuntimeException("RolNotFound")
        );
        Persona foundPersona = personaDao.findById(usuarioDto.getId_persona()).orElseThrow(
                () -> new RuntimeException("PersonaNotFound")
        );

        foundUsuario.setId_usuario(usuarioDto.getId_usuario());
        foundUsuario.setRol(tipoUsuario);
        foundUsuario.setContra(passwordEncoder.encode(foundUsuario.getContra()));
        foundUsuario.setCorreo(usuarioDto.getCorreo());
        foundUsuario.setEstatus(usuarioDto.getEstatus());
        foundUsuario.setPersona(foundPersona);
        repository.saveAndFlush(foundUsuario);
        return new ResponseEntity<>(new ApiResponse(foundUsuario, HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public void chagestatus(Long id){
        Optional<Usuario> foundUsuario = repository.findById(id);
        if (foundUsuario.isPresent()){
            Usuario user = foundUsuario.get();
            user.setEstatus(!user.getEstatus());
        } else {
            throw new EntityNotFoundException("UsuarioNotFound");
        }
    }

    @Transactional
    public Optional<Usuario> findUserByCorreoAndEstatus(String correo){
        return repository.findFirstByCorreoAndEstatusIsTrue(correo);
    }

    @Transactional
    public Optional<Usuario> findUserByCorreo(String correo) {
        return repository.findUsuarioByCorreo(correo);
    }

}
