import React from 'react';

const TableComponent2 = ({ columns, data }) => {
  if (data.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
         No hay registros para mostrar
      </div>
    );
  }

  return (
    <div className="overflow-x-auto relative rounded-lg">
      <table className="w-full text-black">
        <thead className="text-white bg-red text-left">
          <tr>
            {columns.map(({ label }, index) => (
              <th key={index} scope="col" className="text-left p-3">
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-left">
          {data.map((item, index) => (
            <tr key={index} className="text-left shadow-md">
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
  );
};

export default TableComponent2;