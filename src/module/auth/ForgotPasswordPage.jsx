import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import AxiosClient from '../../config/http-gateway/http-client'
import ImagenLogo from '../../assets/img/imgLogin.png'
import AuthContext from '../../config/context/auth-context'
import Mail from "../../assets/mail.svg";
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../../config/alert/alert';



const ForgotPasswordPage = () => {

  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .required("Campo obligatorio")
        .email("Email inválido"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await AxiosClient({
          url: "/users/request-password-reset",
          method: "POST",
          data: values,
        });
        console.log(response?.data?.userId);
        if (!response?.data?.error) {
          console.log(response.data)
          navigate("/reset-password");
        } else {
          throw Error(response.data.message);
        }
      } catch (error) {
        alertaError("Restablecer contraseña", "Ocurrió un error al enviar el correo electrónico");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-screen flex item-center justify-center">
      <div className="flex bg-white w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 overflow-hidden items-center justify-center mx-auto">

        <div className="p-6 w-96 mr-5">
          <h1 className="text-left text-4xl font-normal custom-blue font-quicksand mb-2">
            Recuperar
          </h1>
          <h1 className="text-left text-4xl font-normal custom-blue font-quicksand mb-8">
            Contraseña
          </h1>
          <form
            className="space-y-4"
            action="#"
            method="POST"
            noValidate
            onSubmit={formik.handleSubmit}
          >

            <div className="relative mb-2">
              <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Correo Electrónico:</label>
              <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                <img src={Mail} alt="" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                autoComplete="email"
                required
                className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                placeholder="name@example.com"
              />
            </div>

            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm font-quicksand">{formik.errors.email}</div>
            )}

            <button
              type="submit"
              disabled={formik.isSubmitting || !formik.isValid}
              className="w-full py-3 cursor-pointer text-white bg-custom-blue rounded-lg hover:bg-blue-800 text-sm font-medium"
            >
              Enviar Correo
            </button>
          </form>

          <div className="text-center mt-5">
            <span className='font-quicksand text-base' s>¿Ya recordaste tu contraseña?  </span>
            <a className="custom-blue text-base cursor-pointer hover:underline hover:underline-offset-3 font-quicksand" onClick={() => navigate("/")}>
              Iniciar sesión
            </a>
          </div>
        </div>

        <div className="w-1/2 hidden md:flex items-center justify-center ">
          <img src={ImagenLogo} alt="IniciodeSesión" className="w-3/4" />
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;