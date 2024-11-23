import React, { useState, useEffect } from 'react';
import EditCutModal from './InventoryMedicamento';
import TableComponent from './TableComponent2';
import AxiosClient from '../config/http-gateway/http-client';

function OffCanvas({
    showOffcanvas,
    setShowOffcanvas,
    selectedCut,
    refreshInventary,
    updateSelectedCut
}) {
    const [showEditCutModal, setShowEditCutModal] = useState(false);
    const [inventoryHistory, setinventoryHistory] = useState([]);
    const [loading, setLoading] = useState(false);

    const isCutSelected = selectedCut !== null;
    const handleModalToggle = () => {
        setShowOffcanvas(false);
    }
    const handleEditCutModalToggle = () => {
        setShowEditCutModal(true);
        setShowOffcanvas(false);
    }
    const getInventoryHistory = async () => {
        try {
          setLoading(true);
          const response = await AxiosClient({ url: "/inventoryHistory/", method: "GET" });
          console.log("datos", response.data);
          if (response.status === "OK" && !response.error) {
            const formattedData = response.data.map((item) => ({
              ...item,
              modification_date: new Date(item.modification_date).toISOString().split('T')[0],
            }));
            setinventoryHistory(formattedData);
          } else {
            throw new Error("Error");
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };
    useEffect(() => {
        getInventoryHistory();
    }, []);
    const filteredData = inventoryHistory.filter((item) => item.id_meat === selectedCut.id_meat);

    const columns = [
        { label: 'Modificación',  accessor: 'modification_date'  },
        { label: 'Costo', accessor: 'cost' },
        { label: 'Kilos', accessor: 'kg' },
    ]
    const refresh = () => {
        getInventoryHistory();
    };
    return (
        <>
            {showOffcanvas && <div className="fixed inset-0 z-40 bg-black bg-opacity-25" onClick={() => setShowOffcanvas(false)}></div>}
            <div
                id="drawer-right-example"
                className={`fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform duration-300 ${showOffcanvas ? 'translate-x-0' : 'translate-x-full'
                    }`}
                tabIndex="-1"
                aria-labelledby="drawer-right-label"
                role="dialog"
                aria-modal="true"
            >
                <div className="mb-4 ">
                    <div className="grid justify-end">
                        <button
                            type="button"
                            onClick={handleModalToggle}
                            aria-controls="drawer-right-example"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <i className="fas fa-times"></i>
                            <span className="sr-only">Cerrar menú</span>
                        </button>
                    </div>
                </div>
                {isCutSelected && (
                    <div>
                        <div className='flex flex-col items-center mb-2'>
                            <img src={selectedCut.image} className="rounded-t-lg img-offcanvas mb-1" alt="" width="" />
                        </div>
                        <div className='flex flex-row'>
                            <div className=''>
                                <p className="font-bold text-4xl ">{selectedCut.meatName}</p>
                            </div>
                            <div className=''>
                                <button
                                    type="button"
                                    onClick={handleEditCutModalToggle}
                                    className="text-red-700 hover:text-red  focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-base px-2 py-1.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                ><i className="fa-solid fa-pen"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {isCutSelected && (
                    <div className='mb-5'>
                        <div className="col-span-10 gap-24 flex items-center mb-2">
                            <div className="col-span-5 ">
                                <p className="font-light text-lg ">Kilo(s)</p>
                                <p className="font-semibold text-3xl ">{selectedCut.kg}</p>
                            </div>
                            <div className="col-span-5">
                                <p className="font-light text-lg ">Precio</p>
                                <p className="font-semibold text-3xl ">${selectedCut.cost}</p>
                            </div>
                        </div>
                        <p className="font-medium text-normal text-justify mb-3">{selectedCut.description}</p>
                        <p className="font-semibold text-2xl text-center mb-1">Historial de lo que me encuentro</p>
                        <TableComponent columns={columns} data={filteredData} progress={loading} />
                    </div>
                )}

            </div>
            <EditCutModal
                showModalEdit={showEditCutModal}
                selectedCut={selectedCut}
                refresh={refresh}
                setShowEditCutModal={setShowEditCutModal}
                setShowOffcanvas={setShowOffcanvas}
                refreshInventary={refreshInventary}
                updateSelectedCut={updateSelectedCut}
            />
        </>
    );
}

export default OffCanvas;
