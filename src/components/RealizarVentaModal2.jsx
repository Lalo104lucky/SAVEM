import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import Close from '../assets/close.svg'
import ClosePro from '../assets/closePro.svg'

const RealizarVentaModal2 = ({ showModal2, closeModal2, metodoPago, total }) => {

    const [pagoCon, setPagoCon] = useState('');
    const [cambio, setCambio] = useState(0);
    const [isPagoInsuficiente, setIsPagoInsuficiente] = useState(false);
    const [referencia, setReferencia] = useState('');
    const isDarkMode = document.documentElement.classList.contains('dark');

    const handleCancelClick = (event) => {
        event.stopPropagation();
        setPagoCon('');
        setCambio(0);
        setIsPagoInsuficiente(false);
        closeModal2();
    };

    const handlePagoConChange = (e) => {
        const value = e.target.value;
        const numericValue = value === '' ? 0 : parseFloat(value);
        setPagoCon(numericValue);

        const newCambio = numericValue - total;
        setCambio(newCambio);

        setIsPagoInsuficiente(newCambio < 0 || isNaN(newCambio));
    };

    const isCobrarDisabled = isPagoInsuficiente || pagoCon === '';


    return (
        showModal2 && (
            <div className="fixed inset-0 z-40 flex items-center justify-center"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro con opacidad del 50%
                }}
            >
                <div className="bg-white rounded-lg shadow-lg p-8 w-96 dark:bg-gray-900">
                    <p className="font-bold text-2xl text-center font-quicksand text-black pb-6 dark:text-white">
                        {metodoPago === "efectivo" ? "Pago en Efectivo" : "Pago por Transferencia"}
                    </p>

                    <p className="text-center text-3xl font-quicksand font-bold text-gray-800 mb-6 dark:text-white">
                        ${total.toFixed(2)}
                    </p>

                    {metodoPago === "efectivo" ? (
                        <div>
                            <div className="flex items-center mb-4">
                                <label className="block custom-blue w-40 text-lg font-quicksand custom-blueDark">Paga con:</label>
                                <label className='custom-blue text-lg font-quicksand custom-blueDark px-2'>$</label>
                                <input
                                    type="number"
                                    placeholder=""
                                    className="font-quicksand bg-custom-grey border border-transparent text-lg rounded-lg w-40 h-9 pl-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-no-border"
                                    min="0"
                                    value={pagoCon}
                                    onChange={handlePagoConChange}
                                />
                            </div>
                            <div className="flex mb-4">
                                <div className='flex'>
                                    <label className="block custom-blue w-40 text-lg font-quicksand custom-blueDark">Su Cambio:</label>
                                </div>
                                <div className='flex'>
                                    <label className={`custom-blue text-lg font-quicksand custom-blueDark ${isPagoInsuficiente ? 'text-red-500' : ''}`}>$ {cambio.toFixed(2)}</label>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <label className="block custom-blue text-lg font-quicksand custom-blueDark">Referencia:</label>
                                <div className='flex pt-4'>
                                    <input
                                        type="text"
                                        placeholder="Número de aprobación (Visa, etc.)"
                                        className="font-quicksand bg-custom-grey border border-transparent text-lg rounded-lg w-full h-9 pl-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-no-border"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-center items-center mt-6">
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={handleCancelClick}
                                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-quicksand font-medium rounded-lg text-sm px-5 py-2.5 dark:text-white dark:hover:bg-gray-800"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={""}
                                disabled={isCobrarDisabled}
                                className="text-white bg-custom-cyan hover-bg-custom-cyanBlack focus:ring-1 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-5 py-2.5 bg-custom-cyanDark hover-bg-custom-cyanDark"
                            >
                                Cobrar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default RealizarVentaModal2