import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import AxiosClient from '../config/http-gateway/http-client.js';
import Equis from '../assets/equis.svg';
import Mail from '../assets/mail.svg';
import Pass from '../assets/pass.svg';
import Person from '../assets/person2.svg';
import Rfc from '../assets/rfc.svg';
import Eye from '../assets/eye.svg';
import EyeN from '../assets/eye_n.svg';

const AddWorkerModal = ({ showModal, closeModal, refreshClients }) => {
    const [showPassword, setShowPassword] = useState(false);
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
            const confirmSave = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Deseas agregar este nuevo trabajador?',
                icon: 'question',
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonColor: '#3F54D1',
                cancelButtonColor: '#D9D9D9',
                confirmButtonText: 'Confirmar',
                cancelButtonText: 'Cancelar',
            });

            if (confirmSave.isConfirmed) {
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

                    Swal.fire({
                        icon: 'success',
                        title: '¡Nuevo trabajador guardado!',
                        text: 'El nuevo trabajador se ha almacenado correctamente.',
                    });

                    console.log(response.values);
                    closeModal();
                    refreshClients();
                } catch (error) {
                    //console.log(values);
                    console.error("Error:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al agregar trabajador',
                        text: 'Hubo un error al guardar el nuevo trabajador. Por favor, inténtalo de nuevo más tarde.',
                        confirmButtonColor: '#3F54D1',
                    });
                }
            }
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
            <div className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-center max-h-screen overflow-auto">
                <div id="authentication-modal" className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md px-6 ">
                    <div className="p-8 md:p-4">
                        <div className="grid justify-end">
                            <a className='cursor-pointer' onClick={closeModal}>
                                <img src={Equis} className='w-7' />
                            </a>
                        </div>
                        <p className="font-bold text-2xl text-center mb-8">Agregar Empleado</p>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="relative mb-2">
                                <label htmlFor='name' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Nombre:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={Person} alt="" />
                                </div>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className={`effect-shadow-input bg-gray-50 border ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom`}
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                            </div>
                            {formik.touched.name && formik.errors.name && (
                                <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.name}</div>
                            )}
                            <div className="relative mb-2">
                                <label htmlFor='lastname' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Apellido:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={Person} alt="" />
                                </div>
                                <input
                                    type="text"
                                    id="lastname"
                                    name="lastname"
                                    className={`effect-shadow-input bg-gray-50 border ${formik.touched.lastname && formik.errors.lastname ? 'border-red-500' : 'border-gray-300'} bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom`}
                                    value={formik.values.lastname}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                            </div>
                            {formik.touched.lastname && formik.errors.lastname && (
                                <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.lastname}</div>
                            )}
                            <div className="relative mb-2">
                                <label htmlFor='email' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Correo Electrónico:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={Mail} alt="" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className={`effect-shadow-input bg-gray-50 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom`}
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />

                            </div>
                            {formik.touched.email && formik.errors.email && (
                                <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.email}</div>
                            )}
                            <div className="relative mb-2">
                                <label htmlFor='rfc' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">RFC:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={Rfc} alt="" />
                                </div>
                                <input
                                    type="text"
                                    id="rfc"
                                    name="rfc"
                                    className={`effect-shadow-input bg-gray-50 border ${formik.touched.rfc && formik.errors.rfc ? 'border-red-500' : 'border-gray-300'} bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom`}
                                    value={formik.values.rfc}
                                    onChange={(e) => formik.setFieldValue('rfc', e.target.value.toUpperCase())}
                                    onBlur={formik.handleBlur}
                                    maxLength={13}
                                />

                            </div>
                            {formik.touched.rfc && formik.errors.rfc && (
                                <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.rfc}</div>
                            )}
                            <div className="mb-2">
                                <label htmlFor="genero" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">
                                    Genero:
                                </label>
                                <div className='flex flex-col space-y-2'>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="genero"
                                            value="Femenino"
                                            checked={formik.values.genero === 'Femenino'}
                                            className="mr-2 cursor-pointer custom-border-radius"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <p className='custom-blue'>Femenino</p>
                                    </label>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="genero"
                                            value="Masculino"
                                            checked={formik.values.genero === 'Masculino'}
                                            className="mr-2 cursor-pointer custom-border-radius"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <p className='custom-blue'>Masculino</p>
                                    </label>
                                    <label className='flex items-center'>
                                        <input
                                            type="radio"
                                            name="genero"
                                            value="Otro"
                                            checked={formik.values.genero === 'Otro'}
                                            className="mr-2 cursor-pointer custom-border-radius"
                                            onChange={formik.handleChange}
                                        />
                                        <p className='custom-blue'>Otro/prefiero no decir</p>
                                    </label>
                                </div>

                            </div>
                            {formik.touched.genero && formik.errors.genero && (
                                <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.genero}</div>
                            )}
                            <div className="mb-2 relative">
                                <label htmlFor='password' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Contraseña:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={Pass} alt="" />
                                </div>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className={`effect-shadow-input bg-gray-50 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom`}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute pe-3 end-0 flex items-center text-gray-500"
                                    style={{ top: '3rem', transform: 'translateY(-50%)' }}
                                >
                                    {showPassword ? <img src={Eye} alt="Mostrar contraseña" /> : <img src={EyeN} alt="Ocultar contraseña" />}
                                </button>

                            </div>
                            {formik.touched.password && formik.errors.password && (
                                <div className="grid justify-items-end text-red-500 text-sm mt-2">{formik.errors.password}</div>
                            )}
                            <div className="mb-2 relative">
                                <label htmlFor='confirmPassword' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Confirmar Contraseña:</label>
                                <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                    <img src={Pass} alt="" />
                                </div>
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    className={`effect-shadow-input bg-gray-50 border ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom`}
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
                                    {showConfirmPassword ? <img src={Eye} alt="Mostrar contraseña" /> : <img src={EyeN} alt="Ocultar contraseña" />}
                                </button>

                            </div>
                            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                                <div className="grid justify-items-end text-red-500 text-sm mt-2">{formik.errors.confirmPassword}</div>
                            )}
                            <div className="flex justify-between mt-4">
                                <button
                                    type="button"
                                    onClick={handleClear}
                                    className="px-4 py-2  text-black rounded-lg hover:bg-gray-400 text-sm font-medium"
                                >
                                    Limpiar
                                </button>
                                <div className="flex space-x-4">
                                    <button
                                        type="button"
                                        onClick={closeModal}
                                        className="px-4 py-2  text-black rounded-lg hover:bg-gray-400 text-sm font-medium"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 text-white rounded-lg bg-custom-cian text-sm font-medium"
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