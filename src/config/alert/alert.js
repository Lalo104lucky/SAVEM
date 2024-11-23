import Swal from 'sweetalert2';
import '../../index.css'
// Esto no se si se vaya a ocupar pero lo dejaré
import withReactContent  from 'sweetalert2-react-content';

const AlertClient = withReactContent(Swal);
//Mensajes definidos tanto para sucess,para error ,como para confirmar algo 

//Alerta definada de error,success,confirm
export const customAlert = (title,text,icon) =>{
    return AlertClient.fire({
        title,
        text,
        icon,   
        confirmButtonColor:"#3085d6",
        confirmButtonText:'Aceptar',
    });
    
};

//Desde aquí empiezo
export const alertaExito = (titulo, mensaje) => {
    Swal.fire({
        icon: 'success',
        title: titulo,
        text: mensaje,
        iconColor: '#3BA936',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: 'custom-alert-success',
        }
    });
};

/*
Para ocuparla se importa y se introduce solo con esto:
alertaExito('Se inició sesión correctamente');
*/

export const alertaError = (titulo ,mensaje) => {
    Swal.fire({
        icon: 'warning',
        title: titulo,
        text: mensaje,
        iconColor: '#AB0D2E',
        showConfirmButton: false,
        timer: 1500,
        customClass: {
            popup: 'custom-alert-error',
        }
    });
};

export const alertaCargando = (titulo, mensaje) => {
    Swal.fire({
        html: `
            <div class="flex flex-col items-center">
                <div class="loader spinner-border mt-5 mb-5"></div>
                <h2 class="swal2-title text-3xl mb-4">${titulo}</h2>
                <p class=" mt-2">${mensaje}</p>
            </div>
        `,
        allowOutsideClick: false,
        showConfirmButton: false,
        customClass: {
            popup: 'custom-alert-loading',
        }
    });
};

export const alertaPregunta = (titulo, mensaje, onConfirm, onCancel) => {
    Swal.fire({
        icon: 'question',
        title: titulo,
        text: mensaje,
        iconColor: '#3F54D1',
        showCancelButton: true,
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar',
        buttonsStyling: false,
        reverseButtons: true, // Invertir el orden de los botones
        customClass: {
            popup: 'custom-alert-pregunta',
            confirmButton: 'bg-custom-blue text-white px-4 py-2 rounded ml-2', // Botón de Confirmar
            cancelButton: 'bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2', // Botón de Cancelar
        }
    }).then((result) => {
        if (result.isConfirmed) {
            if (onConfirm) onConfirm(); // Llamada a la función de confirmación si se proporciona
        } else if (result.isDismissed) {
            if (onCancel) onCancel(); // Llamada a la función de cancelación si se proporciona
        }
    });
};

/* 
Para el funcionamiento sería de la siguiente manera:
alertaPregunta(
    "¿Estás seguro?", 
    "¿Deseas continuar?", 
    () => alertaExito("Éxito", "Se inició sesión correctamente"), 
    // Este no creo que se ocupe pero es por si las dudas
    () => alertaError("Error", "Ocurrió un error al iniciar sesión")
);
*/

