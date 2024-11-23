import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Swal from 'sweetalert2';
import AxiosClient from '../config/http-gateway/http-client';
import Equis from '../assets/equis.svg';
import Person from '../assets/person2.svg';
import Mail from '../assets/mail.svg';
import Rfc from '../assets/rfc.svg';


const EditWorkerModal = ({ showModalEdit, closeModalEdit, clienteEditando, refreshClients }) => {
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
            <div className="fixed inset-0 z-40 bg-black bg-opacity-25 flex justify-center items-center overflow-auto">
                <div id="authentication-modal" className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-md">
                    <div className="p-8 md:p-4">
                        <div className="grid justify-end">
                            <a className='cursor-pointer' onClick={closeModalEdit}>
                                <img src={Equis} className='w-7' />
                            </a>
                        </div>
                        <form onSubmit={formik.handleSubmit}>
                            <p className="font-bold text-2xl text-center mb-8">Actualizar información</p>
                            <div>
                                <div className="relative mb-4">
                                    <label htmlFor='name' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Nombre:</label>
                                    <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                        <img src={Person} alt="" />
                                    </div>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                                        placeholder=""
                                        value={formik.values.name}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                </div>
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="grid justify-items-end text-red-500">{formik.errors.name}</div>
                                ) : null}
                                <div className="relative mb-4">
                                    <label htmlFor='lastname' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Apellido:</label>
                                    <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                        <img src={Person} alt="" />
                                    </div>
                                    <input
                                        type="text"
                                        id="lastname"
                                        name="lastname"
                                        className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                                        {...formik.getFieldProps('lastname')}
                                    />
                                </div>
                                {formik.touched.lastname && formik.errors.lastname ? (
                                    <div className="grid justify-items-end text-red-500">{formik.errors.lastname}</div>
                                ) : null}
                                <div className="relative mb-4">
                                    <label htmlFor='email' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Correo Electrónico:</label>
                                    <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                        <img src={Mail} alt="" />
                                    </div>
                                    <input
                                        type="text"
                                        id="email"
                                        name="email"
                                        className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                                        placeholder=""
                                        {...formik.getFieldProps('email')}
                                    />
                                </div>
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="grid justify-items-end text-red-500">{formik.errors.email}</div>
                                ) : null}
                                <div className="relative mb-4">
                                    <label htmlFor='rfc' type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">RFC:</label>
                                    <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                        <img src={Rfc} alt="" />
                                    </div>
                                    <input
                                        type="text"
                                        id="rfc"
                                        name="rfc"
                                        className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                                        placeholder=""
                                        {...formik.getFieldProps('rfc')}
                                    />
                                </div>
                                {formik.touched.rfc && formik.errors.rfc ? (
                                    <div className="grid justify-items-end text-red-500">{formik.errors.rfc}</div>
                                ) : null}
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
                                            onClick={closeModalEdit}
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
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    );
};

export default EditWorkerModal;
