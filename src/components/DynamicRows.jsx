import React, { useState } from "react";

const DynamicRows = () => {
  const [rows, setRows] = useState([]);

  const addRow = () => {
    setRows([...rows, { field1: "", field2: "", field3: "", field4: "" }]);
  };

  const handleFieldChange = (index, fieldName, value) => {
    const updatedRows = [...rows];
    updatedRows[index][fieldName] = value;
    setRows(updatedRows);
  };

  return (
    <div>
      <button
        onClick={addRow}
        className="bg-blue-500 text-white p-2 rounded-md mb-4"
      >
        Agregar Fila
      </button>

      {rows.map((row, index) => (
        <div key={index} className="flex mb-2">
          <input
            type="text"
            value={row.field1}
            onChange={(e) => handleFieldChange(index, "field1", e.target.value)}
            className="mr-2 p-2 border rounded-md"
            placeholder="Campo 1"
          />
          <input
            type="text"
            value={row.field2}
            onChange={(e) => handleFieldChange(index, "field2", e.target.value)}
            className="mr-2 p-2 border rounded-md"
            placeholder="Campo 2"
          />
          <input
            type="text"
            value={row.field3}
            onChange={(e) => handleFieldChange(index, "field3", e.target.value)}
            className="mr-2 p-2 border rounded-md"
            placeholder="Campo 3"
          />
          <input
            type="text"
            value={row.field4}
            onChange={(e) => handleFieldChange(index, "field4", e.target.value)}
            className="p-2 border rounded-md"
            placeholder="Campo 4"
          />
        </div>
      ))}
    </div>
  );
};

export default DynamicRows;
