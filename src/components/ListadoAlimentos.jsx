import React, { useState } from 'react'

export const ListadoAlimentos = ({ listadoAlimentos }) => {

    const onHandleClickDelete = (e) => {
        console.log("eelboo")
    }

  return (
    <>
      {listadoAlimentos.length > 0 ? <label className="mt-10">Alimentos elegidos:</label> : <label></label> }
      {/* <label className="mt-10">Alimentos elegidos:</label> */}
      {listadoAlimentos.map(
        ({ key, alimento, cantidad, tipoPorcion, tipoPorcionValor }) => (
          <div key={key} className="flex mt-1 w-full items-center">
            {/* //Primera columna: alimento elegido */}
            <div className="w-1/3 mr-4">
              <label className="block w-full mt-1 p-2 border rounded-md bg-green-50 font-light">
                {alimento}
              </label>
            </div>

            {/* Segunda columna: Cantidad */}
            <div className="w-1/6 mr-4">
              <label className="block w-full mt-1 p-2 border rounded-md bg-green-50 font-light">
                {cantidad}
              </label>
            </div>

            {/* Tercer columna: Tipo Porcion */}
            <div className="w-1/6 mr-4">
              <input type="hidden" value={tipoPorcion} />
              <label className="block w-full mt-1 p-2 border rounded-md bg-green-50 font-light">
                {tipoPorcionValor}
              </label>
            </div>
            <div className="w-1/12 mr-4 cursor-pointer">
              <span onClick={(e) => onHandleClickDelete(e)}>
                <svg
                  className="h-8 w-8 text-red-500"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {" "}
                  <circle cx="12" cy="12" r="10" />{" "}
                  <line x1="15" y1="9" x2="9" y2="15" />{" "}
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </span>
            </div>
          </div>
        )
      )}
    </>
  );
};
