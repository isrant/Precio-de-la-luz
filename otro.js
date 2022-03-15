"use strict";

const datos =
  // 20220314162207
  // https://api.preciodelaluz.org/v1/prices/now?zone=PCB

  {
    date: "14-03-2022",
    hour: "16-17",
    "is-cheap": true,
    "is-under-avg": true,
    market: "PVPC",
    price: 296.76,
    units: "€/Mwh",
  };

console.log(datos);
console.log(datos.price);
let precio = datos.price * 2;
console.log(precio, "watios");
