import React, { useState, useEffect } from 'react'
import Search from '../../assets/search.svg'
import SearchPro from '../../assets/searchPro.svg'
import Filter from '../../assets/filter.svg'
import Sunny from '../../assets/sunny.svg'
import SunnyP from '../../assets/sunnyP.svg'
import Moon from '../../assets/moon.svg'
import MoonP from '../../assets/moonP.svg'
import FlechaAbajo from '../../assets/arrow_drop_down.svg'
import Paracetamol from '../../assets/img/Paracetamol.jpg'
import Arañita from '../../assets/img/Arañita.jpg'
import Prescripcion from '../../assets/prescripcion.svg'
import PrescripcionS from '../../assets/prescripcion_S.svg'
import PrescripcionPro from '../../assets/prescripcionPro.svg'
import Patente from '../../assets/patente.svg'
import PatenteS from '../../assets/patente_S.svg'
import PatentePro from '../../assets/patentePro.svg'
import SNPrescripcion from '../../assets/sn_prescripcion.svg'
import SNPrescripcionS from '../../assets/sn_prescripcion_S.svg'
import SNPrescripcionPro from '../../assets/sn_prescripcionPro.svg'
import Star from '../../assets/star.svg'
import StarS from '../../assets/star_S.svg'
import StarPro from '../../assets/starPro.svg'
import InventoryMedicamento from '../../components/InventoryMedicamento'
import RealizarVentaModal from '../../components/RealizarVentaModal'
import OffCanvas from '../../components/OffCanvas'


const MedicamentosUser = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedMedicamento, setSelectedMedicamento] = useState(null);
  const [loading, setLoading] = useState(true);
  const [medicamentos, setMedicamentos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true'); // Nuevo estado
  const userRole = "USER";

  const [isChecked, setIsChecked] = useState(
    () => localStorage.getItem('darkMode') === 'true' // Recupera el estado del modo oscuro
  );

  useEffect(() => {
    if (isChecked) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true); // Actualiza el estado inmediatamente
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false); // Actualiza el estado inmediatamente
    }
    localStorage.setItem('darkMode', isChecked);
  }, [isChecked]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = () => {
    setIsChecked(!isChecked); // Cambia el estado al hacer toggle
  };

  const openModal = () => {
    setShowModal(true);
  };

  const handleEditModalToggle = (medicamento) => {
    setSelectedMedicamento(medicamento); // Establece el medicamento seleccionado
  };

  const handleOffCanvasToggle = (medicamento) => {
    setSelectedMedicamento(medicamento); // Establece el medicamento seleccionado
    setShowOffcanvas(true); // Abre el OffCanvas
  };

  const getInventary = async () => {
    try {
      setLoading(true);
      // Simula la carga de datos.

      setMedicamentos([
        { id: 1, categoria: 'Genérico', tipo: 'Sin Prescripcion', name: 'Paracetamol 500mg', price: 50, stock: 100, image: Paracetamol, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500', description: 'Producto para mujeres que sufren el Premenstrual SPM®, caracterizado por cólicos fuertes, fatiga, cansancio, aumento en la retención de agua, tensión nerviosa, irritabilidad, dolor de cabeza, espalda, vientre y ovarios.' },
        { id: 2, categoria: 'Genérico', tipo: 'Sin Prescripcion', name: 'Ibuprofeno', price: 80, stock: 50, image: Paracetamol, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500' },
        { id: 3, categoria: 'Genérico', tipo: 'Sin Prescripcion', name: 'Amoxicilina', price: 120, stock: 30, image: Arañita, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500' },
        { id: 4, categoria: 'Genérico', tipo: 'Sin Prescripcion', name: 'Amoxicilina', price: 120, stock: 30, image: Arañita, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500' },
        { id: 5, categoria: 'Genérico', tipo: 'Con Prescripcion', name: 'Amoxicilina', price: 120, stock: 30, image: Paracetamol, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500' },
        { id: 6, categoria: 'Genérico', tipo: 'Con prescripcion', name: 'Amoxicilina', price: 120, stock: 30, image: Paracetamol, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500' },
        { id: 7, categoria: 'Genérico', tipo: 'Sin Prescripcion', name: 'Paracetamol 500mg', price: 50, stock: 100, image: Paracetamol, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500' },
        { id: 8, categoria: 'Genérico', tipo: 'Sin Prescripcion', name: 'Ibuprofeno', price: 80, stock: 50, image: Paracetamol, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500' },
        { id: 9, categoria: 'Genérico', tipo: 'Sin Prescripcion', name: 'Amoxicilina', price: 120, stock: 30, image: Arañita, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500' },
        { id: 10, categoria: 'Genérico', tipo: 'Sin Prescripcion', name: 'Amoxicilina', price: 120, stock: 30, image: Arañita, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500' },
        { id: 11, categoria: 'Genérico', tipo: 'Con Prescripcion', name: 'Amoxicilina', price: 120, stock: 30, image: Paracetamol, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500' },
        { id: 12, categoria: 'Genérico', tipo: 'Con prescripcion', name: 'Amoxicilina', price: 120, stock: 30, image: Paracetamol, date: '05 Octubre 2024', marca: 'Genfar', codigo: 'VF920DKS', clave: '040000321500' },
      ]);
      console.log(medicamentos);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filters = [
    {
      id: "prescripcion",
      label: "Con Prescripción",
      icon: Prescripcion,
      selectedIcon: PrescripcionS,
      darkIcon: PrescripcionPro,
    },
    {
      id: "patente",
      label: "Patente",
      icon: Patente,
      selectedIcon: PatenteS,
      darkIcon: PatentePro,
    },
    {
      id: "sin_prescripcion",
      label: "Sin Prescripción",
      icon: SNPrescripcion,
      selectedIcon: SNPrescripcionS,
      darkIcon: SNPrescripcionPro,
    },
    {
      id: "generico",
      label: "Genérico",
      icon: Star,
      selectedIcon: StarS,
      darkIcon: StarPro,
    },
  ];

  const refreshInventary = () => {
    getInventary();
  };

  useEffect(() => {
    getInventary();
  }, []);

  return (
    <>
      <div className="transition-all duration-300" style={{ marginRight: showModal ? '500px' : '0' }}>

        <div className='flex flex-col w-full'>
          <h2 className='text-3xl text-center font-quicksand '>Medicamentos
          </h2>

          <div className='flex justify-center w-full mt-5'>
            <form className="w-full relative">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                  <img src={isDarkMode ? SearchPro : Search} alt="Buscar" className='w-6 h-6 ' />
                </div>
                <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-transparent rounded-lg bg-custom-grey dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-no-border" placeholder="Buscar" required />
              </div>
            </form>

            <div className="ml-6 relative inline-block justify-center">
              <button
                type="button"
                onClick={toggleDropdown}
                className="flex justify-center px-3 py-2 text-white custom-blue-cyan hover-bg-customcyan rounded-lg bg-custom-cyanDark hover-bg-custom-cyanDark"
              >
                <img src={Filter} alt="Buscar" className='w-10' />
                <img src={FlechaAbajo} alt="" className='w-6' />
              </button>

              {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-80 origin-top-right custom-light rounded-lg shadow-lg dark:bg-gray-800 p-4">
                  <h1 className="text-sm font-quicksand mb-4 text-black dark:text-white">Agregar Filtro</h1>
                  <div className="grid grid-cols-2 gap-4">

                    {filters.map((filter) => (
                      <div
                        key={filter.id}
                        onClick={() => setSelectedFilter((prevFilter) => (prevFilter === filter.id ? null : filter.id))}
                        style={{
                          outline: selectedFilter === filter.id ? "2px solid #15CDCB" : "none",
                        }}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer ${selectedFilter === filter.id
                          ? "bg-cyan-100 bg-custom-cyanFound bg-custom-Dark"
                          : "hover-bg-custom-cyanFound dark:bg-gray-700 dark:hover:bg-gray-600"
                          }`}
                      >
                        <img
                          src={
                            selectedFilter === filter.id
                              ? filter.selectedIcon
                              : isDarkMode
                                ? filter.darkIcon
                                : filter.icon
                          }
                          alt={filter.label}
                          className="w-8 h-8 mb-2 "
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

            <div className="ml-6 justify-center ">
              <button
                onClick={openModal}
                type="button"
                className="flex justify-center px-3 py-2 w-36 text-white bg-custom-blue hover-bg-custom-blueVenta rounded-lg"
              >
                <h2 className="text-sm font-quicksand text-white dark:text-white">Realizar Venta</h2>
              </button>
            </div>

            <label className="inline-flex items-center cursor-pointer">
              <img
                src={isChecked ? Sunny : SunnyP}
                alt=""
                className="mr-3 ml-3 w-14"
              />
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div style={{ width: '6.2rem' }} className="relative h-7 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600"></div>
              <img
                src={isChecked ? MoonP : Moon}
                alt=""
                className="mr-3 ml-3 w-14"
              />
            </label>
          </div>
        </div>
        <div className={`grid ${showModal ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-4 mt-5 overflow-y-auto mb-10`}>
          {medicamentos.map((medicamento) => (
            <InventoryMedicamento
              key={medicamento.id}
              selectedMedicamento={medicamento}
              setShowOffcanvas={setShowOffcanvas}
              handleEditModalToggle={handleEditModalToggle}
            />
          ))}
        </div>
        <div className=''>
          <RealizarVentaModal
            showModal={showModal}
            closeModal={() => setShowModal(false)}
            className='w-1/2'
          />
        </div>
      </div>
      <OffCanvas
        showOffcanvas={showOffcanvas}
        setShowOffcanvas={setShowOffcanvas}
        selectedMedicamento={selectedMedicamento}
        role={userRole}
      />
    </>
  )
}

export default MedicamentosUser