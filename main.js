"use strict";

// lo primero es obtener el precio de la luz en el momento actual (según la hora actual a la que se haga la consulta)

//precio de la luz en el momento actual
//https://api.preciodelaluz.org/v1/prices/now?zone=PCB

//ejemplo de resultado
/* {
    "date": "13-03-2022",
    "hour": "21-22",
    "is-cheap": false,
    "is-under-avg": false,
    "market": "PVPC",
    "price": 436.44,
    "units": "€/Mwh"
    } */

const urlPrecioActual = `https://api.preciodelaluz.org/v1/prices/now?zone=PCB`;
// 1a forma
async function precio() {
  try {
    const response = await fetch(urlPrecioActual, {
      mode: "no-cors",
    });
    const price = await response.json.Parse;
    console.log("pasa por aquí");
    console.log(price);
    /*     if (response.ok) {
      // hacemos algo
      console.log(price);
    } else {
      console.log("Hubo un error en la petición");
    } */
  } catch (error) {
    console.log(error.message);
  } finally {
    console.log("FEtch completada");
  }
}

//2a forma
/* fetch(urlPrecioActual, { mode: "no-cors" })
  .then((response) => {
    return response.json();
  })
  .then((datos) => {
    console.log(datos);
  })
  .catch((error) => {
    console.log(error.message);
  })
  .finally(() => {
    console.log("fech completada");
  }); */

precio();

/* fetch(urlPrecioActual)
  .then((response) => {
    console.log(response);
    return response.json();
  })
  .then((datos) => {
    console.log(datos.results[0].name);
  })
  .catch((error) => {
    console.error(error.message);
  })
  .finally(() => {
    console.log("Fetch completada!");
  }); */
