import { useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import Error from "./components/Error";

export const MuySaludableAdminApp = () => {
  // Estados para los valores de los campos
  const [nombreComida, setNombreComida] = useState("");
  const [tipoComida, setTipoComida] = useState("");
  const [alimentos, setAlimentos] = useState([]);
  const [alimento, setAlimento] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState(false);
  
  const [tipoPorcion, setTipoPorcion] = useState("");

  const getAlimentos = async() => {
    const url = `http://localhost:8000/api/alimentos`;
    try {
        const resp = await fetch(url);

        const { alimentos } = await resp.json();
        alimentos.sort(function (a, b) {
          if (a.nombre < b.nombre) {
            return -1;
          }
          if (a.nombre > b.nombre) {
            return 1;
          }
          return 0;
        });

        setAlimentos(alimentos);
        
    } catch (error) {
        console.log(error)
    }
    
  }

  useEffect(() => {

    getAlimentos();

  }, [])
  
  const tiposPorcion = [
    { id: "1", value: "Piezas" },
    { id: "2", value: "Gramos" },
    { id: "3", value: "Rebanada(s)" },
    { id: "4", value: "Taza(s)" },
    { id: "5", value: "Cucharadas" },
    { id: "6", value: "Latas" },
    { id: "7", value: "Paquetes" },
  ];

  const handleButtonClick = () => {
    // Lógica a ejecutar cuando se hace clic en el botón
    console.log("Botón clickeado");
    console.log({nombreComida,tipoComida,alimento,cantidad,tipoPorcion});

    if( [nombreComida,tipoComida,alimento,cantidad,tipoPorcion].includes("") ){
        setError(true);
        return;
    }

    setError(false);

  };

  return (
    <div className="mx-auto bg-gra">
      <h1 className="font-black text-5xl text-center md:w-1/3 mx-auto">
        Muy Saludable {""}
        <span className="text-green-500">Alta de comidas </span>
      </h1>

      {error && <Error>Todos los campos son obligatorios</Error>}

      <div className="w-full mt-5">
        <label className="block my-3 font-bold text-lg" htmlFor="nombre-comida">
          Ingresa el nombre de la comida:
        </label>
        <input
          type="text"
          name="nombre-comida"
          className="text-lg px-3 py-3 bg-white rounded-md border border-grey-400 w-full"
          value={nombreComida}
          onChange={(e) => setNombreComida(e.target.value)}
        />
      </div>

      <div className="w-full">
        <label className="block my-3 font-bold text-lg" htmlFor="tipo-comida">
          ¿Qué tipo de comida es?
        </label>
        <select
          className="bg-white rounded-md text-lg px-3 py-3 border border-gray-400 w-full"
          value={tipoComida}
          onChange={(e) => setTipoComida(e.target.value)}
        >
          <option value="">Elige tipo de comida</option>
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
          <label htmlFor="select1" className="block my-3 font-bold text-lg">
            Elige los alimentos que contiene:
          </label>
          <select
            id="select1"
            value={alimento}
            onChange={(e) => setAlimento(e.target.value)}
            className="block w-full mt-1 p-3 border rounded-md bg-white"
          >
            <option key="" value="">
              Elige un alimento
            </option>
            {alimentos.map(({ nombre, tipo }) => (
              <option key={nombre} value={nombre}>
                {nombre}
              </option>
            ))}
          </select>
        </div>

        {/* Segunda columna */}
        <div className="w-2/12 mr-4">
          <label htmlFor="cantidad" className="block my-3 font-bold text-lg">
            Cantidad
          </label>
          <input
            type="number"
            id="text2"
            value={cantidad}
            onChange={(e) => setCantidad(e.target.value)}
            className="block w-full mt-1 p-2 border rounded-md bg-white"
          />
        </div>

        {/* Tercera columna */}
        <div className="w-2/5 mr-4">
          <label htmlFor="select3" className="block my-3 font-bold text-lg">
            Tipo
          </label>
          <select
            id="select3"
            value={tipoPorcion}
            onChange={(e) => setTipoPorcion(e.target.value)}
            className="block w-full mt-1 p-3 border rounded-md bg-white"
          >
            <option key="" value="">
              Elige un tipo
            </option>
            {tiposPorcion.map(({ id, value }) => (
              <option key={id} value={id}>
                {value}
              </option>
            ))}
          </select>
        </div>

        {/* Cuarta columna */}
        <div className="w-2/12 flex items-end justify-center">
          <button
            onClick={handleButtonClick}
            className="bg-green-500 text-white p-2 rounded-md w-full"
          >
            Agregar alimento
          </button>
        </div>
      </div>

      <Modal />
    </div>
  );
}
