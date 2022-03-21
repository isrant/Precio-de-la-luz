"use strict";

async function getPrice() {
  let price = null;
  let datosConsulta = window.localStorage.getItem("datosConsulta");
  if (datosConsulta) {
    datosConsulta = JSON.parse(datosConsulta);
    let horaActual = Date.now();
    let resta = (horaActual - datosConsulta.hora) / 60000;
    console.log(">>>>>", horaActual, datosConsulta.hora, resta);
    console.log("Pasaron 5 minutos?");
    if (resta < 5) {
      price = datosConsulta.precio;
      console.log("No, voy leer los datos desde localStorage");
    }
  }
  if (price === null) {
    console.log(
      "Pasaron 5 minutos o no tengo datos en localStorage, hago la fetch!"
    );
    const response = await fetch(
      "https://api.allorigins.win/get?url=https://api.preciodelaluz.org/v1/prices/now?zone=PCB"
    );
    if (response.ok) {
      const data = await response.json();
      price = JSON.parse(data.contents).price;
      const datosAGuardar = {
        hora: Date.now(),
        precio: price,
      };
      window.localStorage.setItem(
        "datosConsulta",
        JSON.stringify(datosAGuardar)
      );
    }
  }
  return price;
}
