"use strict";

// hacer que cuando se haga click en realizar la consulta guarde la fecha ( por la hora)
// para cuando haga click la próxima vez que la diferencia no sea menor de 5min.
// gestionarlo probablemente a través de un evento.
const now = new Date();
console.log(now);
const now2 = new Date(2022, 2, 14, 19, 0);
console.log(now2);
let dif = now2 - now;
console.log(dif);
let difMin = parseInt(dif / (1000 * 60)); // con esto llegaría. 5 minutos de diferencia.
console.log(difMin);
let difSeg = parseInt((dif % (1000 * 60)) / 1000);
console.log(difSeg);

if (difMin >= 5) {
  console.log("Puede realizar la consulta");
} else {
  console.log(`No corra tanto. Realice la consulta dentro de ${1 - difMin}`);
}
