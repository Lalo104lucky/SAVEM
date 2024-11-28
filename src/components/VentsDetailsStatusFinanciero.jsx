import React, { useState } from "react";
import ClosePro from '../assets/closePro.svg'
import Close from '../assets/close.svg'
import CalendarM from '../assets/calendar_month.svg'
import CalendarMPro from '../assets/calendar_monthPro.svg'
import Calendar from '../assets/calendar_medi.svg'
import CalendarPro from '../assets/calendar_mediPro.svg'

const VentsDetailsStatusFinanciero = ({ showModaVentasStatus, closeModalVentsDetailsStatus }) => {

    const isDarkMode = document.documentElement.classList.contains('dark');
    const [mesSeleccionado, setMesSeleccionado] = useState("Enero");
    const [anioSeleccionado, setAnioSeleccionado] = useState(new Date().getFullYear().toString());

    const meses = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];

    // Generar rango de años dinámicamente (últimos 10 y próximos 10)
    const anioActual = new Date().getFullYear();
    const anios = Array.from({ length: 20 }, (_, i) => (anioActual - 10 + i).toString());

    return (
        showModaVentasStatus && (
            <div className="fixed inset-0 z-40 flex items-center justify-center"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro con opacidad del 50%
                }}
            >
                <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] p-4 overflow-y-auto"
                    style={{
                        maxHeight: "80vh", // Altura máxima del modal
                        overflowY: "auto", // Scroll vertical cuando el contenido exceda la altura
                    }}
                >
                    <div className="px-6 py-4">
                        <div className="flex justify-end">
                            <button
                                onClick={closeModalVentsDetailsStatus}
                                type="button"
                                className="text-sm font-medium text-gray-900 rounded-lg"
                            >
                                <img src={isDarkMode ? ClosePro : Close} alt="Cerrar" className='w-6 h-6 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800' />
                            </button>
                        </div>
                        <h1 className="font-semibold text-2xl text-center font-quicksand text-black mb-8">Status Financiero</h1>

                        <div className="flex space-x-4 justify-end">
                            <div className="flex flex-col">
                                <label className="mb-2 text-base text-left font-medium font-quicksand custom-blue custom-blueDark">Mes:</label>
                                <div className="flex items-center shadow-md bg-white dark:bg-gray-800 pl-2 rounded-l-lg">
                                    <img src={isDarkMode ? CalendarMPro : CalendarM} alt="" />
                                    <select
                                        value={mesSeleccionado}
                                        onChange={(e) => setMesSeleccionado(e.target.value)}
                                        className="w-full px-2 ml-2 py-2 bg-custom-bluelight border border-transparent rounded-r-lg shadow-md focus:outline-none font-quicksand dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-no-border"
                                    >
                                        {meses.map((mes, index) => (
                                            <option key={index} value={mes}>
                                                {mes}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <label className="mb-2 text-base text-left font-medium font-quicksand custom-blue custom-blueDark">Año:</label>
                                <div className="flex items-center shadow-md bg-white dark:bg-gray-800 pl-2 rounded-l-lg">
                                    <img src={isDarkMode ? CalendarPro : Calendar} alt="" />
                                    <select
                                        value={anioSeleccionado}
                                        onChange={(e) => setAnioSeleccionado(e.target.value)}
                                        className="w-full px-2 ml-2 py-2 bg-custom-bluelight border border-transparent rounded-r-lg shadow-md focus:outline-none font-quicksand dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-no-border"
                                    >
                                        {anios.map((anio, index) => (
                                            <option key={index} value={anio}>
                                                {anio}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto relative rounded-lg w-full max-h-[60vh] mt-4">
                            <table className="w-full text-black border-collapse shadow-md">
                                <thead className="text-white custom-bg-table">
                                    <tr>
                                        <th className="text-center p-4 border-b border-black capitalize font-quicksand">No. ventas Realizadas</th>
                                        <th className="text-center p-4 border-b border-black capitalize font-quicksand">Efectivo</th>
                                        <th className="text-center p-4 border-b border-black capitalize font-quicksand">Transferencia</th>
                                        <th className="text-center p-4 border-b border-black capitalize font-quicksand">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    <tr className="transition duration-200 border-b border-black font-quicksand text-black dark:text-gray-200">
                                        {/* Primera columna */}
                                        <td className="p-6 font-bold text-4xl">1200</td>

                                        {/* Segunda columna (Efectivo) */}
                                        <td className="p-4">
                                            <div className="flex flex-col items-center">
                                                <div className="text-sm font-light font-quicksand">Num. Ventas:</div>
                                                <div className="text-lg font-bold font-quicksand">152</div>
                                                <div className="text-sm font-light mt-2 font-quicksand">Total:</div>
                                                <div className="text-lg font-bold font-quicksand">152</div>
                                            </div>
                                        </td>

                                        {/* Tercera columna (Transferencia) */}
                                        <td className="p-4">
                                            <div className="flex flex-col items-center">
                                                <div className="text-sm font-light font-quicksand">Num. Ventas:</div>
                                                <div className="text-lg font-bold font-quicksand">152</div>
                                                <div className="text-sm font-light mt-2 font-quicksand">Total:</div>
                                                <div className="text-lg font-bold font-quicksand">152</div>
                                            </div>
                                        </td>

                                        {/* Cuarta columna (Total) */}
                                        <td className="p-6 font-bold text-4xl font-quicksand">$20,000</td>
                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default VentsDetailsStatusFinanciero