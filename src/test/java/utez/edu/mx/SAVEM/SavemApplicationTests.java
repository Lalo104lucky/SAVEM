package utez.edu.mx.SAVEM;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import utez.edu.mx.SAVEM.config.ApiResponse;
import utez.edu.mx.SAVEM.model.dao.*;
import utez.edu.mx.SAVEM.model.dto.UsuarioDto;
import utez.edu.mx.SAVEM.services.UsuarioService;

@SpringBootTest
class SavemApplicationTests {

	@Test
	void testUsuario() {
		/*
		UsuarioDao usuarioDao;
		RolDao rolDao;
		PersonaDao personaDao;
		PasswordEncoder encoder;

		UsuarioService usuarioService = new UsuarioService();

		UsuarioDto usuarioEsperado = new UsuarioDto(
				1L,
				"max@gmail.com",
				"ekisde",
				true,
				1L,
				1L
		);

		ResponseEntity<ApiResponse> resultado = usuarioService.register(
				usuarioRegister,
				encoder
		);

		Assertions.assertEquals(resultado, resultado);
		*/
	}

}
