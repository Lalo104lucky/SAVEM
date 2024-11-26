import React, { useState } from 'react'
import FarmaVida from '../assets/img/logoFarma.png';
import ClosePro from '../assets/closePro.svg';
import EditPro from '../assets/editPro.svg';
import PassPro from '../assets/passPro.svg';
import Close from '../assets/close.svg';
import EditH from '../assets/editH.svg';
import Pass from '../assets/pass.svg';
import EditInformation from './EditInformation';
import ChangePasswordModal from './ChangePasswordModal';

function Profile({ isOpen, onClose }) {
  if (!isOpen) return null; // Retorna null si el modal no debe mostrarse
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const isDarkMode = document.documentElement.classList.contains('dark');

  const handleEditModalToggle = () => {
    setShowModalEdit(true); // Activa el modal de edición
  };

  const handleCerrarModalEdit = () => {
    setShowModalEdit(false); // Cierra el modal de edición
  };

  const handleOpenChangePasswordModal = () => {
    setShowChangePasswordModal(true); // Abre el modal de cambio de contraseña
  };

  const handleCloseChangePasswordModal = () => {
    setShowChangePasswordModal(false); // Cierra el modal de cambio de contraseña
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 flex items-center justify-center"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Contenedor del modal */}
        <div
          className="flex absolute"
          style={{
            top: "4rem", // Ajusta la distancia desde la parte superior
            left: "15rem", // Ajusta la distancia desde el menú lateral
          }}
        >
          {/* Sección izquierda (logo y fondo azul) */}
          <div className="bg-custom-blue rounded-l-lg shadow-lg w-60 flex items-center ">
            <img
              src={FarmaVida}
              alt="Logo FarmaVida"
              className="justify-center mx-auto w-48"
            />
          </div>

          {/* Sección derecha (contenido del perfil) */}
          <div className="bg-white rounded-r-lg shadow-lg max-w-lg w-full relative p-4 dark:bg-gray-900">
            {/* Botón de cierre */}
            <div className="grid justify-end ">
              <button onClick={onClose} className="cursor-pointer">
                <img src={isDarkMode ? ClosePro : Close} alt="Cerrar" className="w-6 h-6 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800" />
              </button>
            </div>

            {/* Contenido del modal */}
            <div className="space-y-2 ">
              <h2 className="text-2xl font-bold font-quicksand custom-blue custom-blueDark">Perfil</h2>
              <p className="text-lg text-gray-800 font-semibold font-quicksand dark:text-gray-300">Maria Fernanda Lopez</p>
              <p className="text-base text-gray-600 font-quicksand dark:text-gray-300">maria.lopez@empresa.com</p>
              <p className="text-base text-gray-600 font-quicksand dark:text-gray-300">RFC: LOMF850612M45</p>
              <p className="text-base text-gray-600 font-quicksand dark:text-gray-300">Femenino</p>
            </div>

            {/* Botones de acción */}
            <div className="flex justify-between mt-6">
              <button onClick={handleEditModalToggle} className="flex items-center custom-blue hover:text-blue-800 hover:bg-gray-100 font-quicksand rounded-lg text-base px-5 py-2.5 custom-blueDark dark:hover:bg-gray-800">
                <img
                  src={isDarkMode ? EditPro : EditH}
                  alt="Editar Información"
                  className="w-5 h-5 mr-2"
                />
                Editar Información
              </button>
              <button onClick={handleOpenChangePasswordModal} className="flex items-center custom-blue hover:text-blue-800 hover:bg-gray-100 font-quicksand rounded-lg text-base px-5 py-2.5 custom-blueDark dark:hover:bg-gray-800">
                <img
                  src={isDarkMode ? PassPro : Pass}
                  alt="Cambiar Contraseña"
                  className="w-5 h-5 mr-2"
                />
                Cambiar Contraseña
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModalEdit && (
        <EditInformation
          showModalAdd={showModalEdit}
          handleCerrarModalAdd={handleCerrarModalEdit}
        />
      )}

      {showChangePasswordModal && (
        <ChangePasswordModal
          showModalAdd={showChangePasswordModal}
          handleCerrarModalAdd={handleCloseChangePasswordModal}
        />
      )}
    </>
  );
}

export default Profile;
