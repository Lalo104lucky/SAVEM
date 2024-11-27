import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import AxiosClient from '../config/http-gateway/http-client';
import Close from '../assets/close.svg'
import ClosePro from '../assets/closePro.svg'
import Person2 from '../assets/person2.svg';
import Person2Pro from '../assets/person2Pro.svg';
import Mail from '../assets/mail.svg';
import MailPro from '../assets/mailPro.svg';
import Rfc from '../assets/rfc.svg';
import RfcPro from '../assets/rfcPro.svg';


const EditWorkerModal = ({ showModalEdit, closeModalEdit, clienteEditando, refreshClients }) => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    useEffect(() => {
        if (clienteEditando && clienteEditando.persons) {
            formik.setFieldValue('name', clienteEditando.persons.name);
            formik.setFieldValue('lastname', clienteEditando.persons.lastname);
            formik.setFieldValue('rfc', clienteEditando.persons.rfc);
            formik.setFieldValue('email', clienteEditando.email);
            formik.setFieldValue('genero', clienteEditando.persons.genero || '');
            console.log(clienteEditando.id_admin);
        }
    }, [clienteEditando]);

    const formik = useFormik({
        initialValues: {
            name: '',
            lastname: '',
            email: '',
            rfc: '',
            genero: '',
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(50, 'No debe exceder los 50 caracteres')
                .required('Campo obligatorio'),
            lastname: Yup.string()
                .max(50, 'No debe exceder los 50 caracteres')
                .required('Campo obligatorio'),
            email: Yup.string().email('Correo electrónico inválido').required('Campo obligatorio'),
            rfc: Yup.string()
                .matches(/^[A-Z]{4}\d{6}[A-Z0-9]{3}$/, 'RFC debe tener 13 caracteres')
                .required('Campo obligatorio'),
            genero: Yup.string()
                .required('Campo obligatorio'),
        }),
        onSubmit: async (values) => {
            const confirmSave = await Swal.fire({
                title: '¿Estás seguro?',
                text: '¿Deseas guardar los cambios en la información del trabajador?',
                icon: 'question',
                showCancelButton: true,
                reverseButtons: true,
                confirmButtonColor: '#3F54D1',
                cancelButtonColor: '#D9D9D9',
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
            });

            if (confirmSave.isConfirmed) {
                try {
                    const payload = {
                        id_admin: clienteEditando.id_user,
                        name: values.name,
                        lastname: values.lastname,
                        email: values.email,
                        rfc: values.rfc,
                        address: '',
                    };

                    const response = await AxiosClient({
                        url: `/admin/`,
                        method: 'PUT',
                        data: payload,
                    });

                    refreshClients();
                    closeModalEdit();
                    console.log(response.data);
                    Swal.fire({
                        icon: 'success',
                        title: '¡Trabajador actualizado!',
                        text: 'La información del trabajador se ha guardado correctamente.',
                    });
                } catch (error) {
                    console.log(values);
                    console.error('Error:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al actualizar trabajador',
                        text: 'Hubo un error al guardar los cambios en la información del trabajador. Por favor, inténtalo de nuevo más tarde.',
                        confirmButtonColor: '#3F54D1',
                    });
                }
            }
        },
    });

    const handleClear = () => {
        formik.resetForm();
    };

    return (
        showModalEdit && (
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
                                onClick={closeModalEdit}
                                type="button"
                                className="text-sm font-medium text-gray-900 rounded-lg"
                            >
                                <img src={isDarkMode ? ClosePro : Close} alt="Cerrar" className='w-6 h-6 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800' />
                            </button>
                        </div>

                        <h1 className="font-semibold text-xl text-start font-quicksand text-black mb-6">Editar Información</h1>

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
                                    placeholder="Nombre(s)"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
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
                                    {...formik.getFieldProps('lastname')}
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
                                    type="text"
                                    id="email"
                                    name="email"
                                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                                    placeholder="name@example.com"
                                    {...formik.getFieldProps('email')}
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
                                    {...formik.getFieldProps('rfc')}
                                />
                            </div>

                            {formik.touched.rfc && formik.errors.rfc ? (
                                <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.rfc}</div>
                            ) : null}

                            <div className="relative mb-2">
                                <label htmlFor="genero" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">
                                    Genero:
                                </label>
                                <div className='flex flex-col space-y-4'>
                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="genero"
                                            value="Femenino"
                                            checked={formik.values.genero === 'Femenino'}
                                            className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700 cursor-pointer "
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <p className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white cursor-pointer	">Femenino</p>
                                    </label>

                                    <label className="flex items-center">
                                        <input
                                            type="radio"
                                            name="genero"
                                            value="Masculino"
                                            checked={formik.values.genero === 'Masculino'}
                                            className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700 cursor-pointer "
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        <p className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white cursor-pointer	">Masculino</p>
                                    </label>

                                    <label className='flex items-center'>
                                        <input
                                            type="radio"
                                            name="genero"
                                            value="Otro"
                                            checked={formik.values.genero === 'Otro'}
                                            className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700 cursor-pointer "
                                            onChange={formik.handleChange}
                                        />
                                        <p className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white cursor-pointer	">Otro/prefiero no decir</p>
                                    </label>
                                </div>

                            </div>
                            {formik.touched.genero && formik.errors.genero && (
                                <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.genero}</div>
                            )}
                            <div className="flex justify-center items-center mt-4">
                                <div className="flex gap-4">
                                    <button
                                        type="button"
                                        onClick={closeModalEdit}
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

export default EditWorkerModal;
