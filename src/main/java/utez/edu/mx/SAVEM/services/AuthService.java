package utez.edu.mx.SAVEM.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dto.SignedDto;
import utez.edu.mx.SAVEM.model.entity.Usuario;
import utez.edu.mx.SAVEM.security.jwt.JwtProvider;

import java.util.Optional;


@Service
@Transactional
public class AuthService {
    private final UsuarioService service;
    private final AuthenticationManager manager;
    private final JwtProvider provider;

    public AuthService(UsuarioService service, AuthenticationManager manager, JwtProvider provider) {
        this.service = service;
        this.manager = manager;
        this.provider = provider;
    }

    @Transactional
    public ResponseEntity<ApiResponse> signIn(String correo, String password){
        try{
            Optional<Usuario> foundUser = service.findUserByCorreo(correo);
            Optional<Usuario> foundUserEnable = service.findUserByCorreoAndEstatus(correo);
            if(foundUser.isEmpty()){
                return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "UserNotFound"), HttpStatus.BAD_REQUEST);
            }
            if(foundUserEnable.isEmpty()){
                return new ResponseEntity<>(new ApiResponse(HttpStatus.LOCKED, true, "UserDisable"), HttpStatus.BAD_REQUEST);
            }

            Usuario usuario = foundUser.get();
            Authentication auth = manager.authenticate(new UsernamePasswordAuthenticationToken(correo, password));
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = provider.generateToken(auth);
            SignedDto signed = new SignedDto(token, "Bearer", usuario, usuario.getPersona().getId_persona());
            return new ResponseEntity<>(new ApiResponse(signed, HttpStatus.OK), HttpStatus.OK);
        }catch (Exception e){
            String message = "CredentialMismatch";
            if(e instanceof DisabledException){
                message = "UserDisabled";
            }
            return new ResponseEntity<>(new ApiResponse(HttpStatus.BAD_REQUEST, true, message), HttpStatus.BAD_REQUEST);
        }
    }
}
