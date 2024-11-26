import React, { useState } from 'react'
import Swal from 'sweetalert2';
import { useFormik } from 'formik';

const RealizarVentaModal2 = ({ showModal2, closeModal2, metodoPago, total }) => {

    const [pagoCon, setPagoCon] = useState('');
    const [cambio, setCambio] = useState(0);
    const [isPagoInsuficiente, setIsPagoInsuficiente] = useState(false);
    const [referencia, setReferencia] = useState('');

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

        setIsPagoInsuficiente(newCambio < 0 ||  isNaN(newCambio));
    };

    const isCobrarDisabled = isPagoInsuficiente || pagoCon === '';


    return (
        showModal2 && (
            <div className="fixed inset-0 flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-96">
                    <p className="font-bold text-2xl text-center font-quicksand text-black pb-6" style={{ color: 'black', }}>
                        {metodoPago === "efectivo" ? "Pago en Efectivo" : "Pago por Transferencia"}
                    </p>

                    <p className="text-center text-3xl font-quicksand font-bold text-gray-800 mb-6">
                        ${total.toFixed(2)}
                    </p>

                    {metodoPago === "efectivo" ? (
                        <div>
                            <div className="flex items-center mb-4">
                                <label className="block custom-blue w-40">Paga con:</label>
                                <label className='custom-blue '>$</label>
                                <input
                                    type="number"
                                    placeholder=""
                                    className="w-full p-2 border-0 rounded custom-blue focus:ring-0 focus:border-none"
                                    min="0"
                                    value={pagoCon}
                                    onChange={handlePagoConChange}
                                />
                            </div>
                            <div className="flex mb-4">
                                <div className='flex'>
                                    <label className="block custom-blue">Su Cambio:</label>
                                </div>
                                <div className='flex'>
                                    <label className={`custom-blue pl-5 ${isPagoInsuficiente ? 'text-red-500' : ''}`}>$ {cambio.toFixed(2)}</label>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-4">
                                <label className="block custom-blue">Referencia:</label>
                                <div className='flex'>
                                    <input
                                        type="text"
                                        placeholder="Número de aprobación (Visa, etc.)"
                                        className="w-full p-2 border-0 rounded custom-blue "
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="flex justify-between mt-6">
                        <button
                            onClick={handleCancelClick}
                            className="px-4 py-2  text-gray-700 rounded hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            className="px-4 py-2 bg-custom-cyan text-white rounded "
                            onClick={""}
                            disabled={isCobrarDisabled}
                        >
                            Cobrar
                        </button>
                    </div>
                </div>
            </div>
        )
    )
}

export default RealizarVentaModal2