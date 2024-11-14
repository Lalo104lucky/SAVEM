import React, { useContext } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import AxiosClient from '../../config/http-gateway/http-client'
import { customAlert } from '../../config/alert/alert'
import { Spinner } from 'flowbite-react'
import ImagenLogo from '../../assets/img/imgLogin.png'
import AuthContext from '../../config/context/auth-context'
import Mail from "../../assets/mail.svg";



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
        console.log(error);
        customAlert(
          "Restablecer contraseña",
          "Ocurrió un error al enviar el correo electrónico",
          "error"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="flex bg-white w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 overflow-hidden items-center justify-center mx-auto">
        <div className="w-1/2 p-6 w-96">
          <div>
            <h1 className="text-left text-4xl font-normal custom-blue font-quicksand mb-3">
              Recuperar
            </h1>
            <h1 className="text-left text-4xl font-normal custom-blue font-quicksand mb-3">
              Contraseña
            </h1>
          </div>
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

            <div>
              <button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                className="w-full py-3 ps-2.5 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 text-sm font-medium"
              >
                {formik.isSubmitting ? <Spinner /> : "Enviar correo"}
              </button>
            </div>
          </form>
          <div className="w-full text-center mt-5">
            <span>¿Ya recordaste tu contraseña?</span>
            <a className="text-blue-600 ml-2 cursor-pointer" onClick={() => navigate("/")}>
              Iniciar sesión
            </a>
          </div>
          <br />
          <br />
        </div>
        <div className="w-1/2 hidden md:flex items-center justify-center ">
          <img src={ImagenLogo} alt="IniciodeSesión" className="w-3/4 " />
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage