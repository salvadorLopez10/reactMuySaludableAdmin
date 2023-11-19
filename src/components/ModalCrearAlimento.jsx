import {useState} from 'react'
import config from "../config.json";
import { ErrorModalAlimento } from './ErrorModalAlimento';
import { getAlimentos } from '../helpers/GetAlimentosAPI';

export const ModalCrearAlimento = ({ setAlimentos }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorAlimento, setErrorAlimento] = useState(false);
  const [errorAPI, setErrorAPI] = useState(false);
  const [mensajeError, setMensajeError] = useState("");
  const [nombreAlimento, setNombreAlimento] = useState("");
  const [tipoAlimento, setTipoAlimento] = useState("");

  const onClickGuardarAlimento = () => {
    if ([nombreAlimento, tipoAlimento].includes("")) {
      setErrorAlimento(true);
      return;
    }
    setErrorAlimento(false);
    setIsOpen(false);

    //Procedemos a guardar el alimento
    saveAlimento();
  };

  const saveAlimento = async () => {
    const url = `${config.URL_API}/api/alimentos`;
    try {
      const body = {
        nombre: nombreAlimento,
        tipo: tipoAlimento,
        informacion_nutrimental: "",
      };

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const resp = await response.json();
      if (response.status != 200) {
        setErrorAPI(true);
        setMensajeError(resp.msg);
        setIsOpen(true);
      } else {
        //Una vez guardado el alimento, se vuelve a recargar la lista para pobservar el alimento dado de alta
        reloadAlimentos();
        setNombreAlimento("");
        setTipoAlimento("");
        setIsOpen(false);
        setErrorAPI(false);
        setErrorAlimento(false);
      }
    } catch (error) {
      console.log("Error al guardar alimento: " + error);
    }
  };

  const reloadAlimentos = async () => {
    const newAlimentos = await getAlimentos();

    setAlimentos(newAlimentos);
  };

  return (
    <>
      <div className="flex mt-0 w-full">
        <div className="w-1/3 mr-4">
          <div className="text-center">
            <button
              className="text-center font-medium text-blue-600 dark:text-blue-500 hover:underline"
              onClick={() => setIsOpen(true)}
            >
              ¿No existe el alimento? Agrégalo
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="p-5 rounded flex flex-col justify-center items-center gap-5">
            <div className="self-end cursor-pointer">
              <span onClick={() => setIsOpen(false)}>x</span>
            </div>
            <div className="font-bold text-xl">Alta de alimento</div>

            {errorAlimento && (
              <ErrorModalAlimento>
                Favor de elegir Nombre y Tipo
              </ErrorModalAlimento>
            )}
            {errorAPI && (
              <ErrorModalAlimento>{mensajeError}</ErrorModalAlimento>
            )}

            <div className="w-full">
              <label
                className="block my-0 font-bold text-lg"
                htmlFor="nombre-comida"
              >
                Ingresa el nombre del alimento:
              </label>
              <input
                type="text"
                name="nombre-comida"
                className="text-lg px-3 py-3 bg-white rounded-md border border-gray-400 w-full"
                value={nombreAlimento}
                onChange={(e) => setNombreAlimento(e.target.value)}
              />
            </div>

            <div className="w-full">
              <label
                className="block my-3 font-bold text-lg"
                htmlFor="nombre-comida"
              >
                Tipo Alimento:
              </label>
              <select
                className="bg-white rounded-md text-lg px-3 py-3 border border-gray-400 w-full"
                value={tipoAlimento}
                onChange={(e) => setTipoAlimento(e.target.value)}
              >
                <option value="">Selecciona tipo</option>
                <option value="Proteinas">Proteínas</option>
                <option value="Carbohidratos">Carbohidratos</option>
                <option value="Frutas">Frutas</option>
                <option value="Verduras">Verduras</option>
                <option value="Grasas">Grasas</option>
                <option value="BebidasLacteos">Bebidas y Lácteos</option>
              </select>
            </div>

            <div className="">
              <button
                className="bg-green-500 py-200 p-2 rounded-md text-white font-bold m-2"
                onClick={() => onClickGuardarAlimento()}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
