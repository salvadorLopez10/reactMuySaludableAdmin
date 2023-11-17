import { useState } from "react";

export const MuySaludableAdminApp = () => {
  // Estados para los valores de los campos
  const [select1, setSelect1] = useState("");
  const [text2, setText2] = useState("");
  const [select3, setSelect3] = useState("");

  // Datos para las opciones de los campos select
  const optionsForSelect1 = ["Opción 1", "Opción 2", "Opción 3"];
  const optionsForSelect3 = ["X", "Y", "Z"];

  const handleButtonClick = () => {
    // Lógica a ejecutar cuando se hace clic en el botón
    console.log("Botón clickeado");
  };

  return (
    <div className="mx-auto bg-gra">
      <h1 className="font-black text-5xl text-center md:w-1/3 mx-auto">
        Muy Saludable {""}
        <span className="text-indigo-600">Alta de comidas </span>
      </h1>

      <div className="w-full mt-5">
        <label className="block my-3 font-bold text-lg" htmlFor="nombre-comida">
          Ingresa el nombre de la comida:
        </label>
        <input
          type="text"
          name="nombre-comida"
          className="text-lg px-3 py-3 bg-white rounded-md border border-gray-400 w-full"
        />
      </div>

      <div className="w-full">
        <label className="block my-3 font-bold text-lg" htmlFor="tipo-comida">
          ¿Qué tipo de comida es?
        </label>
        <select className="bg-white rounded-md text-lg px-3 py-3 border border-gray-400 w-full">
          <option value="Desayuno">Desayuno</option>
          <option value="Colacion">Colación</option>
          <option value="Comida">Comida</option>
          <option value="Cena">Cena</option>
        </select>
      </div>

      {/* Comienza sección para agregar alimentos */}
      <div className="flex mt-8 w-full">
        {/* Primera columna */}
        <div className="w-2/5 mr-4">
          <label htmlFor="select1" className="block my-3 font-bold text-lg">Elige los alimentos que contiene:</label>
          <select
            id="select1"
            value={select1}
            onChange={(e) => setSelect1(e.target.value)}
            className="block w-full mt-1 p-3 border rounded-md bg-white"
          >
            {optionsForSelect1.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Segunda columna */}
        <div className="w-2/12 mr-4">
          <label htmlFor="text2" className="block my-3 font-bold text-lg">Cantidad</label>
          <input
            type="text"
            id="text2"
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            className="block w-full mt-1 p-2 border rounded-md bg-white"
          />
        </div>

        {/* Tercera columna */}
        <div className="w-2/5 mr-4">
          <label htmlFor="select3" className="block my-3 font-bold text-lg">Tipo</label>
          <select
            id="select3"
            value={select3}
            onChange={(e) => setSelect3(e.target.value)}
            className="block w-full mt-1 p-3 border rounded-md bg-white"
          >
            {optionsForSelect3.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Cuarta columna */}
        <div className="w-2/12 flex items-end justify-center">
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 text-white p-2 rounded-md w-full"
          >
            Agregar alimento
          </button>
        </div>
      </div>
    </div>
  );
}
