import React, { useContext, useState } from 'react'
import AuthContext from "../../config/context/auth-context";
import { Outlet, NavLink, useNavigate  } from "react-router-dom";
import Logo from "../../assets/img/LogoFarmaSN.png";
import Pencil from "../../assets/pencil.svg";
import Campana from "../../assets/campana.svg";
import Empleados from "../../assets/employee.svg";
import Pildora from "../../assets/pill.svg";
import Ventas from "../../assets/sales.svg";
import Salir from "../../assets/logout.svg";
import Profile from '../../components/Profile';
import { Button } from 'flowbite-react';

const AdminLayout = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const signOut = () => {
    localStorage.clear();
    dispatch({ type: "SIGNOUT" });
    navigate("/");
  };

  return (
    <div className="flex">
      <aside className="fixed h-screen text-base top-0 left-0 z-40 flex-1 transition-transform bg-custom-blue w-52">
        <div className="h-full overflow-y-auto bg-custom-blue dark:bg-blue-800">
          <div className="flex flex-col items-center justify-center mt-10 px-3">
            <img
              width="135"
              height="135"
              src={Logo}
              alt="Logo FarmaVida"
            />
            <h1 className="text-center text-lg text-white font-quicksand mt-3">
              Bienvenid@ Admin
            </h1>
          </div>
          <ul className="space-y-2">

            <li className="w-full items-center px-6 mb-10">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover:underline hover:underline-offset-3 group justify-center"
              >
                <div className="flex justify-center w-36">
                  <h1 className="text-xs text-white items-center font-quicksand text-center mr-1 break-words whitespace-normal">
                    Ana Patricia Sánchez
                  </h1>
                  <img src={Pencil} alt="Editar " className="w-4 h-4" />
                </div>
              </button>
            </li>

            <li className="w-full">
              <NavLink
                to="/medicamentos"
                className={({ isActive }) => {
                  const baseClasses =
                    "flex nav-a items-center p-2 text-white dark:text-white group relative";
                  const activeClasses =
                    "bg-custom-bluepoint bg-custom-bluepointDark";
                  const inactiveClasses =
                    "hover-bg-custom-bluepoint hover-bg-custom-bluepointDark";

                  return isActive ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute left-0 top-0 h-full w-1 transition-colors duration-200 ${isActive ? "bg-custom-cyan" : "hover:bg-custom-cyan"
                        }`}
                      aria-hidden="true"
                    ></span>
                    <img src={Pildora} alt="Pildora " className="w-6 h-6 ml-3" />
                    <span className="flex-1 ms-4 whitespace-nowrap font-quicksand">Medicamentos</span>
                  </>
                )}
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                to="/workers"
                className={({ isActive }) => {
                  const baseClasses =
                    "flex nav-a items-center p-2 text-white dark:text-white group relative";
                  const activeClasses =
                    "bg-custom-bluepoint  bg-custom-bluepointDark";
                  const inactiveClasses =
                    "hover-bg-custom-bluepoint hover-bg-custom-bluepointDark";

                  return isActive ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute left-0 top-0 h-full w-1 transition-colors duration-200 ${isActive ? "bg-custom-cyan" : "hover:bg-custom-cyan"
                        }`}
                      aria-hidden="true"
                    ></span>
                    <img src={Empleados} alt="Empleados " className="w-6 h-6 ml-3" />
                    <span className="flex-1 ms-4 whitespace-nowrap font-quicksand"> Empleados</span>
                  </>
                )}
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                to="/ventas"
                className={({ isActive }) => {
                  const baseClasses =
                    "flex nav-a items-center p-2 text-white dark:text-white group relative";
                  const activeClasses =
                    "bg-custom-bluepoint  bg-custom-bluepointDark";
                  const inactiveClasses =
                    "hover-bg-custom-bluepoint hover-bg-custom-bluepointDark";

                  return isActive ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute left-0 top-0 h-full w-1 transition-colors duration-200 ${isActive ? "bg-custom-cyan" : "hover:bg-custom-cyan"
                        }`}
                      aria-hidden="true"
                    ></span>
                    <img src={Ventas} alt="Ventas " className="w-6 h-6 ml-3" />
                    <span className="flex-1 ms-4 whitespace-nowrap font-quicksand"> Ventas</span>
                  </>
                )}
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                to="/notificaciones"
                className={({ isActive }) => {
                  const baseClasses =
                    "flex nav-a items-center p-2 text-white dark:text-white group relative";
                  const activeClasses =
                    "bg-custom-bluepoint  bg-custom-bluepointDark";
                  const inactiveClasses =
                    "hover-bg-custom-bluepoint hover-bg-custom-bluepointDark";

                  return isActive ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute left-0 top-0 h-full w-1 transition-colors duration-200 ${isActive ? "bg-custom-cyan" : "hover:bg-custom-cyan"
                        }`}
                      aria-hidden="true"
                    ></span>
                    <img src={Campana} alt="Campana " className="w-6 h-6 ml-3" />
                    <span className="flex-1 ms-4 whitespace-nowrap font-quicksand"> Notificaciones</span>
                  </>
                )}
              </NavLink>
            </li>

            <li className="absolute bottom-4 left-0 right-0 px-3 w-full ">
              <div>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "flex nav-a items-center p-2 text-white bg-custom-bluepoint rounded-lg dark:text-white  bg-custom-bluepointDark group"
                      : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover-bg-custom-bluepoint hover-bg-custom-bluepointDark group"
                  }
                  onClick={signOut}
                >
                  <img src={Salir} alt="Ventas " className="w-6 h-6 ml-3" />
                  <span className="flex-1 ms-4 whitespace-nowrap font-quicksand"> Cerrar Sesión</span>
                </NavLink>
              </div>
            </li>

          </ul>
        </div>
      </aside>
      <main style={{ flexGrow: 1, paddingTop: '2.5rem', marginLeft: '13rem', paddingLeft: '4rem', paddingRight: '4rem' }} className='dark:bg-black' >
        <section>
          <Outlet />
        </section>
      </main>

      <Profile
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Cierra el modal
      />
    </div >
  )
}

export default AdminLayout;