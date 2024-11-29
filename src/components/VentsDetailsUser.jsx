import React from 'react'
import ClosePro from '../assets/closePro.svg'
import Close from '../assets/close.svg'

const VentsDetailsUser = ({ showModaVentasDetail, closeModalVentasDetail, venta }) => {

    const isDarkMode = document.documentElement.classList.contains('dark');
    return (
        showModaVentasDetail && (
            <div className="fixed inset-0 detalles-de-ventas flex items-center justify-center"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.5)", // Fondo negro con opacidad del 50%
                }}
            >
                <div className="relative bg-white rounded-lg shadow-lg dark:bg-gray-900 w-full max-w-4xl max-h-[90vh] p-4 overflow-y-auto"
                    style={{
                        maxHeight: "80vh", // Altura máxima del modal
                        overflowY: "auto",
                    }}
                >
                    <div className="px-6 py-4">
                        <div className="flex justify-end">
                            <button
                                onClick={closeModalVentasDetail}
                                type="button"
                                className="text-sm font-medium text-gray-900 rounded-lg"
                            >
                                <img src={isDarkMode ? ClosePro : Close} alt="Cerrar" className='w-6 h-6 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800' />
                            </button>
                        </div>
                        <h1 className="font-semibold text-2xl text-center font-quicksand text-black mb-8">Detalles de Ventas</h1>
                        {venta && (
                            <div className="mb-6">
                                <div className="grid grid-cols-2 gap-6 text-m">
                                    <div>
                                        <p className='font-quicksand text-black dark:text-white'><strong>No. Venta:</strong> {venta.noVenta}</p>
                                        <p className='font-quicksand text-black dark:text-white'><strong>Fecha:</strong> {venta.fechaVenta}</p>
                                        <p className='font-quicksand text-black dark:text-white'><strong>Vendedor:</strong> {venta.vendedor}</p>
                                    </div>
                                    <div>
                                        <p className='font-quicksand text-black dark:text-white'><strong>Tipo de Pago:</strong> {venta.tipoPago}</p>
                                        <p className='font-quicksand text-black dark:text-white'><strong>Total:</strong> ${venta.total}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="overflow-x-auto relative rounded-lg w-full max-h-[60vh]">
                            <table className="w-full text-black border-collapse">
                                <thead className="text-white custom-bg-table">
                                    <tr>
                                        <th className="text-left p-3 border-b border-black capitalize font-quicksand text-black dark:text-white">Clave</th>
                                        <th className="text-left p-3 border-b border-black capitalize font-quicksand text-black dark:text-white">Medicamento</th>
                                        <th className="text-left p-3 border-b border-black capitalize font-quicksand text-black dark:text-white">Marca</th>
                                        <th className="text-left p-3 border-b border-black capitalize font-quicksand text-black dark:text-white">Cantidad</th>
                                        <th className="text-left p-3 border-b border-black capitalize font-quicksand text-black dark:text-white">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="text-left">
                                    {venta?.productos.map((producto, index) => (
                                        <tr key={index} className="transition duration-200 border-b border-black font-quicksand text-black dark:text-gray-200 ">
                                            <td className="p-3">{producto.clave}</td>
                                            <td className="p-3">{producto.medicamento}</td>
                                            <td className="p-3">{producto.marca}</td>
                                            <td className="p-3">{producto.cantidad}</td>
                                            <td className="p-3">${producto.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default VentsDetailsUser