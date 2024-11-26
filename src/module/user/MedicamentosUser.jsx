import React, { useState, useEffect } from 'react'
import Add from '../../assets/add.svg'
import Filter from '../../assets/filter.svg'
import FlechaAbajo from '../../assets/arrow_drop_down.svg'
import Search from '../../assets/search.svg'
import Sunny from '../../assets/sunny.svg'
import SunnyP from '../../assets/sunnyP.svg'
import Moon from '../../assets/moon.svg'
import MoonP from '../../assets/moonP.svg'
import RealizarVentaModal from '../../components/RealizarVentaModal'


const MedicamentosUser = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const [isChecked, setIsChecked] = useState(
    () => localStorage.getItem('darkMode') === 'true' // Recupera el estado del modo oscuro
  );

  useEffect(() => {
    // Aplica o elimina la clase 'dark' según el estado
    if (isChecked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Guarda el estado en localStorage
    localStorage.setItem('darkMode', isChecked);
  }, [isChecked]);

  const handleChange = () => {
    setIsChecked(!isChecked); // Cambia el estado al hacer toggle
  };

  const openModal = () => {
    setShowModal(true);
  };

  const filters = [];

  return (
    <>
      <div className="flex transition-all duration-300" style={{ marginRight: showModal ? '550px' : '0' }}>

        <div className='flex flex-col w-full'>
          <h2 className='text-3xl text-center font-quicksand '>Medicamentos
          </h2>

          <div className='flex justify-center w-full mt-5 pl-10'>
            <form className="w-full relative">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                  <img src={Search} alt="Buscar" className='w-6 h-6 ' />
                </div>
                <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-transparent rounded-lg bg-custom-grey dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-no-border" placeholder="Buscar" required />
              </div>
            </form>


            <div className="ml-6 relative inline-block justify-center">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex justify-center px-3 py-2 text-white custom-blue-cyan hover-bg-customcyan rounded-lg"
              >
                <img src={Filter} alt="Buscar" className='w-10' />
                <img src={FlechaAbajo} alt="" className='w-6' />
              </button>

              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right custom-light rounded-lg shadow-lg dark:bg-gray-800 p-4">
                  <h1 className="text-sm font-quicksand mb-4">Agregar Filtro</h1>
                  <div className="grid grid-cols-2 gap-4">

                    {filters.map((filter) => (
                      <div
                        key={filter.id}
                        onClick={() => setSelectedFilter((prevFilter) => (prevFilter === filter.id ? null : filter.id))}
                        style={{
                          outline: selectedFilter === filter.id ? "2px solid #15CDCB" : "none",
                        }}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${selectedFilter === filter.id
                          ? "bg-cyan-100 bg-custom-cyanFound dark:bg-cyan-900"
                          : "hover-bg-custom-cyanFound dark:bg-gray-700 dark:hover:bg-gray-600"
                          }`}
                      >
                        <img
                          src={selectedFilter === filter.id ? filter.selectedIcon : filter.icon}
                          alt={filter.label}
                          className="w-8 h-8 mb-2"
                        />
                        <h1
                          className={`text-sm font-medium font-quicksand text-center ${selectedFilter === filter.id ? "text-custom-cyan" : ""
                            }`}
                        >
                          {filter.label}
                        </h1>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className='pl-2'>
              <button type="button" onClick={openModal} className="py-2 w-40 cursor-pointer text-white bg-custom-blue rounded-lg hover:bg-blue-800 text-sm font-medium">
                Realizar Venta
              </button>
            </div>

            <label className="inline-flex items-center cursor-pointer">
              <img
                src={isChecked ? Sunny : SunnyP}
                alt=""
                className="mr-3 ml-3 w-12"
              />
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div className="relative w-24 h-7 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600"></div>
              <img
                src={isChecked ? MoonP : Moon}
                alt=""
                className="mr-3 ml-3 w-12"
              />
            </label>
          </div>
        </div>
        <div className=''>
          <RealizarVentaModal
            showModal={showModal}
            closeModal={() => setShowModal(false)}
            className='w-1/2'
          />
        </div>
      </div>
    </>
  )
}

export default MedicamentosUser