import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "../module/auth/SignInPage";
import AuthContext from "../config/context/auth-context";
import AdminLayout from "../module/admin/AdminLayout";
import UserLayout from "../module/user/UserLayout";
import HomeUser from "../module/user/HomeUser";
import ForgotPasswordPage from "../module/auth/ForgotPasswordPage";
import ResetPasswordPage from "../module/auth/ResetPasswordPage";
import Workers from "../module/admin/Workers";
import MedicamentosAdmin from "../module/admin/MedicamantosAdmin";
import VentasAdmin from "../module/admin/VentasAdmin";
import Notifications from "../module/admin/Notifications";
import ProfileUser from "../module/user/ProfileUser";
import VentasUser from "../module/user/VentasUser";
import MedicamentosUser from "../module/user/MedicamentosUser";

const AppRouter = () => {
    const { user } = useContext(AuthContext);

    return (
        
        <BrowserRouter>
            <Routes>
                {user?.signed ? (
                    user?.roles.role === "ADMIN" ? (
                        <Route path="*" element={<AdminLayout />}>
                            <Route path="workers" element={<Workers />} />
                            <Route path="medicamentos" element={<MedicamentosAdmin />} />
                            <Route path="ventas" element={<VentasAdmin />} />
                            <Route path="notificaciones" element={<Notifications />} />
                        </Route>
                    ) : (
                        <Route path="*" element={<UserLayout/>}>
                            <Route path="homeUser" element={<HomeUser/>} />
                            <Route path="profile" element={<ProfileUser/>} />
                            <Route path="ventas" element={<VentasUser/>} />
                            <Route path="medicamentos" element={<MedicamentosUser/>} />
                        </Route>
                    )
                ) : (
                    <>
                        <Route path="/" element={<SignInPage />} />
                        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                        <Route path="/reset-password" element={<ResetPasswordPage />} />
                    </>
                )}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter