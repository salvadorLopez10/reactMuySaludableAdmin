import config from "../config.json";
export const getAlimentos = async () => {
  const url = `${config.URL_API}/api/alimentos`;
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

    return alimentos;
  } catch (error) {
    console.log(error);
  }
};
