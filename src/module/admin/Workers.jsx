import React, { useState, useEffect } from 'react'
import AddWorker from '../../assets/addWorker.svg'
import { InputText } from 'primereact/inputtext'
import { InputSwitch } from 'primereact/inputswitch'
import AddWorkerModal from '../../components/AddWorkerModal'
import EditWorkerModal from '../../components/EditWorkerModal'
import TableComponent from '../../components/TableComponents'
import AxiosClient from '../../config/http-gateway/http-client'
import Swal from 'sweetalert2'
import Edit from '../../assets/edit.svg'


function Workers() {

  const [searchValue, setSearchValue] = useState('');
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [clients, setClients] = useState([]);
  const [currentClient, setCurrentClient] = useState(null);
  const [isActive, setIsActive] = useState(false);

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
      id_user: 3,
      persons: {
        name: "Carlos",
        lastname: "López",
        rfc: "CALO860123DEF",
        genero: "Masculino",
      },
      email: "carlos.lopez@example.com",
      status: true,
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
      label: 'Acciones',
      render: (client) => (
        <div>
          <button
            onClick={() => {
              setEditingClient(client);
              openModalEdit();
            }}
            className=" border border-blue-700 hover:bg-blue-800 active:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg px-2.5 py-1.5  "
          >
            <img src={Edit} className='' />
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      <p className='flex justify-center pb-10 text-2xl font-quicksand font-bold'>EMPLEADOS</p>
      <div className='flex justify-center pb-8'>
        <div className='flex flex-nowrap'>
          <div className="p-inputgroup">
            <span className="p-input-icon-left ">
              <i className="pi pi-search " style={{ color: '#3F54D1' }} />
            </span>
            <InputText
              className='pl-10  w-96 h-8 rounded-md '
              variant='filled'
              placeholder="Buscar..."
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <div className='px-5'>
            <a className='cursor-pointer' onClick={openModal}>
              <img src={AddWorker} className='w-11 ' />
            </a>
          </div>
          <div>
            <InputSwitch checked={checked} onChange={(e) => setChecked(e.value)} />
          </div>
        </div>
      </div>
      <div className='flex flex-col items-center'>
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

