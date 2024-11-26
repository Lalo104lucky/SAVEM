import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';
import AxiosClient from '../config/http-gateway/http-client';
import Close from '../assets/close.svg'
import Pass from '../assets/pass.svg';
import PassPro from '../assets/passPro.svg';
import Eye from '../assets/eye.svg'
import EyePro from '../assets/eyePro.svg'
import EyeN from '../assets/eye_n.svg'
import EyeNPro from '../assets/eye_nPro.svg'
import ClosePro from '../assets/closePro.svg'
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../config/alert/alert';

function ChangePasswordModal({ showModalAdd, handleCerrarModalAdd }) {
  const isDarkMode = document.documentElement.classList.contains('dark');

  const [showPassword, setShowPassword] = useState({
    password: false,
    newpassword: false,
    confirmPassword: false,
  });

  // Función para alternar la visibilidad de un campo específico
  const togglePasswordVisibility = (field) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      newpassword: '',
      confirmPassword: '',
    },
    validationSchema: yup.object({
      password: yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('Campo obligatorio'),
      newpassword: yup.string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres')
        .required('Campo obligatorio'),
      confirmPassword: yup.string()
        .oneOf([yup.ref('newpassword'), null], 'Las contraseñas deben coincidir')
        .required('Campo obligatorio'),
    }),
    onSubmit: (values) => {
      alertaPregunta(
        '¿Estás seguro?',
        '¿Está seguro de actualizar la contraseña?',
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

            alertaExito('Exito', 'Se actualizó correctamente la contraseña del usuario');

            refreshInventary();
            console.log(response.data);
            handleCerrarModalAdd();
          } catch (error) {
            console.error("Error:", error);
            alertaError('Error', 'Error al actualizar la contraseña del usuario');
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

              <h1 className="font-semibold text-xl text-start font-quicksand text-black mb-6">Cambiar Contraseña</h1>

              <form onSubmit={formik.handleSubmit} className='space-y-4'>

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Anterior:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={isDarkMode ? PassPro : Pass} alt="" />
                  </div>
                  <input
                    type={showPassword.password ? "text" : "password"}
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
                    {showPassword.password ? <img src={isDarkMode ? EyePro : Eye} alt="Mostrar contraseña" /> : <img src={isDarkMode ? EyeNPro : EyeN} alt="Ocultar contraseña" />}
                  </button>
                </div>

                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.password}</div>
                ) : null}

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Nueva:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={isDarkMode ? PassPro : Pass} alt="" />
                  </div>
                  <input
                    type={showPassword.newpassword ? "text" : "password"}
                    id="newpassword"
                    name="newpassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.newpassword}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                    placeholder="Nueva contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('newpassword')}
                    className="absolute pe-3 end-0 flex items-center text-gray-500"
                    style={{ top: '3rem', transform: 'translateY(-50%)' }}
                  >
                    {showPassword.newpassword ? <img src={isDarkMode ? EyePro : Eye} alt="Mostrar contraseña" /> : <img src={isDarkMode ? EyeNPro : EyeN} alt="Ocultar contraseña" />}
                  </button>
                </div>

                {formik.touched.newpassword && formik.errors.newpassword ? (
                  <div className="text-red-600 text-sm font-quicksand dark:text-red-500">{formik.errors.newpassword}</div>
                ) : null}

                <div className="relative mb-2">
                  <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Confirmar:</label>
                  <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                    <img src={isDarkMode ? PassPro : Pass} alt="" />
                  </div>
                  <input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirmPassword}
                    required
                    className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom custom-border-bottomDark"
                    placeholder="Confirmar contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    className="absolute pe-3 end-0 flex items-center text-gray-500"
                    style={{ top: '3rem', transform: 'translateY(-50%)' }}
                  >
                    {showPassword.confirmPassword ? <img src={isDarkMode ? EyePro : Eye} alt="Mostrar contraseña" /> : <img src={isDarkMode ? EyeNPro : EyeN} alt="Ocultar contraseña" />}
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

export default ChangePasswordModal
