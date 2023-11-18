import {useState} from 'react'

export const Modal = () => {

    const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="flex mt-0 w-full">
        <div className="w-1/3 mr-4">
            <button
            className="bg-green-500 p-2 rounded-md text-white my-1 w-full"
            onClick={() => setIsOpen(true)}
            >
            ¿No existe el alimento? Agrégalo
            </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
          <div className="p-5 rounded flex flex-col justify-center items-center gap-5">
            <div className="self-end cursor-pointer">
              <span onClick={() => setIsOpen(false)}>x</span>
            </div>
            <div className="font-bold text-xl">Alta de alimento</div>
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
              />
            </div>

            <div className="w-full">
              <label
                className="block my-3 font-bold text-lg"
                htmlFor="nombre-comida"
              >
                Tipo Alimento:
              </label>
              <select className="bg-white rounded-md text-lg px-3 py-3 border border-gray-400 w-full">
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
                onClick={() => setIsOpen(false)}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
