import React, { useState, useEffect } from 'react';
import EditMedicamento from './EditMedicamento';
import AxiosClient from '../config/http-gateway/http-client';
import ClosePro from '../assets/closePro.svg';
import Close from '../assets/close.svg';

function OffCanvas({
    showOffcanvas,
    setShowOffcanvas,
    selectedMedicamento,
    refreshInventary,
    role
}) {
    const isDarkMode = document.documentElement.classList.contains('dark');
    const [showEditCutModal, setShowEditCutModal] = useState(false);

    const handleModalToggle = () => {
        setShowOffcanvas(false);
    };

    const handleEditCutModalToggle = () => {
        setShowEditCutModal(true);
    };

    return (
        <>
            {showOffcanvas && (
                <div
                    className={`fixed inset-0 flex items-center justify-center ${role === 'USER' ? 'detalles-de-ventas' : 'z-40'
                        }`}
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                    }}
                ></div>
            )}
            <div
                className={`fixed top-0 right-0 h-screen p-6 overflow-y-auto bg-white w-80 dark:bg-gray-900 transition-transform duration-300  ${showOffcanvas ? 'translate-x-0' : 'translate-x-full'
                    } ${role === 'USER' ? 'detalles-de-ventas' : 'z-40'}`}
                tabIndex="-1"
                aria-labelledby="drawer-right-label"
                role="dialog"
                aria-modal="true"
            >
                {selectedMedicamento && (
                    <>
                        {/* Contenedor superior: Fecha y botón de cerrar */}
                        <div className="flex justify-between items-start mb-4">
                            {/* Fecha */}
                            <div className="flex flex-col">
                                <h1 className="text-gray-800 font-semibold font-quicksand text-sm dark:text-gray-300">
                                    Fecha de Caducidad
                                </h1>
                                <p className="text-gray-600 text-sm font-quicksand dark:text-gray-300">
                                    {selectedMedicamento.date}
                                </p>
                            </div>

                            {/* Botón de cerrar */}
                            <button
                                onClick={handleModalToggle}
                                className="cursor-pointer"
                            >
                                <img
                                    src={isDarkMode ? ClosePro : Close}
                                    alt="Cerrar"
                                    className="w-6 h-6 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800"
                                />
                            </button>
                        </div>

                        {/* Imagen del medicamento */}
                        <div className="flex flex-col items-center mt-6 mb-4">
                            <img
                                src={selectedMedicamento.image}
                                className="rounded-lg mb-3 w-48 h-auto"
                                alt={selectedMedicamento.name}
                            />
                            <h2 className="font-bold text-2xl text-center font-quicksand custom-blue custom-blueDark">
                                {selectedMedicamento.name}
                            </h2>
                            <p className="text-base text-gray-800 font-quicksand dark:text-gray-300">{selectedMedicamento.marca}</p>
                        </div>

                        {/* Detalles del medicamento */}
                        <div className="space-y-4">
                            {/* Precio y Existencias */}
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-800 text-base font-quicksand dark:text-gray-300 text-left">Precio</p>
                                    <p className="font-bold text-2xl font-quicksand text-black dark:text-white text-left">${selectedMedicamento.price}</p>
                                </div>
                                <div>
                                    <p className="text-gray-800 text-base font-quicksand dark:text-gray-300 text-right">Existencias</p>
                                    <p className="font-bold text-2xl font-quicksand text-black dark:text-white text-center">{selectedMedicamento.stock}</p>
                                </div>
                            </div>

                            {/* Código y Clave */}
                            <div className="flex justify-between">
                                <div>
                                    <p className="text-gray-800 text-base font-quicksand dark:text-gray-300 text-left">Código</p>
                                    <p className="font-bold text-sm font-quicksand text-black dark:text-white text-left">{selectedMedicamento.codigo}</p>
                                </div>
                                <div>
                                    <p className="text-gray-800 text-base font-quicksand dark:text-gray-300 text-right">Clave</p>
                                    <p className="font-bold text-sm font-quicksand text-black dark:text-white text-right">{selectedMedicamento.clave}</p>
                                </div>
                            </div>

                            {/* Descripción */}
                            <div>
                                <p className="text-gray-800 text-base font-bold font-quicksand dark:text-gray-300 text-start mb-2">Descripción</p>
                                <p className="text-justify font-medium text-sm font-quicksand text-black dark:text-white">
                                    {selectedMedicamento.description}
                                </p>
                            </div>
                        </div>

                        {/* Todo el contenido del modal */}
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                            <button
                                onClick={handleModalToggle}
                                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-quicksand font-medium rounded-lg text-sm px-5 py-2.5 dark:text-white dark:hover:bg-gray-800"
                            >
                                Regresar
                            </button>
                            {role === 'ADMIN' && (
                                <button
                                    onClick={handleEditCutModalToggle}
                                    className="text-black bg-custom-edit hover-bg-custom-edit focus:ring-1 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-custom-editDark hover-bg-custom-editDark custom-Dark"
                                >
                                    Editar
                                </button>
                            )}
                        </div>

                    </>
                )}
            </div>
            {/* Edit Modal */}
            {showEditCutModal && (
                <EditMedicamento
                    showModalEdit={showEditCutModal}
                    selectedMedicamento={selectedMedicamento}
                    setShowEditCutModal={setShowEditCutModal}
                    setShowOffcanvas={setShowOffcanvas}
                    refreshInventary={refreshInventary}
                />
            )}
        </>
    );
}

export default OffCanvas;
