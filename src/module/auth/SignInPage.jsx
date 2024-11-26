import React, { useContext, useState } from "react";
import AxiosClient from "../../config/http-gateway/http-client";
import AuthContext from "../../config/context/auth-context";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import * as yup from "yup";
import Mail from "../../assets/mail.svg";
import { useFormik } from "formik";
import ImagenLogo from "../../assets/img/imgLogin.png";
import Eye from "../../assets/eye.svg";
import EyeN from "../../assets/eye_n.svg";
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../../config/alert/alert';

const SignInPage = () => {

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object().shape({
            email: yup.string().email("Ingrese un correo válido").required("Campo obligatorio"),
            password: yup.string().required("Campo obligatorio"),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            try {
                //const response = await AxiosClient.post("/auth/signin", values);
                const response = {
                    data: {
                        roles: { role: "ADMIN" }, // Cambia el rol aquí
                        user: { id: 1, email: values.email, name: "ADMIN_ROLE" }
                    }
                };
                //console.log(response.data)
                if (response.data.roles.role === "ADMIN") {
                    dispatch({
                        type: "SIGNIN",
                        payload: response.data,
                    });
                    //Alerta
                    alertaExito('Éxito','Se inició sesión correctamente');
                    navigate("/medicamentos", { replace: true });
                } else if (response.data.roles.role === "USER") {
                    dispatch({
                        type: "SIGNIN",
                        payload: response.data,
                    });
                    alertaExito('Éxito','Se inició sesión correctamente');
                    navigate("/medicamentos", { replace: true });              
                } else {
                    //Alerta
                    alertaError('Acceso Denegado','Solo los administradores pueden acceder a esta sección.');
                }
            } catch (error) {
                //Alerta
                alertaError('Error','Usuario y/o contraseña incorrectos');
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="h-screen flex item-center justify-center">
            <div className="flex bg-white w-10/12 md:w-8/12 lg:w-7/12 xl:w-6/12 overflow-hidden justify-center items-center mx-auto">

                <div className="p-6 w-96 mr-5">
                    <h1 className="text-left text-4xl font-normal custom-blue font-quicksand mb-3">
                        Bienvenid@
                    </h1>
                    <p className="text-left text-gray-600 text-lg mb-8 font-quicksand">
                        Porque con <span className="custom-blue font-bold">FarmaVida</span> cambias tu vida
                    </p>

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

                        <div className="relative">
                            <label type="base-input" className="block mb-2 text-sm font-quicksand custom-blue font-medium text-gray-900 dark:text-white">Contraseña:</label>
                            <div className="absolute mt-7 inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                <img src={Mail} alt="" />
                            </div>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                autoComplete="password"
                                required
                                className="bg-custom-bluelight border-t-0 border-x-0 text-gray-900 text-sm rounded-lg focus:ring-0 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white custom-border-bottom"
                                placeholder="Contraseña"
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
                            <div className="text-red-600 text-sm font-quicksand">{formik.errors.password}</div>
                        )}

                        <button
                            type="submit"
                            disabled={formik.isSubmitting || !formik.isValid}
                            className="w-full py-3 cursor-pointer text-white bg-custom-blue rounded-lg hover:bg-blue-800 text-sm font-medium"
                        >
                            Entrar
                        </button>
                    </form>

                    <div className="text-center mt-5">
                        <a
                            className="custom-blue text-base cursor-pointer hover:underline hover:underline-offset-3 font-quicksand"
                            onClick={() => navigate("/forgot-password")}
                        >
                            ¿Olvidaste tu contraseña?
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

export default SignInPage
