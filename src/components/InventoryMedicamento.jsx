import React from 'react';


function InventoryMedicamento({ selectedMedicamento, setShowOffcanvas, handleEditModalToggle  }) {

  const isLowStock = selectedMedicamento.stock < 51;
  return (
    <div
      className={`max-w-sm bg-white border ${isLowStock ? 'border-red-500' : 'border-gray-200'
        } rounded-lg hover:bg-gray-100 shadow dark:bg-gray-800 ${isLowStock ? 'dark:border-red-800' : 'dark:border-gray-700'
        } dark:hover:bg-gray-700 m-1 effect-shadow-input overflow-hidden cursor-pointer`}
        onClick={() => {
          setShowOffcanvas(true); // Abre el OffCanvas
          handleEditModalToggle(selectedMedicamento); // Pasa el medicamento seleccionado
        }}
    >
      <div className="flex justify-between">
        <div className="flex-1 flex items-center px-2 py-1 bg-gray-100 custom-bluewhite bg-custom-AddDark">
          <span className="text-sm font-medium font-quicksand text-black dark:text-white ">
            {selectedMedicamento.categoria}
          </span>
        </div>
        <div className="flex-1 flex justify-end items-center px-2 py-1 bg-gray-100 custom-blue-cyan bg-custom-cyanDark">
          <span className="text-sm font-medium font-quicksand custom-green dark:text-white">
            {selectedMedicamento.tipo}
          </span>
        </div>
      </div>

      <img
        src={selectedMedicamento.image}
        className="rounded-lg w-36 h-32 object-cover mx-auto py-2"
        alt={selectedMedicamento.name}
      />

      <div className="px-4 pb-2">
        <h2 className="text-lg font-bold custom-blue font-quicksand custom-blueDark">{selectedMedicamento.name}</h2>
        <p className="text-sm text-gray-600 font-quicksand dark:text-gray-200">{selectedMedicamento.date}</p>

        <div className="flex justify-between items-center mt-2">
          <div className='px-2'>
            <p
              className={`flex-1 flex text-xl font-bold font-quicksand ${isLowStock ? 'text-red-500' : 'text-gray-900'
                } justify-center dark:${isLowStock ? 'text-red-800' : 'text-white'}`}
            >
              {selectedMedicamento.stock}
            </p>
            <p
              className={`flex-1 flex text-sm font-quicksand ${isLowStock ? 'text-red-500' : 'text-gray-500'
                } dark:${isLowStock ? 'text-red-800' : 'text-gray-200'}`}
            >
              Existencias
            </p>
          </div>
          <div className='px-2'>
            <p className="flex-1 flex text-xl font-bold font-quicksand text-gray-900 justify-center dark:text-white">${selectedMedicamento.price}</p>
            <p className="flex-1 flex text-sm font-quicksand text-gray-500 dark:text-gray-200">Precio</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InventoryMedicamento;
