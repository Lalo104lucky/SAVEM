import React, { useState, useEffect } from 'react';
import { Sidebar } from 'primereact/sidebar';
import Search from '../assets/search.svg';
import SearchPro from '../assets/searchPro.svg';
import Trash from '../assets/trash.svg';
import TrashPro from '../assets/trashPro.svg';
import RemoveProducts from '../assets/removeProducts.svg';
import RemoveProductsPro from '../assets/removeProductsPro.svg';
import MoreProducts from '../assets/moreProduct.svg';
import MoreProductsPro from '../assets/moreProductPro.svg';
import RealizarVentaModal2 from './RealizarVentaModal2';
import Close from '../assets/close.svg';
import ClosePro from '../assets/closePro.svg';


const RealizarVentaModal = ({ showModal, closeModal }) => {
    const [dateTime, setDateTime] = useState("");
    const [productos, setProductos] = useState([]);
    const [metodoPago, setMetodoPago] = useState("");
    const [showModal2, setShowModal2] = useState(false);
    const isDarkMode = document.documentElement.classList.contains('dark');

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
            <Sidebar visible={showModal} position="right" onHide={closeModal}
                style={{ width: "500px" }} baseZIndex={1000} modal={false} showCloseIcon={false}
                dismissable={false} appendTo={document.body} className="dark:bg-gray-900 relative"
            >
                <div className="flex justify-end">
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-sm font-medium text-gray-900 rounded-lg"
                >
                  <img src={isDarkMode ? ClosePro : Close} alt="Cerrar" className='w-6 h-6 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-800' />
                </button>
              </div>
                <p className='flex justify-center pb-10 text-3xl font-quicksand custom-blue custom-blueDark'>Realizar Ventas</p>
                <div className='flex justify-center w-full'>
                    <form className="flex-grow w-full  relative">
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                            Search
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                                <img src={isDarkMode ? SearchPro : Search} alt="Buscar" className="w-6 h-6" />
                            </div>
                            <input
                                type="search"
                                id="default-search"
                                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-transparent rounded-lg bg-custom-grey dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white input-no-border"
                                placeholder="Buscar"
                                required
                            />
                        </div>
                    </form>
                </div>
                <div className="flex justify-between">
                    <div>
                        <p className="text-lg text-gray-800 font-quicksand font-semibold dark:text-gray-300 pt-5">
                            Productos
                        </p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <p className="text-lg text-gray-800 font-quicksand font-semibold dark:text-gray-300 pt-5">
                            {dateTime}
                        </p>
                    </div>
                </div>
                <div className="h-0.5 bg-custom-blue bg-custom-blueDark"></div>
                <div className='overflow-y-auto' style={{ maxHeight: '270px', minHeight: '270px' }}>
                    {productos.map((producto, index) => (
                        <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-800">
                            <div className='flex items-center flex-1 space-x-2'>
                                <a className='cursor-pointer' onClick={(event) => handleDelete(index, event)}>
                                    <img src={isDarkMode ? TrashPro : Trash} alt="Eliminar" className="w-6 h-6" />
                                </a>
                                <div>
                                    <p className="font-semibold text-gray-900 dark:text-gray-300">{producto.nombre}</p>
                                    <p className="text-sm text-gray-900 dark:text-gray-300">Sin prescripción</p>
                                </div>
                            </div>
                            <div className='flex items-center flex-1 justify-center ml-3'>
                                <button onClick={() => handleDecrease(index)} className="p-1">
                                    <img src={isDarkMode ? RemoveProducts : RemoveProductsPro} alt="Disminuir" className="w-5 h-5" />
                                </button>
                                <p className="mx-2 font-quicksand text-gray-800  dark:text-gray-300">{producto.cantidad}</p>
                                <button onClick={() => handleIncrease(index)} className="p-1">
                                    <img src={isDarkMode ? MoreProducts : MoreProductsPro} alt="Aumentar" className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex items-center flex-1 justify-end mr-2">
                                <p className="font-semibold text-gray-900 font-quicksand dark:text-gray-300">${producto.precio.toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="h-0.5 bg-custom-blue bg-custom-blueDark"></div>
                <p className="text-lg font-bold font-quicksand custom-blue custom-blueDark pt-2">
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
                                className="mr-2 cursor-pointer custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700"
                                onChange={handleMetodoPagoChange}
                            />
                            <p className='font-semibold text-gray-900 dark:text-white cursor-pointer'>Efectivo</p>
                        </label>
                    </div>
                    <div className="flex items-center mx-4">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="metodoPago"
                                value="tarjeta"
                                checked={metodoPago === "tarjeta"}
                                className="mr-2 cursor-pointer custom-blue bg-white custom-border-blue focus-custom-blueC dark:bg-gray-800 dark:border-gray-700"
                                onChange={handleMetodoPagoChange}
                            />
                            <p className='font-semibold text-gray-900 dark:text-white cursor-pointer'>Transeferencia</p>
                        </label>
                    </div>
                </div>

                <div className='flex pt-5 justify-between '>
                    <div>
                        <p className="mx-4 text-2xl font-quicksand font-bold text-gray-900 dark:text-white">
                            Total:
                        </p>

                    </div>
                    <div>
                        <p className="mx-4 text-2xl font-quicksand font-bold text-gray-900 dark:text-white">
                            ${calcularTotal().toFixed(2)}
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    <div className="flex px-6">
                        <button
                            type="button"
                            className="items-center text-gray-500 hover:text-gray-700 hover:bg-gray-100 font-quicksand font-medium rounded-lg text-sm px-6 py-2.5 dark:text-white dark:hover:bg-gray-800"
                        >
                            Cancelar
                        </button>

                    </div>
                    <div className='flex px-6'>
                        <button
                            type="submit"
                            onClick={openModal}
                            className="text-white bg-custom-cyan hover-bg-custom-cyanBlack focus:ring-1 focus:outline-none focus:ring-teal-300 font-medium rounded-lg text-sm px-6 py-2.5 bg-custom-cyanDark hover-bg-custom-cyanDark"
                        >
                            Guardar
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
                </div>   */}
            </Sidebar>
        </>
    );
};

export default RealizarVentaModal;
