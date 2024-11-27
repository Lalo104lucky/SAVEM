import React, { useState, useEffect } from 'react'
import Search from '../../assets/search.svg'
import TableComponentsVentasUser from '../../components/TableComponentsVentasUser';
import ShowVentas from '../../assets/showVentas.svg';
import VentsDetailsUser from '../../components/VentsDetailsUser';


const VentasUser = () => {

  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [showModaVentasDetail, setShowModalVentasDitail] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);

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
      <p className='text-3xl text-center font-quicksand'>Ventas</p>
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
      </div>
      <div className=''>
        <TableComponentsVentasUser columns={columns} data={ventas} PerPage={5} progress={loading} />
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

export default VentasUser