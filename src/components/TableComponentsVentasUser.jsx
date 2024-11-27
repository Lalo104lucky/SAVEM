import React, { useState} from 'react'
import NextRight from '../assets/nextRight.svg';
import NextLeft from '../assets/nextLeft.svg';

const TableComponentsVentasUser = ({ columns, data, PerPage }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [ventasPerPage] = useState(PerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);
    const indexOfLastVentas = currentPage * ventasPerPage;
    const indexOfFirstVentas = indexOfLastVentas - ventasPerPage;
    const currentVentas = data.slice(indexOfFirstVentas, indexOfLastVentas);


    if (data.length === 0) {
        return (
            <>
                <div className="text-center text-gray-500 py-8">
                    No hay registros para mostrar
                </div>
            </>
        );
    }

    return (
        <div className='flex justify-center pt-5'>
            <div className="overflow-x-auto relative rounded-lg w-full">
                <table className="w-full text-black">
                    <thead className="text-white custom-bg-table ">
                        <tr>
                            {columns.map(({ label }, index) => (
                                <th key={index} scope="col" className="text-left p-3 border-b border-black capitalize">
                                    {label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="text-left">
                        {currentVentas.map((item, index) => (
                            <tr key={index} className="text-left transition duration-200 border-b border-black ">
                                {columns.map(({ accessor, render }, columnIndex) => (
                                    <td key={columnIndex} className="text-left p-2">
                                        {render ? render(item, index) : item[accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="absolute inset-x-0 bottom-2 h-16 flex justify-center items-center mt-5">
                <div className="pagination flex items-center justify-center">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={currentPage === 1 ? 'disabled' : ''}
                    >
                        <img src={NextLeft} className='w-5'/>
                    </button>
                    {Array.from(
                        { length: Math.ceil(data.length / ventasPerPage) },
                        (_, i) => (
                            <button
                                key={i}
                                onClick={() => paginate(i + 1)}
                                className={currentPage === i + 1 ? 'active' : ''}
                            >
                                {i + 1}
                            </button>
                        )
                    )}
                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === Math.ceil(data.length / ventasPerPage)}
                        className={
                            currentPage === Math.ceil(data.length / ventasPerPage)
                                ? 'disabled'
                                : ''
                        }
                    >
                        <img src={NextRight} className='w-5' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TableComponentsVentasUser