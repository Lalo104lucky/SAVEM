import React, { useContext, useState } from 'react'
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/img/LogoFarmaSN.png";
import AuthContext from "../../config/context/auth-context";
import Pildora from "../../assets/pill.svg";
import Ventas from "../../assets/sales.svg";
import Persona from "../../assets/person.svg";
import Salir from "../../assets/logout.svg";

const UserLayout = () => {

  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTooltip, setActiveTooltip] = useState(null);

  const signOut = () => {
    localStorage.clear();
    dispatch({ type: "SIGNOUT" });
    navigate("/");
  };

  const handleMouseEnter = (tooltipId) => {
    setActiveTooltip(tooltipId);
  };

  const handleMouseLeave = () => {
    setActiveTooltip(null);
  };

  return (
    <div className="flex">
      <aside className="fixed h-screen text-base top-0 left-0 z-40 flex-1 transition-transform bg-custom-blue dark:bg-gray-800 w-28 overflow-visible">
        <div className="h-full bg-custom-blue dark:bg-blue-800">
          <div className="flex flex-col items-center justify-center mt-5 px-1 mb-10">
            <img
              width="60"
              height="80"
              src={Logo}
              alt="Logo FarmaVida"
            />
          </div>
          <ul className="space-y-2">

            <li className="w-full relative">
              <NavLink
                to="/medicamentos"
                className={({ isActive }) => {
                  const baseClasses =
                    "flex nav-a items-center p-2 text-white dark:text-white group relative";
                  const activeClasses = "bg-custom-bluepoint dark:bg-gray-700";
                  const inactiveClasses = "hover-bg-custom-bluepoint dark:hover:bg-gray-700";

                  return isActive
                    ? `${baseClasses} ${activeClasses}`
                    : `${baseClasses} ${inactiveClasses}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute right-0 top-0 h-full w-1 transition-colors duration-200 ${isActive ? "bg-custom-cyan" : "hover:bg-custom-cyan"
                        }`}
                      aria-hidden="true"

                    ></span>
                    <img src={Pildora} alt="Pildora" className="w-6 h-6 ml-3"
                      onMouseEnter={() => handleMouseEnter("medicamentos")}
                      onMouseLeave={handleMouseLeave}
                    />
                    <span
                      className={`absolute left-8 ml-6 font-quicksand bg-custom-blue text-white text-sm py-1 px-3 rounded-md shadow-lg z-50 whitespace-nowrap transition-opacity duration-300 
                        ${activeTooltip === "medicamentos"
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                        }`}
                    >
                      Medicamentos
                    </span>
                  </>
                )}
              </NavLink>
            </li>

            <li className="w-full relative">
              <NavLink
                to="/ventas"
                className={({ isActive }) => {
                  const baseClasses =
                    "flex nav-a items-center p-2 text-white dark:text-white group relative";
                  const activeClasses =
                    "bg-custom-bluepoint dark:bg-gray-700";
                  const inactiveClasses =
                    "hover-bg-custom-bluepoint dark:hover:bg-gray-700";

                  return isActive ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute right-0 top-0 h-full w-1 transition-colors duration-200 ${isActive ? "bg-custom-cyan" : "hover:bg-custom-cyan"
                        }`}
                      aria-hidden="true"
                    ></span>
                    <img src={Ventas} alt="Ventas " className="w-6 h-6 ml-3" 
                      onMouseEnter={() => handleMouseEnter("ventas")}
                      onMouseLeave={handleMouseLeave} 
                    />
                    <span
                      className={`absolute left-8 ml-6 font-quicksand bg-custom-blue text-white text-sm py-1 px-3 rounded-md shadow-lg z-50 whitespace-nowrap transition-opacity duration-300 
                        ${activeTooltip === "ventas"
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                        }`}
                    >
                      Ventas
                    </span>
                  </>
                )}
              </NavLink>
            </li>

            <li className="w-full">
              <NavLink
                to="/profile"
                className={({ isActive }) => {
                  const baseClasses =
                    "flex nav-a items-center p-2 text-white dark:text-white group relative";
                  const activeClasses =
                    "bg-custom-bluepoint dark:bg-gray-700";
                  const inactiveClasses =
                    "hover-bg-custom-bluepoint dark:hover:bg-gray-700";

                  return isActive ? `${baseClasses} ${activeClasses}` : `${baseClasses} ${inactiveClasses}`;
                }}
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`absolute right-0 top-0 h-full w-1 transition-colors duration-200 ${isActive ? "bg-custom-cyan" : "hover:bg-custom-cyan"
                        }`}
                      aria-hidden="true"
                    ></span>
                    <img src={Persona} alt="Persona " className="w-6 h-6 ml-3" 
                      onMouseEnter={() => handleMouseEnter("perfil")}
                      onMouseLeave={handleMouseLeave} 
                    />
                    <span
                      className={`absolute left-8 ml-6 font-quicksand bg-custom-blue text-white text-sm py-1 px-3 rounded-md shadow-lg z-50 whitespace-nowrap transition-opacity duration-300 
                        ${activeTooltip === "perfil"
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                        }`}
                    >
                      Mi Perfil
                    </span>
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
                      ? "flex nav-a items-center p-2 text-white bg-custom-bluepoint rounded-lg dark:text-white dark:bg-gray-700 group"
                      : "flex nav-a items-center p-2 text-white rounded-lg dark:text-white hover-bg-custom-bluepoint dark:hover:bg-gray-700 group"
                  }
                  onClick={signOut}
                >
                  <img src={Salir} alt="Ventas " className="w-6 h-6 ml-1" 
                    onMouseEnter={() => handleMouseEnter("cerrarSesion")}
                    onMouseLeave={handleMouseLeave} 
                  />
                  <span
                      className={`absolute left-8 ml-6 font-quicksand bg-custom-blue text-white text-sm py-1 px-3 rounded-md shadow-lg z-50 whitespace-nowrap transition-opacity duration-300 
                        ${activeTooltip === "cerrarSesion"
                          ? "opacity-100 visible"
                          : "opacity-0 invisible"
                        }`}
                    >
                      Cerrar Sesión
                    </span>
                </NavLink>
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

export default UserLayout