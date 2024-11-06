package utez.edu.mx.SAVEM.model.dto;

import lombok.Getter;
import lombok.Setter;
import java.util.Random;

@Getter
@Setter
public class EmailDto {
    private String destinatario;
    private String asunto;
    private String pin;

    public EmailDto(){
        this.pin = generarPin();
    }

    private String generarPin(){
        Random random = new Random();
        StringBuilder pinBuilder = new StringBuilder();
        for(int i=0; i<6; i++){
            pinBuilder.append(random.nextInt(10));
        }
        return pinBuilder.toString();
    }
}
