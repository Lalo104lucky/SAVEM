import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignInPage from "../module/auth/SignInPage";
import AuthContext from "../config/context/auth-context";
import AdminLayout from "../module/admin/AdminLayout";
import Home from "../module/admin/Home";
import Profile from "../module/admin/Profile";
import ForgotPasswordPage from "../module/auth/ForgotPasswordPage";
import ResetPasswordPage from "../module/auth/ResetPasswordPage";

const AppRouter = () => {
    const { user } = useContext(AuthContext);
    

    return (
        <BrowserRouter>
            <Routes>
                {user?.signed ? (
                    user?.role === "ADMIN_ROLE" ? (
                        <Route path="*" element={<AdminLayout />}>
                        </Route>
                    ) : (
                        <Route path="*" element={<AdminLayout />}>
                            <Route path="home" element={<Home />} />
                            <Route path="profile" element={<Profile />} />
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