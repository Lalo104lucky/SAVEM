import React from 'react'
import Equis from '../assets/equis.svg'
import ClosePro from '../assets/closePro.svg'
import Close from '../assets/close.svg'

const VentsDetailsUser = ({ showModaVentasDetail, closeModalVentasDetail, venta }) => {

    const isDarkMode = document.documentElement.classList.contains('dark');
    return (
        showModaVentasDetail && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 w-full max-w-4xl max-h-[90vh] p-8 overflow-y-auto" >
                    <div className="grid justify-end">
                        <a className='cursor-pointer' onClick={closeModalVentasDetail}>
                            <img src={Equis} className='w-7' />
                        </a>
                    </div>
                    <p className="font-bold text-2xl text-center mb-8">Detalles de Ventas</p>
                    {venta && (
                        <div className="mb-6">
                            <div className="grid grid-cols-2 gap-6 text-m">
                                <div>
                                    <p><strong>No. Venta:</strong> {venta.noVenta}</p>
                                    <p><strong>Fecha:</strong> {venta.fechaVenta}</p>
                                    <p><strong>Vendedor:</strong> {venta.vendedor}</p>
                                </div>
                                <div>
                                    <p><strong>Tipo de Pago:</strong> {venta.tipoPago}</p>
                                    <p><strong>Total:</strong> ${venta.total}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="overflow-x-auto relative rounded-lg w-full max-h-[60vh]">
                        <table className="w-full text-black border-collapse">
                            <thead className="text-white custom-bg-table">
                                <tr>
                                    <th className="text-left p-3 border-b border-black capitalize">Clave</th>
                                    <th className="text-left p-3 border-b border-black capitalize">Medicamento</th>
                                    <th className="text-left p-3 border-b border-black capitalize">Marca</th>
                                    <th className="text-left p-3 border-b border-black capitalize">Cantidad</th>
                                    <th className="text-left p-3 border-b border-black capitalize">Total</th>
                                </tr>
                            </thead>
                            <tbody className="text-left">
                                {venta?.productos.map((producto, index) => (
                                    <tr key={index} className="transition duration-200 border-b border-black">
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
        )
    )
}

export default VentsDetailsUser