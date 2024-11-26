import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import AxiosClient from '../config/http-gateway/http-client.js';
import Close from '../assets/close.svg'
import ClosePro from '../assets/closePro.svg'
import Mail from '../assets/mail.svg';
import MailPro from '../assets/mailPro.svg';
import Pass from '../assets/pass.svg';
import PassPro from '../assets/passPro.svg';
import Person2 from '../assets/person2.svg';
import Person2Pro from '../assets/person2Pro.svg';
import Rfc from '../assets/rfc.svg';
import RfcPro from '../assets/rfcPro.svg';
import Eye from '../assets/eye.svg';
import EyeN from '../assets/eye_n.svg';
import EyePro from '../assets/eyePro.svg';
import EyeNPro from '../assets/eye_nPro.svg';
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../config/alert/alert';

const AddWorkerModal = ({ showModal, closeModal, refreshClients }) => {
    const [showPassword, setShowPassword] = useState(false);
    const isDarkMode = document.documentElement.classList.contains('dark');
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            rfc: '',
            genero: '',
            password: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(45, 'No debe exceder los 50 caracteres')
                .required('Campo obligatorio'),
            lastname: Yup.string()
                .max(45, 'No debe exceder los 50 caracteres')
                .required('Campo obligatorio'),
            email: Yup.string()
                .email('Correo electrónico inválido')
                .required('Campo obligatorio'),
            rfc: Yup.string()
                .matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, 'RFC debe tener 13 caracteres')
                .required('Campo obligatorio'),
            genero: Yup.string()
                .required('Campo obligatorio'),
            password: Yup.string()
                .min(8, 'La contraseña debe tener al menos 8 caracteres')
                .required('Campo obligatorio'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir')
                .required('Campo obligatorio'),
        }),
        onSubmit: async (values) => {
            alertaPregunta(
                '¿Estás seguro?',
                '¿Desea agregar este nuevo empleado?',
                async () => {
                    try {
                        const payload = {
                            email: values.email,
                            password: values.password,
                            role: {
                                id_role: 2,
                                role: "TRABAJADOR_ROLE",
                            },
                            persons: {
                                name: values.name,
                                lastname: values.lastname,
                                email: values.email,
                                rfc: values.rfc,
                                genero: values.genero,
                                address: "",
                            },
                        };

                        console.log(payload);
                        const response = await AxiosClient({
                            url: "/users/",
                            method: "POST",
                            data: payload,
                        });
                        alertaExito('¡Nuevo trabajador guardado!', 'El nuevo trabajador se ha almacenado correctamente.');
                        console.log(response.values);
                        closeModal();
                        refreshClients();
                    } catch (error) {
                        //console.log(values);
                        console.error("Error:", error);
                        alertaError('Error al agregar trabajador', 'Hubo un error al guardar el nuevo trabajador. Por favor, inténtalo de nuevo más tarde.');
                    }
                }
            );
        },
    });

    useEffect(() => {
        if (!showModal) {
            formik.resetForm();
        }
    }, [showModal]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };


    const handleClear = () => {
        formik.resetForm();
    };

    return (
        showModal && (
            <div className="fixed inset-0 z-40 flex items-center justify-center"
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
                                onClick={closeModal}
                                type="button"
                                className="text-sm font-medium text-gray-900 rounded-lg"
                            >
                                <img src={isDarkMode ? ClosePro : Close} alt="Cerrar" className='w-6 h-6 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800' />
                            </button>
                        </div>

                        <h1 className="font-semibold text-xl text-start font-quicksand text-black mb-6">Agregar Empleado</h1>

                        <form onSubmit={formik.handleSubmit} className='space-y-4'>
                            <div className="relative mb-2">
                                <label htmlFor='name' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Nombre:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={isDarkMode ? Person2Pro : Person2} alt="" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Nombre(s)"
                                />
                            </div>

                            {formik.touched.name && formik.errors.name ? (
                                <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.name}</div>
                            ) : null}

                            <div className="relative mb-2">
                                <label htmlFor='lastname' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Apellido:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={isDarkMode ? Person2Pro : Person2} alt="" />
                                </div>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="Apellido(s)"
                                />
                            </div>

                            {formik.touched.lastname && formik.errors.lastname ? (
                                <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.lastname}</div>
                            ) : null}

                            <div className="relative mb-2">
                                <label htmlFor='email' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Correo Electrónico:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={isDarkMode ? MailPro : Mail} alt="" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    placeholder="name@example.com"
                                />
                            </div>

                            {formik.touched.email && formik.errors.email ? (
                                <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.email}</div>
                            ) : null}

                            <div className="relative mb-2">
                                <label htmlFor='rfc' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">RFC:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={isDarkMode ? RfcPro : Rfc} alt="" />
                                </div>
                                <input
                                    type="text"
                                    id="rfc"
                                    name="rfc"
                                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                                    placeholder="VECJ880326XXX"
                                    value={formik.values.rfc}
                                    onChange={(e) => formik.setFieldValue('rfc', e.target.value.toUpperCase())}
                                    onBlur={formik.handleBlur}
                                    maxLength={13}
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

                            <div className="relative mb-2">
                                <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Contraseña:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={isDarkMode ? PassPro : Pass} alt="" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    required
                                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                                    placeholder="Contraseña actual"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('password')}
                                    className="absolute pe-3 end-0 flex items-center text-gray-500"
                                    style={{ top: '3rem', transform: 'translateY(-50%)' }}
                                >
                                    {showPassword ? <img src={isDarkMode ? EyePro : Eye} alt="Mostrar contraseña" /> : <img src={isDarkMode ? EyeNPro : EyeN} alt="Ocultar contraseña" />}
                                </button>
                            </div>

                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.password}</div>
                            ) : null}

                            <div className="mb-2 relative">
                                <label htmlFor='confirmPassword' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Confirmar Contraseña:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={isDarkMode ? PassPro : Pass} alt="" />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    required
                                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                                    placeholder="Confirmar contraseña"
                                    value={formik.values.confirmPassword}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute pe-3 end-0 flex items-center text-gray-500"
                                    style={{ top: '3rem', transform: 'translateY(-50%)' }}
                                >
                                    {showConfirmPassword ? <img src={isDarkMode ? EyePro : Eye} alt="Mostrar contraseña" /> : <img src={isDarkMode ? EyeNPro : EyeN} alt="Ocultar contraseña" />}
                                </button>
                            </div>

                            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.confirmPassword}</div>
                            ) : null}

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
                                        onClick={closeModal}
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
        )
    );
};

export default AddWorkerModal;