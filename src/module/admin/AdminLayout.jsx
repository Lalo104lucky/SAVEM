import React, { useContext } from 'react'
import AuthContext from "../../config/context/auth-context";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/logoFarma.png";
import { Dropdown } from "flowbite-react";

const AdminLayout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const signOut = () => {
    localStorage.clear();
    dispatch({ type: "SIGNOUT" });
    navigate("/");
  };
  return (
    <div className="flex">
      <aside className="fixed h-full text-base top-0 left-0 z-40 flex-1 h-screen transition-transform bg-blue-600 dark:bg-gray-800 h-full">
        <div className="h-full overflow-y-auto bg-blue-600 dark:bg-blue-800">
          <div className="flex items-center">
            <img
              width="135"
              height="135"
              src={Logo}
              alt="Logo de la carniceria"
            />
          </div>
          <ul className="space-y-2">
            <li className="w-full px-3">
              <NavLink
                to="/notificaciones"
                className={({ isActive }) =>
                  isActive
                    ? "flex nav-a items-center p-2 text-blue-600 bg-white rounded-lg dark:text-white dark:bg-gray-700 group"
                    : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                }
              >
                <i className="fa-solid fa-house mr-2"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Notificaciones</span>
              </NavLink>
            </li>
            <li className="w-full px-3">
              <NavLink
                to="/workers"
                className={({ isActive }) =>
                  isActive
                    ? "flex nav-a items-center p-2 text-blue-600 bg-white rounded-lg dark:text-white dark:bg-gray-700 group"
                    : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                }
              >
                <i className="fa-solid fa-grip mr-2"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Empleados{" "}
                </span>
              </NavLink>
            </li>
            <li className="w-full px-3">
              <NavLink
                to="/medicamentos"
                className={({ isActive }) =>
                  isActive
                    ? "flex nav-a items-center p-2 text-blue-600 bg-white rounded-lg dark:text-white dark:bg-gray-700 group"
                    : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                }
              >
                <i className="fa-solid fa-calendar-days mr-2"></i>
                <span className="flex-1 ms-3 whitespace-nowrap">Medicamentos</span>
              </NavLink>
            </li>
            <li className="w-full px-3">
              <NavLink
                to="/ventas"
                className={({ isActive }) =>
                  isActive
                    ? "flex nav-a items-center p-2 text-blue-600 bg-white rounded-lg dark:text-white dark:bg-gray-700 group"
                    : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                }
              >
                <i className="fa-solid fa-user mr-2"></i>
                <span className="flex-1 ms-3 whitespace-nowrap"> Ventas</span>
              </NavLink>
            </li>
            
            <li className=" absolute bottom-0 left-0 right-0 mx-2 px-3 w-full">
              <div>
                <Dropdown
                  className="w-full"
                  label={
                    <span className="flex nav-a p-2 text-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group justify-start">
                      <span className="flex-1 whitespace-nowrap w-full px-5">
                        <i className="fa-solid fa-circle-user mr-2"></i>
                        Admin
                      </span>
                    </span>
                  }
                  inline={true}
                >
                  <Dropdown.Item className="w-full text-left">
                    <NavLink to="/profile" className="flex items-center">
                      <i className="fa-solid fa-user mr-2 text-blue-600"></i>
                      <span className=" flex justify-end text-blue-600">
                        Perfil
                      </span>
                    </NavLink>
                  </Dropdown.Item>
                  <Dropdown.Item className="w-full text-left text-blue-600" onClick={signOut}>
                    <i className="fa-solid fa-right-from-bracket mr-2 text-blue-600"></i>
                    Cerrar sesión
                  </Dropdown.Item>
                </Dropdown>
                <div className="absolute top-0 left-0 w-full h-px bg-gray-300 dark:bg-gray-700"></div>
              </div>
            </li>
          </ul>
        </div>
      </aside>
      <main className="pt-10 ml-48 flex-1 px-16">
        <section>
          <Outlet />
        </section>
      </main>
    </div>
  )
}

export default AdminLayout;