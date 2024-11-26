import React, { useState, useEffect } from 'react'
import AddWorkerModal from '../../components/AddWorkerModal'
import EditWorkerModal from '../../components/EditWorkerModal'
import TableComponent from '../../components/TableComponents'
import AxiosClient from '../../config/http-gateway/http-client'
import Swal from 'sweetalert2'
import Search from '../../assets/search.svg'
import SearchPro from '../../assets/searchPro.svg'
import Add from '../../assets/add.svg'
import Sunny from '../../assets/sunny.svg'
import SunnyP from '../../assets/sunnyP.svg'
import Moon from '../../assets/moon.svg'
import MoonP from '../../assets/moonP.svg'
import { alertaExito, alertaError, alertaCargando, alertaPregunta } from '../../config/alert/alert';


function Workers() {

  const [searchValue, setSearchValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);
  const [isActive, setIsActive] = useState(false);
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

  const mockClients = [
    {
      id_user: 1,
      persons: {
        name: "Juan",
        lastname: "Pérez",
        rfc: "JUAP950101XYZ",
        genero: "Masculino",
      },
      email: "juan.perez@example.com",
      status: true,
      role: { id_role: 2 },
    },
    {
      id_user: 2,
      persons: {
        name: "María",
        lastname: "González",
        rfc: "MARGO960215ABC",
        genero: "Femenino",
      },
      email: "maria.gonzalez@example.com",
      status: false,
      role: { id_role: 2 },
    },
    {
      id_user: 2,
      persons: {
        name: "María",
        lastname: "González",
        rfc: "MARGO960215ABC",
        genero: "Femenino",
      },
      email: "maria.gonzalez@example.com",
      status: false,
      role: { id_role: 2 },
    },
  ];

  const getClients = () => {
    setLoading(true);

    setTimeout(() => {
      const usersWithRole2 = mockClients.filter(client => client.role.id_role === 2);
      setClients(usersWithRole2);
      setLoading(false);
    }, 1000);
  };

  /* const getClients = async () => {
  try {
    setLoading(true);
    const response = await AxiosClient({ url: "/users/", method: "GET" });
    console.log(response);
    if (response.status === "OK" && !response.error) {
      const usersWithRole2 = response.data.filter(user => user.role.id_role === 2);
      setClients(usersWithRole2);
    } else {
      throw new Error("Error fetching clients data");
    }
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
   };*/
  useEffect(() => {
    getClients();
  }, []);
  const refreshWorkers = () => {
    getClients();
  }
  const changeStatus = (cliente) => {
    setCurrentClient(cliente);
    console.log(cliente);

    Swal.fire({
      title: 'Cambiar status del trabajador',
      text: '¿Estás seguro de que quieres cambiar el status de este trabajador?',
      icon: 'question',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonColor: '#3F54D1',
      cancelButtonColor: '#D9D9D9',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await AxiosClient({
            url: `/users/${cliente.id_user}`,
            method: "PATCH",
            data: { status: !cliente.status }
          });

          Swal.fire({
            icon: 'success',
            title: 'Status del trabajador actualizado',
            text: 'El status del trabajador se ha actualizado correctamente.'
          });

          refreshWorkers();
          console.log(response);
        } catch (error) {
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el status del trabajador',
            text: 'Ocurrió un error al actualizar el status del trabajador. Por favor, inténtalo de nuevo.',
            confirmButtonColor: '#3F54D1'
          });
        }
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleStatusChange = (cliente) => {
    setCurrentClient(cliente);
    changeStatus(cliente);
  };


  const openModal = () => {
    setShowModal(true);
  };

  const openModalEdit = () => {
    setShowModalEdit(true);
  };

  const closeModalEdit = () => {
    setShowModalEdit(false);
  };

  const refreshClients = () => {
    getClients();
  };

  const handleButtonClick = () => {
    setIsActive(!isActive);
  };

  const columns = [
    { label: "Num.", accessor: null, render: (_, index) => index + 1 },
    { label: 'Nombre Completo', accessor: 'fullName', render: (client) => `${client.persons.name} ${client.persons.lastname}` },
    { label: 'Correo Electrónico', accessor: 'email' },
    { label: 'RFC', accessor: 'rfc', render: (client) => client.persons.rfc },
    { label: 'Genero', accessor: 'genero', render: (client) => client.persons.genero },
    {
      label: 'Status',
      accessor: 'status',
      render: (cliente) => (
        <button
          onClick={() => handleStatusChange(cliente)}
          className={`status-btn ${cliente.status === true ? 'active' : 'inactive'}`}
        >
          {cliente.status === true ? 'Activo' : 'Inactivo'}
        </button>
      )
    }, {
      label: 'Acción',
      render: (client) => (
        <div className="ml-2">
          <button
            onClick={() => {
              setEditingClient(client);
              openModalEdit();
            }}
            className="bg-white dark:bg-gray-800 custom-border-bottom custom-border-bottomDark hover-bg-custom-blueEdit hover-bg-custom-AddDark active:bg-custom-blue dark:active:bg-custom-blueDark  rounded-full px-2.5 py-1.5 group relative w-10 h-10"
          >
            {/* Icono normal */}
            <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-100 group-hover:opacity-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#3F54D1"
                className="dark:fill-white"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </span>
            {/* Icono al hacer hover */}
            <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-100 opacity-0 group-hover:opacity-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ffffff"
                className="dark:fill-gray-300"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </span>
          </button>
        </div>

      ),
    },
  ];

  return (
    <>
      <h2 className='text-3xl text-center font-quicksand'>Empleados
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

        <button type="button" onClick={openModal} className="ml-6 text-white custom-bluewhite hover-bg-custom-blueWhite rounded-lg text-sm px-2 me-2 bg-custom-AddDark hover-bg-custom-AddDark ">
          <img src={Add} alt="Más" className='w-10' />
        </button>

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

      <div className='flex flex-col items-center mt-5'>
        <TableComponent columns={columns} data={clients} PerPage={10} progress={loading} />
      </div>
      <div className=''>
        <AddWorkerModal
          showModal={showModal}
          closeModal={() => setShowModal(false)}
          refreshClients={refreshClients}
          className='w-1/2'
        />
      </div>

      <EditWorkerModal
        showModalEdit={showModalEdit}
        closeModalEdit={closeModalEdit}
        clienteEditando={editingClient || {}}
        refreshClients={refreshClients}
      />


    </>
  );
}

export default Workers;

