import React, { useEffect, useState } from 'react';
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
import ClosePro from '../assets/closePro.svg'
import PillMPro from '../assets/pill_mediPro.svg';
import MarkMPro from '../assets/mark_mediPro.svg';
import PriceMPro from '../assets/price_mediPro.svg';
import BoxMPro from '../assets/box_mediPro.svg';
import CalendarMPro from '../assets/calendar_mediPro.svg';
import KeyMPro from '../assets/key_mediPro.svg';
import CodeMPro from '../assets/code_mediPro.svg';
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../config/alert/alert';

function AddMedicamento({ showModalAdd, handleCerrarModalAdd, handleImageUpload,
  refreshInventary }) {

  const [fileName, setFileName] = useState("");
  const isDarkMode = document.documentElement.classList.contains('dark');

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
    onSubmit: (values) => {
      // Mensaje de alertaPregunta con estilos personalizados
      alertaPregunta(
        '¿Estás seguro?',
        '¿Deseas agregar este Medicamento?',
        async () => {
          try {
            const payload = {
              nombre: values.nombre,
              cost: values.precio,
              kg: values.existencia,
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

            alertaExito('Nuevo Medicamento Agregado', 'El nuevo medicamento se ha guardado correctamente.');

            refreshInventary();
            console.log(response.data);
            handleCerrarModalAdd();
          } catch (error) {
            console.error("Error:", error);
            alertaError('Error al agregar el medicamento', 'Hubo un error al guardar el nuevo medicamento. Por favor, inténtalo de nuevo más tarde.');
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

  const handleChangeAvatar = (event) => {
    const files = event.target.files;

    if (files.length > 0 && files.length < 2) {
      const file = files[0];
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

      // Validación del tipo de archivo
      if (!allowedTypes.includes(file.type)) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El archivo seleccionado no es una imagen válida.",
        });
        return;
      }

      // Leer la imagen como Base64
      const reader = new FileReader();
      reader.onloadend = (data) => {
        const base64Image = data.target.result;
        formik.setFieldValue("image", base64Image); // Actualiza Formik con la imagen
        formik.setFieldTouched("image", true);
        setFileName(file.name); // Actualiza el nombre del archivo en el estado
      };
      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Solo puedes seleccionar un archivo.",
      });
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

              <h1 className="font-semibold text-xl text-start font-quicksand text-black mb-6">Agregar Medicamento</h1>

              <form onSubmit={formik.handleSubmit} className='space-y-4'>

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Nombre:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={isDarkMode ? PillMPro : PillM} alt="" />
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
                    placeholder="Nombre del Medicamento"
                  />
                </div>

                {formik.touched.nombre && formik.errors.nombre ? (
                  <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.nombre}</div>
                ) : null}

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Marca:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={isDarkMode ? MarkMPro : MarkM} alt="" />
                  </div>
                  <input
                    type="text"
                    id="marca"
                    name="marca"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.marca}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                    placeholder="Marca del Medicamento"
                  />
                </div>

                {formik.touched.marca && formik.errors.marca ? (
                  <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.marca}</div>
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
                        <img src={isDarkMode ? PriceMPro : PriceM} alt="" />
                      </div>
                      <input
                        type="number"
                        id="precio"
                        name="precio"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.precio}
                        required
                        className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                        placeholder="0.00"
                      />
                    </div>
                    {formik.touched.precio && formik.errors.precio && (
                      <div className="text-red-600 text-sm font-quicksand mt-4 dark:text-red-500">
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
                        <img src={isDarkMode ? BoxMPro : BoxM} alt="" />
                      </div>
                      <input
                        type="number"
                        id="existencia"
                        name="existencia"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.existencia}
                        required
                        className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                        placeholder="0.00"
                      />
                    </div>
                    {formik.touched.existencia && formik.errors.existencia && (
                      <div className="text-red-600 text-sm font-quicksand mt-4 dark:text-red-500">
                        {formik.errors.existencia}
                      </div>
                    )}
                  </div>
                </div>

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Categoría:</label>
                  <div className="flex items-center mb-4">
                    <input
                      id="patente-radio"
                      type="radio"
                      value="Patente"
                      name="categoria"
                      className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700 cursor-pointer "
                      checked={formik.values.categoria === 'Patente'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlFor="patente-radio"
                      className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white cursor-pointer	"
                    >
                      Patente
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="generico-radio"
                      type="radio"
                      value="Generico"
                      name="categoria"
                      className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700 cursor-pointer	"
                      checked={formik.values.categoria === 'Generico'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlFor="generico-radio"
                      className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white cursor-pointer	"
                    >
                      Genérico
                    </label>
                  </div>

                </div>

                <div className="relative mb-2">
                  <label
                    className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white"
                  >
                    ¿Necesita prescripción?
                  </label>
                  <div className="flex items-center mb-4 ">
                    <input
                      id="si-radio"
                      type="radio"
                      value="Con prescripción"
                      name="prescripcion"
                      className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700 cursor-pointer	"
                      checked={formik.values.prescripcion === 'Con prescripción'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlFor="si-radio"
                      className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white cursor-pointer	"
                    >
                      Sí
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      id="no-radio"
                      type="radio"
                      value="Sin prescripción"
                      name="prescripcion"
                      className="w-5 h-5 custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700 cursor-pointer	"
                      checked={formik.values.prescripcion === 'Sin prescripción'}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <label
                      htmlFor="no-radio"
                      className="ms-2 text-sm font-quicksand custom-blue text-gray-900 dark:text-white cursor-pointer	"
                    >
                      No
                    </label>
                  </div>
                </div>

                <div className="relative mb-2">
                  <label
                    htmlFor="image"
                    className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white"
                  >
                    Imágen:
                  </label>

                  <div className="flex items-center bg-custom-bluelight rounded-lg dark:bg-gray-700 overflow-hidden">
                    {/* Botón Seleccionar archivo */}
                    <label
                      htmlFor="image"
                      className="cursor-pointer bg-custom-blue text-white text-sm font-medium font-quicksand py-2 px-4 rounded-lg hover:bg-blue-800 transition-colors mr-4 flex-shrink-0"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Seleccionar archivo
                    </label>

                    {/* Mostrar nombre del archivo seleccionado */}
                    <span className="text-gray-900 text-sm truncate font-quicksand dark:text-white px-3 overflow-hidden ">
                      {formik.values.image ? formik.values.image.name : "Sin archivos seleccionados"}
                    </span>

                    {/* Campo de entrada para seleccionar archivo */}
                    <input
                      className="absolute top-0 left-0 opacity-0 mt-7 cursor-pointer"
                      id="image"
                      name="image" // Conectar el input al name de Formik
                      type="file"
                      onChange={(event) => {
                        // Actualizar Formik con la imagen seleccionada
                        formik.setFieldValue("image", event.target.files[0]);
                      }}
                      onBlur={formik.handleBlur} // Manejar el evento onBlur
                    />
                  </div>

                  {/* Mensaje de ayuda */}
                  <p className="mt-1 text-xs text-gray-500 text-end font-quicksand dark:text-gray-300" id="image_help">
                    SVG, PNG, JPG or GIF (MAX. 800x400px).
                  </p>
                </div>


                {formik.touched.image && formik.errors.image ? (
                  <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.image}</div>
                ) : null}

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Fecha de Caducidad:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={isDarkMode ? CalendarMPro : CalendarM} alt="" />
                  </div>
                  <input
                    type="text"
                    id="fecha"
                    name="fecha"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fecha}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                    placeholder="05 Enero de 2024"
                  />
                </div>

                {formik.touched.fecha && formik.errors.fecha ? (
                  <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.fecha}</div>
                ) : null}

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Clave:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={isDarkMode ? KeyMPro : KeyM} alt="" />
                  </div>
                  <input
                    type="text"
                    id="clave"
                    name="clave"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.clave}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                    placeholder="xxxxxx"
                  />
                </div>

                {formik.touched.clave && formik.errors.clave ? (
                  <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.clave}</div>
                ) : null}

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Código:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={isDarkMode ? CodeMPro : CodeM} alt="" />
                  </div>
                  <input
                    type="text"
                    id="codigo"
                    name="codigo"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.codigo}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                    placeholder="xxxxxx"
                  />
                </div>

                {formik.touched.codigo && formik.errors.codigo ? (
                  <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.codigo}</div>
                ) : null}

                <div className="relative mb-2">
                  <label type="message" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Descripción:</label>
                  <textarea
                    type="message"
                    id="description"
                    name="description"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                    placeholder="Descripción del Medicamento"
                  />
                </div>

                {formik.touched.description && formik.errors.description ? (
                  <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.description}</div>
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

export default AddMedicamento;
