import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import AxiosClient from '../config/http-gateway/http-client';
import Close from '../assets/close.svg'
import PillM from '../assets/pill_medi.svg';
import MarkM from '../assets/mark_medi.svg';
import PriceM from '../assets/price_medi.svg';
import BoxM from '../assets/box_medi.svg';
import CalendarM from '../assets/calendar_medi.svg';
import KeyM from '../assets/key_medi.svg';
import CodeM from '../assets/code_medi.svg';

function AddMedicamento({ showModalAdd, handleCerrarModalAdd, handleImageUpload,
  refreshInventary }) {
  const formik = useFormik({
    initialValues: {
      nombre: '',
      marca: '',
      precio: '',
      existencia: '',
      image: '',
      fecha: '',
      clave: '',
      categoria: '',
      prescripcion: '',
      codigo: '',

      description: ''
    },
    validationSchema: yup.object({
      nombre: yup.string()
        .max(50, 'No debe exceder los 50 caracteres')
        .required('Campo obligatorio'),
      marca: yup.string()
        .max(50, 'No debe exceder los 50 caracteres')
        .required('Campo obligatorio'),
      precio: yup.number().required('Campo Obligatorio').positive('Solo números positivos'),
      existencia: yup.number().required('Campo Obligatorio').positive('Solo números positivos'),
      image: yup.mixed().required('Campo Obligatorio'),
      fecha: yup.mixed().required('Campo Obligatorio'),
      clave: yup.mixed().required('Campo Obligatorio'),
      codigo: yup.mixed().required('Campo Obligatorio'),
      description: yup.string().required('Campo Obligatorio').max(200, 'No debe exceder los 200 caracteres'),
    }),
    onSubmit: async (values) => {
      const confirmSave = await Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Deseas agregar este nuevo corte de carne?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
      });
      if (confirmSave.isConfirmed) {
        try {
          const payload = {
            nombre: values.nombre,
            cost: values.price,
            kg: values.quantity,
            image: values.image,
            description: values.description,
            orders: null
          };

          console.log(payload);
          const response = await AxiosClient({
            url: "/inventory/",
            method: "POST",
            data: payload,
          });

          Swal.fire({
            icon: 'success',
            title: '¡Nuevo corte agregado!',
            text: 'El nuevo corte de carne se ha guardado correctamente.',
          });

          refreshInventary();
          console.log(response.values);
          handleCerrarModalAdd();
        } catch (error) {
          console.log(values);
          console.error("Error:", error);
          Swal.fire({
            icon: 'error',
            title: 'Error al agregar corte',
            text: 'Hubo un error al guardar el nuevo corte de carne. Por favor, inténtalo de nuevo más tarde.',
          });
        }
      }
    },
  });

  const handleChangeAvatar = (event) => {
    const files = event.target.files;
    if (files.length > 0 && files.length < 2) {
      const file = files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El archivo seleccionado no es una imagen válida.',
        });
        return;
      }

      const reader = new FileReader();
      reader.onloadend = (data) => {
        const base64Image = data.target.result;
        formik.setFieldValue('image', base64Image);
        formik.setFieldTouched('image', true);

      };
      reader.readAsDataURL(file);
    }
  };
  useEffect(() => {
    if (!showModalAdd) {
      formik.resetForm();
    }
  }, [showModalAdd]);

  return (
    <div>
      {showModalAdd && (
        <div className="fixed inset-0 z-40 flex items-center justify-center"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro con opacidad del 50%
          }}
        >
          <div
            id="authentication-modal"
            className="relative bg-white rounded-lg shadow-lg dark:bg-gray-700 w-full max-w-md mx-auto"
            style={{
              maxHeight: "80vh", // Altura máxima del modal
              overflowY: "auto", // Scroll vertical cuando el contenido exceda la altura
            }}
          >
            <div className="ps-6 py-4 pe-3"
              style={{
                overflowY: "auto", // Scroll vertical en el contenido interno
                maxHeight: "80vh", // Asegura que el scroll esté limitado
              }}
            >
              <div className="flex justify-end">
                <button
                  onClick={handleCerrarModalAdd}
                  type="button"
                  className="text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg  hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                >
                  <img src={Close} alt="Cerrar" />
                </button>
              </div>

              <h1 className="font-semibold text-xl text-start font-quicksand text-black mb-6">Agregar Medicamento</h1>

              <form onSubmit={formik.handleSubmit} className='space-y-4'>

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Nombre:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={PillM} alt="" />
                  </div>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.nombre}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                    placeholder="Nombre del Medicamento"
                  />
                </div>

                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="text-red-600 text-sm font-quicksand">{formik.errors.nombre}</div>
                ) : null}

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Marca:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={MarkM} alt="" />
                  </div>
                  <input
                    type="text"
                    id="marca"
                    name="marca"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.marca}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                    placeholder="Marca del Medicamento"
                  />
                </div>

                {formik.touched.marca && formik.errors.marca ? (
                  <div className="text-red-600 text-sm font-quicksand">{formik.errors.marca}</div>
                ) : null}

                <div className="flex flex-wrap gap-4 mb-2">
                  {/* Campo Precio */}
                  <div className="relative mb-2 flex-1 min-w-[200px]">
                    <label
                      htmlFor="precio"
                      className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white"
                    >
                      Precio:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                        <img src={PriceM} alt="" />
                      </div>
                      <input
                        type="number"
                        id="precio"
                        name="precio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.precio}
                        required
                        className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                        placeholder="0.00"
                      />
                    </div>
                    {formik.touched.precio && formik.errors.precio && (
                      <div className="text-red-600 text-sm font-quicksand mt-4">
                        {formik.errors.precio}
                      </div>
                    )}
                  </div>

                  {/* Campo Existencias */}
                  <div className="relative mb-2 flex-1 min-w-[200px]">
                    <label
                      htmlFor="existencia"
                      className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white"
                    >
                      Existencias:
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                        <img src={BoxM} alt="" />
                      </div>
                      <input
                        type="number"
                        id="existencia"
                        name="existencia"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.existencia}
                        required
                        className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                        placeholder="0.00"
                      />
                    </div>
                    {formik.touched.existencia && formik.errors.existencia && (
                      <div className="text-red-600 text-sm font-quicksand mt-4">
                        {formik.errors.existencia}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Categoría:</label>
                  <div className="flex items-center mb-3">
                    <input
                      id="patente-radio"
                      type="radio"
                      value="patente"
                      name="radio-group"
                      className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="patente-radio"
                      className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white"
                    >
                      Patente
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="generico-radio"
                      type="radio"
                      value="generico"
                      name="radio-group"
                      className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="generico-radio"
                      className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white"
                    >
                      Genérico
                    </label>
                  </div>

                </div>

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">¿Necesita prescripción?</label>
                  <div className="flex items-center mb-3">
                      <input
                        id="patente-radio"
                        type="radio"
                        value="patente"
                        name="radio-group"
                        className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="patente-radio"
                        className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white"
                      >
                        Si
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="generico-radio"
                        type="radio"
                        value="generico"
                        name="radio-group"
                        className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="generico-radio"
                        className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white"
                      >
                        No
                      </label>
                    </div>

                </div>

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Imágen:</label>
                  <input
                    className="block w-full text-sm font-quicksand text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-custom-bluelight dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="image_help"
                    id="image"
                    type="file"
                    onChange={(e) => handleChangeAvatar(e)}
                  />

                  <p className="mt-1 text-xs text-gray-500 text-end justify-items-end dark:text-gray-300" id="image_help">
                    SVG, PNG, JPG or GIF (MAX. 800x400px).
                  </p>
                </div>

                {formik.touched.image && formik.errors.image ? (
                  <div className="text-red-600 text-sm font-quicksand">{formik.errors.image}</div>
                ) : null}

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Fecha de Caducidad:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={CalendarM} alt="" />
                  </div>
                  <input
                    type="text"
                    id="fecha"
                    name="fecha"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fecha}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                    placeholder="05 Enero de 2024"
                  />
                </div>

                {formik.touched.fecha && formik.errors.fecha ? (
                  <div className="text-red-600 text-sm font-quicksand">{formik.errors.fecha}</div>
                ) : null}

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Clave:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={KeyM} alt="" />
                  </div>
                  <input
                    type="text"
                    id="clave"
                    name="clave"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.clave}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                    placeholder="xxxxxx"
                  />
                </div>

                {formik.touched.clave && formik.errors.clave ? (
                  <div className="text-red-600 text-sm font-quicksand">{formik.errors.clave}</div>
                ) : null}

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Código:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={CodeM} alt="" />
                  </div>
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.codigo}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                    placeholder="xxxxxx"
                  />
                </div>

                {formik.touched.codigo && formik.errors.codigo ? (
                  <div className="text-red-600 text-sm font-quicksand">{formik.errors.codigo}</div>
                ) : null}

                <div className="grid justify-end mt-4">
                  <button
                    type="submit"
                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                  >
                    Guardar
                  </button>
                </div>

              </form>

            </div>
          </div>
        </div>

      )}
    </div>
  );
}

export default AddMedicamento;
