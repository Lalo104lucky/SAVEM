package utez.edu.mx.SAVEM.services;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dao.PersonaDao;
import utez.edu.mx.SAVEM.model.dao.UsuarioDao;
import utez.edu.mx.SAVEM.model.dto.PersonaDto;
import utez.edu.mx.SAVEM.model.dto.UsuarioDto;
import utez.edu.mx.SAVEM.model.entity.Persona;
import utez.edu.mx.SAVEM.model.entity.Usuario;

import java.sql.SQLException;
import java.util.Optional;

@Service
public class PersonaService {
    private final PersonaDao repository;
    private final UsuarioDao usuarioRepository;

    public PersonaService(PersonaDao repository, UsuarioDao usuarioRepository) {
        this.repository = repository;
        this.usuarioRepository = usuarioRepository;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findById(Long id){
        Optional<Persona> foundPersona = repository.findById(id);
        if(foundPersona.isEmpty()){
            return new ResponseEntity<>(new ApiResponse(HttpStatus.NOT_FOUND, true, "PersonaNotFound"), HttpStatus.NOT_FOUND);        }
        return new ResponseEntity<>(new ApiResponse(foundPersona, HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> findAll(){
        return new ResponseEntity<>(new ApiResponse(repository.findAll(), HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> register(PersonaDto personaDto){
            Persona persona = new Persona();
            persona.setNombre(personaDto.getNombre());
            persona.setAp1(personaDto.getAp1());
            persona.setAp2(personaDto.getAp2());
            persona.setRfc(personaDto.getRfc());
            persona.setGenero(personaDto.getGenero());
            repository.save(persona);
            return new ResponseEntity<>(new ApiResponse(persona, HttpStatus.OK), HttpStatus.OK);
    }

    @Transactional(rollbackFor = {SQLException.class})
    public ResponseEntity<ApiResponse> update(PersonaDto personaDto){
        Usuario foundUsuario = usuarioRepository.findById(personaDto.getId_persona()).orElseThrow(() -> new RuntimeException("UsuarioNotFound"));
        Persona foundPersona = repository.findById(personaDto.getId_persona()).orElseThrow(() -> new RuntimeException("PersonaNotFound"));

        foundPersona.setNombre(personaDto.getNombre());
        foundPersona.setId_persona(personaDto.getId_persona());
        foundPersona.setGenero(personaDto.getGenero());
        foundPersona.setAp1(personaDto.getAp1());
        foundPersona.setAp2(personaDto.getAp2());
        foundPersona.setUsuario(foundUsuario);
        foundPersona.setRfc(personaDto.getRfc());
        repository.saveAndFlush(foundPersona);

        return new ResponseEntity<>(new ApiResponse(foundPersona, HttpStatus.OK), HttpStatus.OK);
    }
}
