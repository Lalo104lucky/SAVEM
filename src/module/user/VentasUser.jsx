import React, { useState, useEffect } from 'react'
import TableComponentsVentasUser from '../../components/TableComponentsVentasUser';
import ShowVentas from '../../assets/showVentas.svg';
import VentsDetailsUser from '../../components/VentsDetailsUser';
import Search from '../../assets/search.svg'
import SearchPro from '../../assets/searchPro.svg'
import Sunny from '../../assets/sunny.svg'
import SunnyP from '../../assets/sunnyP.svg'
import Moon from '../../assets/moon.svg'
import MoonP from '../../assets/moonP.svg'
import { Datepicker } from 'flowbite';
import Calendario from '../../assets/calendar_medi.svg'
import CalendarioPro from '../../assets/calendar_mediPro.svg'
import RealizarVentaModal from '../../components/RealizarVentaModal'

const VentasUser = () => {

  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showModaVentasDetail, setShowModalVentasDitail] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isChecked, setIsChecked] = useState(
    () => localStorage.getItem('darkMode') === 'true' // Recupera el estado del modo oscuro
  );
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true'); // Nuevo estado

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

  useEffect(() => {
    const startInput = document.getElementById('datepicker-range-start');
    const endInput = document.getElementById('datepicker-range-end');
    if (startInput && endInput) {
      [startInput, endInput].forEach(input => {
        new Datepicker(input, { format: 'yyyy-mm-dd' }); // Formato compatible
      });
    }
  }, []);

  const handleStartDateChange = (e) => setStartDate(e.target.value);
  const handleEndDateChange = (e) => setEndDate(e.target.value);

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

  const filteredVentas = ventas.filter((venta) => {
    const ventaDate = new Date(venta.fechaVenta.split(' ')[0]);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return (!startDate || ventaDate >= start) && (!endDate || ventaDate <= end);
  });


  const mockVentas = [
    {
      noVenta: 1,
      fechaVenta: '2024/08/05 03:05:15 PM',
      total: 1000,
      tipoPago: 'Efectivo',
      vendedor: 'Juan Pérez',
      productos: [
        { clave: 1, medicamento: 'Paracetamol 500mg', marca: 'Genérico', cantidad: 2, total: 146 },
        { clave: 2, medicamento: 'Ibuprofeno 200mg', marca: 'Genérico', cantidad: 1, total: 204 },
      ],
    },
    {
      noVenta: 2,
      fechaVenta: '2024/08/05 03:05:15 PM',
      total: 1500,
      tipoPago: 'Tarjeta',
      vendedor: 'Ana López',
      productos: [
        { clave: 3, medicamento: 'Amoxicilina 500mg', marca: 'Genérico', cantidad: 3, total: 450 },
      ],
    },
    {
      noVenta: 3,
      fechaVenta: '2024/08/05 03:05:15 PM',
      total: 1500,
      tipoPago: 'Tarjeta',
      vendedor: 'Ana López',
      productos: [
        { clave: 3, medicamento: 'Amoxicilina 500mg', marca: 'Genérico', cantidad: 3, total: 450 },
      ],
    },
    {
      noVenta: 4,
      fechaVenta: '2024/08/05 03:05:15 PM',
      total: 1500,
      tipoPago: 'Tarjeta',
      vendedor: 'Ana López',
      productos: [
        { clave: 3, medicamento: 'Amoxicilina 500mg', marca: 'Genérico', cantidad: 3, total: 450 },
      ],
    },
    {
      noVenta: 5,
      fechaVenta: '2024/08/05 03:05:15 PM',
      total: 1500,
      tipoPago: 'Tarjeta',
      vendedor: 'Ana López',
      productos: [
        { clave: 3, medicamento: 'Amoxicilina 500mg', marca: 'Genérico', cantidad: 3, total: 450 },
      ],
    },
    {
      noVenta: 6,
      fechaVenta: '2024/08/05 03:05:15 PM',
      total: 1500,
      tipoPago: 'Tarjeta',
      vendedor: 'Ana López',
      productos: [
        { clave: 3, medicamento: 'Amoxicilina 500mg', marca: 'Genérico', cantidad: 3, total: 450 },
      ],
    },
    {
      noVenta: 7,
      fechaVenta: '2024/08/05 03:05:15 PM',
      total: 1500,
      tipoPago: 'Tarjeta',
      vendedor: 'Ana López',
      productos: [
        { clave: 3, medicamento: 'Amoxicilina 500mg', marca: 'Genérico', cantidad: 3, total: 450 },
      ],
    },
    {
      noVenta: 8,
      fechaVenta: '2024/08/05 03:05:15 PM',
      total: 1500,
      tipoPago: 'Tarjeta',
      vendedor: 'Ana López',
      productos: [
        { clave: 3, medicamento: 'Amoxicilina 500mg', marca: 'Genérico', cantidad: 3, total: 450 },
      ],
    },
    {
      noVenta: 9,
      fechaVenta: '2024/08/05 03:05:15 PM',
      total: 1500,
      tipoPago: 'Tarjeta',
      vendedor: 'Ana López',
      productos: [
        { clave: 3, medicamento: 'Amoxicilina 500mg', marca: 'Genérico', cantidad: 3, total: 450 },
      ],
    },
    {
      noVenta: 10,
      fechaVenta: '2024/08/05 03:05:15 PM',
      total: 1500,
      tipoPago: 'Tarjeta',
      vendedor: 'Ana López',
      productos: [
        { clave: 3, medicamento: 'Amoxicilina 500mg', marca: 'Genérico', cantidad: 3, total: 450 },
      ],
    },
  ];

  const getVentas = () => {
    setLoading(true);

    setTimeout(() => {
      setVentas(mockVentas);
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    getVentas();
  }, []);

  const refreshVentas = () => {
    getVentas();
  }

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const openModalVentasDetail = (venta) => {
    setSelectedVenta(venta);
    setShowModalVentasDitail(true);
  };

  const closeModalVentasDetail = () => {
    setSelectedVenta(null);
    setShowModalVentasDitail(false);
  };

  const columns = [
    {
      label: 'No. Venta',
      accessor: 'noVenta',
      render: (row) => <span className="font-quicksand">{row.noVenta}</span>,
    },
    {
      label: 'Fecha de Venta',
      accessor: 'fechaVenta',
      render: (row) => <span className="font-quicksand">{row.fechaVenta}</span>,
    },
    {
      label: 'Total',
      accessor: 'total',
      render: (row) => <span className="font-quicksand">{row.total}</span>,
    }, {
      label: 'Información',
      render: (row) => (
        <div className='flex px-4 ml-3'>
          <button
            onClick={() => openModalVentasDetail(row)}
            className="flex justify-center px-3 py-2  text-white custom-blue-cyan hover-bg-customcyan rounded-lg bg-custom-cyanDark hover-bg-custom-cyanDark"
          >
            <img src={isDarkMode ? ShowVentas : ShowVentas} className='font-quicksand' />
          </button>
        </div>
      ),
    },

  ];

  const openModal = () => {
    setShowModal(true);
  };


  return (
    <>
      <div className="flex transition-all duration-300" style={{ marginRight: showModal ? '500px' : '0' }}>
        <div className='flex flex-col w-full'>
          <h2 className='text-3xl text-center font-quicksand'>Ventas
          </h2>
          <div className="flex items-center justify-between w-full mt-5">
            <form className="flex-grow w-full  relative">
              <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                  <img src={isDarkMode ? SearchPro : Search} alt="Buscar" className="w-6 h-6" />
                </div>
                <input
                  type="search"
                  id="default-search"
                  className="block w-full p-2 pl-10 text-sm text-gray-900 border border-transparent rounded-lg bg-custom-grey dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-no-border"
                  placeholder="Buscar"
                  required
                />
              </div>
            </form>

            <img
              src={isDarkMode ? CalendarioPro : Calendario}
              alt=""
              className="ml-3 w-11"
            />

            <div id="date-range-picker" className="flex items-center ml-3 space-x-2">
              <input
                id="datepicker-range-start"
                name="start"
                type="text"
                value={startDate}
                onChange={handleStartDateChange}
                placeholder="Fecha Inicio"
                className="font-quicksand bg-custom-grey border border-transparent text-sm rounded-lg w-32 h-9 pl-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-no-border"
              />
              <span className="text-gray-900 dark:text-gray-200">-</span>
              <input
                id="datepicker-range-end"
                name="end"
                type="text"
                value={endDate}
                onChange={handleEndDateChange}
                placeholder="Fecha Final"
                className="font-quicksand bg-custom-grey border border-transparent text-sm rounded-lg w-32 h-9 pl-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-no-border"
              />
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
                className="mr-3 ml-3 w-16"
              />
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleChange}
                className="sr-only peer"
              />
              <div style={{ width: '7.5rem' }} className="relative h-7  bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600"></div>
              <img
                src={isChecked ? MoonP : Moon}
                alt=""
                className="mr-3 ml-3 w-16"
              />
            </label>
          </div>
          <div className=''>
            <TableComponentsVentasUser columns={columns} data={ventas} PerPage={7} progress={loading} />
          </div>
          <div>
            <VentsDetailsUser
              showModaVentasDetail={showModaVentasDetail}
              closeModalVentasDetail={closeModalVentasDetail}
              venta={selectedVenta}
            />
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

export default VentasUser