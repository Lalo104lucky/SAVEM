import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import AxiosClient from '../config/http-gateway/http-client';
import Close from '../assets/close.svg'
import Person2 from '../assets/person2.svg'
import Person2Pro from '../assets/person2Pro.svg'
import Mail from '../assets/mail.svg'
import MailPro from '../assets/mailPro.svg'
import Rfc from '../assets/rfc.svg'
import RfcPro from '../assets/rfcPro.svg'
import ClosePro from '../assets/closePro.svg'
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../config/alert/alert';

function EditInformation({ showModalAdd, handleCerrarModalAdd }) {

    const isDarkMode = document.documentElement.classList.contains('dark');


    const formik = useFormik({
        initialValues: {
            nombre: '',
            correo: '',
            rfc: '',
            genero: '',
        },
        validationSchema: yup.object({
            nombre: yup.string()
                .max(50, 'No debe exceder los 50 caracteres')
                .required('Campo obligatorio'),
            correo: yup.string()
                .max(50, 'No debe exceder los 50 caracteres')
                .required('Campo obligatorio'),
            rfc: yup.string()
                .matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, 'RFC debe tener 13 caracteres')
                .required('Campo obligatorio'),
        }),
        onSubmit: (values) => {
            alertaPregunta(
                '¿Estás seguro?',
                '¿Está seguro de actualizar la información del usuario?',
                async () => {
                    try {
                        const payload = {
                            nombre: values.nombre,
                            correo: values.correo,
                            rfc: values.rfc,
                            genero: values.genero,
                        };

                        console.log(payload);
                        const response = await AxiosClient({
                            url: "/inventory/",
                            method: "POST",
                            data: payload,
                        });

                        alertaExito('Exito', 'Se actualizó correctamente la información del usuario');

                        refreshInventary();
                        console.log(response.data);
                        handleCerrarModalAdd();
                    } catch (error) {
                        console.error("Error:", error);
                        alertaError('Error', 'Error al actualizar la información del usuario');
                    }
                },
                () => {
                    console.log("Operación cancelada por el usuario");
                }
            );
        },
    });


    const handleClear = () => {
        formik.resetForm();
    };

    useEffect(() => {
        if (!showModalAdd) {
            formik.resetForm();
        }
    }, [showModalAdd]);



    return (
        <div>
            {showModalAdd && (
                <div className="fixed inset-0 z-50 flex items-center justify-center"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro con opacidad del 50%
                    }}
                >
                    <div
                        id="authentication-modal"
                        className="relative bg-white rounded-lg shadow-lg dark:bg-gray-900 w-full max-w-md mx-auto"
                        style={{
                            maxHeight: "80vh", // Altura máxima del modal
                            overflowY: "auto", // Scroll vertical cuando el contenido exceda la altura
                        }}
                    >
                        <div className="px-6 py-4"
                            style={{
                                overflowY: "auto", // Scroll vertical en el contenido interno
                                maxHeight: "80vh", // Asegura que el scroll esté limitado
                            }}
                        >
                            <div className="flex justify-end">
                                <button
                                    onClick={handleCerrarModalAdd}
                                    type="button"
                                    className="text-sm font-medium text-gray-900 rounded-lg"
                                >
                                    <img src={isDarkMode ? ClosePro : Close} alt="Cerrar" className='w-6 h-6 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800' />
                                </button>
                            </div>

                            <h1 className="font-semibold text-xl text-start font-quicksand text-black mb-6">Editar Información</h1>

                            <form onSubmit={formik.handleSubmit} className='space-y-4'>

                                <div className="relative mb-2">
                                    <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Nombre Completo:</label>
                                    <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                        <img src={isDarkMode ? Person2Pro : Person2} alt="" />
                                    </div>
                                    <input
                                        type="text"
                                        id="nombre"
                                        name="nombre"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.nombre}
                                        required
                                        className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                                        placeholder="Nombre Completo"
                                    />
                                </div>

                                {formik.touched.nombre && formik.errors.nombre ? (
                                    <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.nombre}</div>
                                ) : null}

                                <div className="relative mb-2">
                                    <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Correo Electrónico:</label>
                                    <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                        <img src={isDarkMode ? MailPro : Mail} alt="" />
                                    </div>
                                    <input
                                        type="text"
                                        id="correo"
                                        name="correo"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.correo}
                                        required
                                        className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                                        placeholder="name@example.com"
                                    />
                                </div>

                                {formik.touched.correo && formik.errors.correo ? (
                                    <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.correo}</div>
                                ) : null}

                                <div className="relative mb-2">
                                    <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">RFC:</label>
                                    <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                        <img src={isDarkMode ? RfcPro : Rfc} alt="" />
                                    </div>
                                    <input
                                        type="text"
                                        id="rfc"
                                        name="rfc"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.rfc}
                                        required
                                        className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                                        placeholder="VECJ880326XXX"
                                    />
                                </div>

                                {formik.touched.rfc && formik.errors.rfc ? (
                                    <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.rfc}</div>
                                ) : null}

                                <div className="relative mb-2">
                                    <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Género:</label>
                                    <div className="flex items-center mb-4">
                                        <input
                                            id="femenino-radio"
                                            type="radio"
                                            value="Femenino"
                                            name="genero"
                                            className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700 cursor-pointer "
                                            checked={formik.values.genero === 'Femenino'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <label
                                            htmlFor="femenino-radio"
                                            className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white cursor-pointer	"
                                        >
                                            Femenino
                                        </label>
                                    </div>

                                    <div className="flex items-center mb-4">
                                        <input
                                            id="masculino-radio"
                                            type="radio"
                                            value="Masculino"
                                            name="genero"
                                            className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700 cursor-pointer	"
                                            checked={formik.values.genero === 'Masculino'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <label
                                            htmlFor="masculino-radio"
                                            className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white cursor-pointer	"
                                        >
                                            Masculino
                                        </label>
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            id="otro-radio"
                                            type="radio"
                                            value="Otro"
                                            name="genero"
                                            className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700 cursor-pointer	"
                                            checked={formik.values.genero === 'Otro'}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <label
                                            htmlFor="otro-radio"
                                            className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white cursor-pointer	"
                                        >
                                            Otro/prefiero no decir
                                        </label>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center mt-4">
                                    <button
                                        type="button"
                                        onClick={handleClear}
                                        className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-quicksand font-medium rounded-lg text-sm px-5 py-2.5 dark:text-white dark:hover:bg-gray-800"
                                    >
                                        Limpiar
                                    </button>

                                    <div className="flex gap-4">
                                        <button
                                            type="button"
                                            onClick={handleCerrarModalAdd}
                                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-quicksand font-medium rounded-lg text-sm px-5 py-2.5 dark:text-white dark:hover:bg-gray-800"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            className="text-white bg-custom-cyan hover-bg-custom-cyanBlack focus:ring-1 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-custom-cyanDark hover-bg-custom-cyanDark"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default EditInformation
