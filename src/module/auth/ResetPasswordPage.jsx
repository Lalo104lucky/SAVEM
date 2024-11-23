
import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../../config/alert/alert';
import AxiosClient from '../../config/http-gateway/http-client'
import { useNavigate, useLocation } from 'react-router-dom'
import ImagenLogo from '../../assets/img/imgLogin.png'
import Eye from "../../assets/eye.svg";
import EyeN from "../../assets/eye_n.svg";
import Token from "../../assets/token.svg";
import Pass from "../../assets/pass.svg";


const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const urlParams = new URLSearchParams(search);
  const userId = urlParams.get("userId");

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  const formik = useFormik({
    initialValues: {
      token: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: yup.object().shape({
      token: yup.string().required("Campo obligatorio"),
      newPassword: yup
        .string()
        .required("Campo obligatorio")
        .min(8, "La contraseña debe tener al menos 8 caracteres"),
      confirmPassword: yup
        .string()
        .oneOf(
          [yup.ref("newPassword"), null],
          "Las contraseñas deben coincidir"
        )
        .required("Campo obligatorio"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          token: values.token,
          newPassword: values.newPassword,
          idUser: "1",
        };

        console.log("datos", payload);
        const response = await AxiosClient({
          url: "/users/reset-password",
          method: "POST",
          data: payload,
        });
        if (!response?.data?.error) {
          alertaExito("Contraseña restablecida", "Tu contraseña ha sido restablecida con éxito");
          navigate("/");
        } else {
          throw Error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        alertaError("Restablecer contraseña", "Ocurrió un error al restablecer la contraseña",);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="h-screen flex item-center justify-center">
      <div className="flex bg-white w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 overflow-hidden justify-center items-center mx-auto">

        <div className="p-6 w-96 mr-5"        >
          <h1 className="text-left text-4xl font-normal custom-blue font-quicksand mb-2">
            Restablecer
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
                <img src={Token} alt="" />
              </div>
              <input
                type="text"
                id="token"
                name="token"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                required
                className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                placeholder="12AB34CD"
              />
            </div>

            {formik.touched.token && formik.errors.token && (
              <div className="text-red-600 text-sm font-quicksand">{formik.errors.token}</div>
            )}

            <div className="relative mb-2">
              <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Nueva Contraseña:</label>
              <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                <img src={Pass} alt="" />
              </div>
              <input
                type={showPassword1 ? "text" : "password"}
                id="newPassword"
                name="newPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.newPassword}
                autoComplete="newPassword"
                required
                className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                placeholder="Nueva contraseña"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility1}
                className="absolute pe-3 end-0 flex items-center text-gray-500"
                style={{ top: '3rem', transform: 'translateY(-50%)' }}
              >
                {showPassword1 ? <img src={Eye} alt="Mostrar contraseña" /> : <img src={EyeN} alt="Ocultar contraseña" />}
              </button>
            </div>

            {formik.touched.newPassword && formik.errors.newPassword && (
              <div className="text-red-600 text-sm font-quicksand">{formik.errors.newPassword}</div>
            )}

            <div className="relative mb-2">
              <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Confirmar Contraseña:</label>
              <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                <img src={Pass} alt="" />
              </div>
              <input
                type={showPassword2 ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                autoComplete="new-password"
                required
                className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                placeholder="Confirmar contraseña"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility2}
                className="absolute pe-3 end-0 flex items-center text-gray-500"
                style={{ top: '3rem', transform: 'translateY(-50%)' }}
              >
                {showPassword2 ? <img src={Eye} alt="Mostrar contraseña" /> : <img src={EyeN} alt="Ocultar contraseña" />}
              </button>
            </div>

            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className="text-red-600 text-sm font-quicksand">{formik.errors.confirmPassword}</div>
            )}

            <div>
              <button
                type="submit"
                disabled={formik.isSubmitting || !formik.isValid}
                className="w-full py-3 cursor-pointer text-white bg-custom-blue rounded-lg hover:bg-blue-800 text-sm font-medium"
              >
                {formik.isSubmitting ? "Enviando..." : "Restablecer contraseña"}
              </button>
            </div>
          </form>
          <div className="text-center mt-5">
            <a className="custom-blue text-base cursor-pointer hover:underline hover:underline-offset-3 font-quicksand" onClick={() => navigate("/")}>
              Iniciar sesión
            </a>
          </div>
        </div>
        <div className="w-1/2 hidden md:flex items-center justify-center ">
          <img src={ImagenLogo} alt="IniciodeSesión" className="w-3/4 " />
        </div>
      </div>
    </div>
  )
}

export default ResetPasswordPage