import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import Search from '../assets/search.svg';
import Trash from '../assets/trash.svg';
import RemoveProducts from '../assets/removeProducts.svg';
import MoreProducts from '../assets/moreProduct.svg';
import RealizarVentaModal2 from './RealizarVentaModal2';

const RealizarVentaModal = ({ showModal, closeModal }) => {
    const [dateTime, setDateTime] = useState("");
    const [productos, setProductos] = useState([]);
    const [metodoPago, setMetodoPago] = useState("");
    const [showModal2, setShowModal2] = useState(false);

    const productosSimulados = [
        { nombre: "Paracetamol", cantidad: 2, precio: 146.00 },
        { nombre: "Ibuprofeno", cantidad: 1, precio: 120.00 },
        { nombre: "Aspirina", cantidad: 3, precio: 95.00 },
        { nombre: "Amoxicilina", cantidad: 1, precio: 200.00 },
        { nombre: "Vitamina C", cantidad: 2, precio: 80.00 }
    ];

    const agregarProductoSimulado = (indice) => {
        const producto = productosSimulados[indice];
        setProductos(prevProductos => [...prevProductos, producto]);
    };

    useEffect(() => {
        const updateDateTime = () => {
            const now = new Date();
            const options = {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
            };
            setDateTime(now.toLocaleString('en-GB', options));
        };

        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleDelete = (index) => {
        const newProductos = [...productos];
        newProductos.splice(index, 1);
        setProductos(newProductos);
        event.stopPropagation();
    };

    const calcularTotal = () => {
        return productos.reduce((total, producto) => {
            return total + producto.precio * producto.cantidad;
        }, 0);
    };

    const handleMetodoPagoChange = (event) => {
        setMetodoPago(event.target.value);
    };

    const openModal = () => {
        setShowModal2(true);
    };

    return (
        <>
            <Sidebar visible={showModal} position="right" onHide={closeModal} style={{ width: "550px" }} modal={false}>
                <p className='flex justify-center pb-10 text-3xl font-quicksand font-bold custom-blue'>Realizar Ventas</p>
                <div className='flex justify-center w-full  '>
                    <form className="w-full relative">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-2.5 pointer-events-none">
                                <img src={Search} alt="Buscar" className='w-6 h-6' />
                            </div>
                            <input type="search" id="default-search" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-transparent rounded-lg bg-custom-grey dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-no-border" placeholder="Buscar" required />
                        </div>
                    </form>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-lg font-quicksand font-bold text-gray-900 pt-5">
                            Productos
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <p className="text-lg font-quicksand font-bold text-gray-900 pt-5">
                            {dateTime}
                        </p>
                    </div>
                </div>
                <div className="h-0.5 bg-blue-600"></div>
                <div className='overflow-y-auto' style={{ maxHeight: '200px', minHeight: '200px' }}>
                    {productos.map((producto, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200">
                            <div className='flex items-center flex-1 space-x-2'>
                                <a className='cursor-pointer' onClick={(event) => handleDelete(index, event)}>
                                    <img src={Trash} alt="Eliminar" className="w-6 h-6" />
                                </a>
                                <div>
                                    <p className="font-semibold text-gray-900">{producto.nombre}</p>
                                    <p className=" text-sm text-gray-900">Sin prescripción</p>
                                </div>
                            </div>
                            <div className='flex items-center flex-1 justify-center ml-3'>
                                <button onClick={() => handleDecrease(index)} className="p-1">
                                    <img src={RemoveProducts} alt="Disminuir" className="w-5 h-5" />
                                </button>
                                <p className="mx-2">{producto.cantidad}</p>
                                <button onClick={() => handleIncrease(index)} className="p-1">
                                    <img src={MoreProducts} alt="Aumentar" className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex items-center flex-1 justify-end mr-2">
                                <p className="font-semibold text-gray-900">${producto.precio.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-0.5 bg-blue-600"></div>
                <p className="text-lg font-quicksand font-bold custom-blue pt-2">
                    Metodo de Pago:
                </p>
                <div className='flex justify-between items-center pt-4'>
                    <div className='flex items-center mx-4'>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="metodoPago"
                                value="efectivo"
                                checked={metodoPago === "efectivo"}
                                className="mr-2 cursor-pointer custom-border-radius"
                                onChange={handleMetodoPagoChange}
                            />
                            <p className='font-semibold text-gray-900'>Efectivo</p>
                        </label>
                    </div>
                    <div className="flex items-center mx-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="metodoPago"
                                value="tarjeta"
                                checked={metodoPago === "tarjeta"}
                                className="mr-2 cursor-pointer custom-border-radius"
                                onChange={handleMetodoPagoChange}
                            />
                            <p className='font-semibold text-gray-900'>Transeferencia</p>
                        </label>
                    </div>
                </div>

                <div className='flex pt-5 justify-between '>
                    <div>
                        <p className="mx-4 text-2xl font-quicksand font-bold text-gray-900">
                            Total:
                        </p>

                    </div>
                    <div>
                        <p className="mx-4 text-2xl font-quicksand font-bold text-gray-900">
                            ${calcularTotal().toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between mt-7">
                    <div className="flex space-x-4">
                        <button
                            type="button"
                            onClick={""}
                            className="px-6 py-2 text-black rounded-lg hover:bg-gray-400 text-sm font-medium"
                        >
                            Cancelar
                        </button>

                    </div>
                    <div className='flex '>
                        <button
                            type="button"
                            onClick={openModal}
                            className="w-60 mx-4 bg-blue-600 text-white rounded-lg bg-custom-cian text-sm font-medium hover:bg-custom-cian-hover"
                        >
                            Continuar
                        </button>
                    </div>
                </div>
                <div>
                    <RealizarVentaModal2
                        showModal2={showModal2}
                        closeModal2={() => setShowModal2(false)}
                        className='w-1/2'
                        metodoPago={metodoPago}
                        total={calcularTotal()}
                    />
                </div>
                {/* <div className="pt-5">
                <p className="text-lg font-quicksand font-bold custom-blue">
                    Añadir Productos Simulados:
                </p>
                {productosSimulados.map((producto, index) => (
                    <button
                        key={index}
                        onClick={() => agregarProductoSimulado(index)}
                        className="block w-full bg-blue-500 text-white py-2 rounded mt-2"
                    >
                        {producto.nombre}
                    </button>
                ))}
            </div> */}
            </Sidebar>
        </>
    );
};

export default RealizarVentaModal;
