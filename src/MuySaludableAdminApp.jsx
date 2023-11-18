import { useEffect, useState } from "react";
import { ModalCrearAlimento } from "./components/ModalCrearAlimento";
import { tiposPorcion } from "./helpers/OpcionesTipoPorcion";
import Error from "./components/Error";
import { ListadoAlimentos } from "./components/ListadoAlimentos";
import { Header } from "./components/Header";

export const MuySaludableAdminApp = () => {
  // Estados para los valores de los campos
  const [nombreComida, setNombreComida] = useState("");
  const [tipoComida, setTipoComida] = useState("");
  const [alimentos, setAlimentos] = useState([]);
  const [alimento, setAlimento] = useState("");
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState(false);
  const [tipoPorcion, setTipoPorcion] = useState("");

  const [objAlimento, setObjAlimento] = useState({});
  const [listadoAlimentos, setListadoAlimentos] = useState([]);
 

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

  const handleButtonClick = () => {

    if( [alimento,cantidad,tipoPorcion].includes("") ){
        setError(true);
        return;
    }


    setError(false);

    const tipoPorcionValor = searchValuePorcion(tipoPorcion, tiposPorcion);
    const objetoAlimento= {
        key: generarId(),
        alimento,
        cantidad,
        tipoPorcion,
        tipoPorcionValor
    };

    setListadoAlimentos([...listadoAlimentos, objetoAlimento]);

    setAlimento("");
    setCantidad("");
    setTipoPorcion("");

  };

  const searchValuePorcion = (id, arreglo) =>{
    for (let index = 0; index < arreglo.length; index++) {
        if( arreglo[index].id == id ){
            return arreglo[index].value;
        }
    }
  }

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return random + fecha;
  };

  return (
    <div className="mx-auto">
      <Header />
      <div className="relative">
        <button
          onClick={handleButtonClick}
          className="absolute bg-green-900 text-white p-2 rounded-md top-0 right-0 mt-0"
        >
          Guardar
        </button>
      </div>
      <div className="w-full mt-5">
        <label
          className="block my-3 mt-5 font-bold text-lg"
          htmlFor="nombre-comida"
        >
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

      {error && <Error>Favor de elegir alimento, cantidad y tipo</Error>}

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
            step=".5"
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

      <ModalCrearAlimento 
        setAlimentos={setAlimentos} 
        />

      <ListadoAlimentos
        listadoAlimentos={listadoAlimentos}
        setListadoAlimentos={setListadoAlimentos}
      />
    </div>
  );
}
