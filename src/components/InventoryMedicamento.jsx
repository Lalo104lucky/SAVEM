import React from 'react';

function InventoryMedicamento({ selectedMedicamento, setShowOffcanvas, handleEditModalToggle }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-1 effect-shadow-input overflow-hidden">
      <div className="flex justify-between">
        <div className="flex-1 flex items-center px-2 py-1 bg-gray-100 custom-bluewhite">
          <span className="text-xs font-quicksand text-black dark:text-white">
            {selectedMedicamento.categoria}
          </span>
        </div>
        <div className="flex-1 flex justify-end items-center px-2 py-1 bg-gray-100 custom-blue-cyan">
          <span className="text-xs font-quicksand custom-green dark:text-green-700">
            {selectedMedicamento.tipo}
          </span>
        </div>
      </div>

      <img
        src={selectedMedicamento.image}
        className="rounded-md w-36 h-32 object-cover mx-auto py-2"
        alt={selectedMedicamento.name}
      />

      <div className="px-4 pb-2">
        <h2 className="text-lg font-bold custom-blue font-quicksand">{selectedMedicamento.name}</h2>
        <p className="text-sm text-gray-600 font-quicksand">{selectedMedicamento.date}</p>

        <div className="flex justify-between items-center mt-2">
          <div className='px-2'>
            <p className="flex-1 flex text-xl font-bold font-quicksand text-gray-900 justify-center">{selectedMedicamento.stock}</p>
            <p className="flex-1 flex text-sm font-quicksand text-gray-500">Existencias</p>
          </div>
          <div className='px-2'>
            <p className="flex-1 flex text-xl font-bold font-quicksand text-gray-900 justify-center">${selectedMedicamento.price}</p>
            <p className="flex-1 flex text-sm font-quicksand text-gray-500">Precio</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryMedicamento;
