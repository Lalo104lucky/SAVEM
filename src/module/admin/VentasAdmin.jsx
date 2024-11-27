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
import Filter from '../../assets/filter.svg'
import FlechaAbajo from '../../assets/arrow_drop_down.svg'

const VentasAdmin = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showModaVentasDetail, setShowModalVentasDitail] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);
  const [isChecked, setIsChecked] = useState(
    () => localStorage.getItem('darkMode') === 'true' // Recupera el estado del modo oscuro
  );
  const isDarkMode = document.documentElement.classList.contains('dark');

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
    },
    {
      label: 'Fecha de Venta',
      accessor: 'fechaVenta',
    },
    {
      label: 'Total',
      accessor: 'total',
    }, {
      label: 'Acciones',
      render: (row) => (
        <div className=''>
          <button
            onClick={() => openModalVentasDetail(row)}
            className=" border bg-custom-cyan focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-2.5 py-1.5  "
          >
            <img src={ShowVentas} className='' />
          </button>
        </div>
      ),
    },

  ];

  return (
    <>
      <h2 className='text-3xl text-center font-quicksand'>Ventas
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
            className="flex justify-center px-3 py-2 text-white custom-blue-cyan hover-bg-customcyan rounded-lg bg-custom-cyanDark hover-bg-custom-cyanDark"
          >
            <h2 className='text-sm text-center font-quicksand'>Status Financiero
            </h2>
          </button>
        </div>

        <label className="inline-flex items-center cursor-pointer">
          <img
            src={isChecked ? Sunny : SunnyP}
            alt=""
            className="mr-3 ml-3 w-11"
          />
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="relative w-20 h-7 bg-gray-200 peer-focus:outline-none dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600"></div>
          <img
            src={isChecked ? MoonP : Moon}
            alt=""
            className="mr-3 ml-3 w-11"
          />
        </label>
      </div>

      <div className=''>
        <TableComponentsVentasUser columns={columns} data={ventas} PerPage={10} progress={loading} />
      </div>
      <div>
        <VentsDetailsUser
          showModaVentasDetail={showModaVentasDetail}
          closeModalVentasDetail={closeModalVentasDetail}
          venta={selectedVenta}
        />
      </div>
    </>
  )
}

export default VentasAdmin