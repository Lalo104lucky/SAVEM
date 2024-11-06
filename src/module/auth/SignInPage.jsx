import React, { useContext } from "react";
import AxiosClient from "../../config/http-gateway/http-client";
import AuthContext from "../../config/context/auth-context";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import * as yup from "yup";
import { useFormik } from "formik";
import ImagenLogo from "../../assets/img/imgLogin.jpg";
import { ProgressSpinner } from "primereact/progressspinner";
import { Password } from "primereact/password";
import { InputText } from "primereact/inputtext";



const SignInPage = () => {
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
                const response = await AxiosClient.post("/auth/signin", values);
                console.log(response.data)
                if (response.data.roles.role === "ADMIN_ROLE") {
                    dispatch({
                        type: "SIGNIN",
                        payload: response.data,
                    });
                    navigate("/home", { replace: true });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Acceso Denegado',
                        text: 'Solo los administradores pueden acceder a esta sección.',
                    });
                }
            } catch (error) {
                Swal.fire(
                    'Error al iniciar sesión',
                    'Usuario y/o contraseña incorrectos',
                    'error'
                );
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="fondo h-screen flex item-center justify-center">
            <div className="shadow-lg rounded-lg flex items-center w-96 mx-auto">
                
                <div
                    className="w-1/2 p-10 bg-white rounded-lg"
                    style={{ height: "auto" }}
                >
                    {" "}
                    <div>
                        <h1 className=" text-center text-4xl font-extrabold text-blue-800">
                            Bienvenid@
                        </h1>
                    </div>
                    <div>
                        <h1 className=" text-center text-3xl font-extrabold text-black-800">
                            Por que con FarmaVida cambia tu vida
                        </h1>
                    </div>
                    <form
                        className="mt-10  space-y-6"
                        action="#"
                        method="POST"
                        noValidate
                        onSubmit={formik.handleSubmit}
                    >
                        <div className="wrapper">
                            <div className="icon">
                                <svg
                                    className="w-6 h-6 text-blue-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            <InputText
                                id="email"
                                name="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                type="email"
                                autoComplete="email"
                                required
                                className=" input rounded-lg border-gray-300 w-full"
                                placeholder="Correo electrónico"
                            />
                            {formik.touched.email && formik.errors.email && (
                                <div className="text-blue-600">{formik.errors.email}</div>
                            )}
                        </div>

                        <div className="wrapper">
                            <div className="icon">
                                <svg
                                    class="w-6 h-6 text-blue-800 dark:text-white"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7c0-1.1.9-2 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6c.6 0 1 .4 1 1v3a1 1 0 1 1-2 0v-3c0-.6.4-1 1-1Z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>

                            <Password
                                id="password"
                                name="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                                type="password"
                                autoComplete="current-password"
                                required
                                class=" input rounded-lg border-gray-300 w-full"
                                placeholder="Contraseña"
                                toggleMask
                                feedback={false}
                            />
                            {formik.touched.password && formik.errors.password && (
                                <div className="text-red-600">{formik.errors.password}</div>
                            )}
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={formik.isSubmitting || !formik.isValid}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                {formik.isSubmitting ? <ProgressSpinner /> : "Iniciar sesión"}
                            </button>
                        </div>
                    </form>
                    <div className="w-full text-center mt-5">
                        <a className="text-blue-600 ml-2" onClick={() => navigate("/forgot-password")}>
                            ¿Olvidaste tu contraseña?
                        </a>
                    </div>
                    <br />
                    <br />
                </div>
                <div
                    className="  bg-img-red flex rounded-lg items-center justify-center"
                    style={{ height: "10px" }}
                >
                    <img src={ImagenLogo} alt="" />
                </div>
            </div>
        </div>
    );
}

export default SignInPage