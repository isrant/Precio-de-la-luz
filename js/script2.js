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

const calcularButton = document.querySelector("button#calcular");
const handleCalcularButtonClick = async () => {
  try {
    let checks = document.querySelectorAll(".valores");
    let price = await getPrice();
    console.log("El precio actual de la luz es:", price + "€ MW/H");
    // Cálculos para obtener el coste según aparatos seleccionados
    let array = [];
    let array5 = [];
    checks.forEach((e) => {
      if (e.checked == true) {
        array.push(e.value);
        array5.push(e.name);
      }
    });
    const precioTotal = document.querySelector("#precioTotal");
    const desglose = document.querySelector("#desglose");
    let array2 = [];
    let arrayValoresNum = array.forEach((elemento) => {
      array2.push(Number(elemento));
    });
    let arraySumada = array2.reduce((acc, numero) => {
      return acc + numero;
    }, 0);

    let resultado = (arraySumada / 1000000) * price;
    let aparatoIndividual = array.map(function (numb) {
      return (numb * price) / 1000000;
    });
    let condecimales = resultado.toFixed(2);
    if (arraySumada == 0) {
      alert("Por favor, seleccione un electrodoméstico");
    } else {
      precioTotal.textContent =
        "Consumo total según elementos seleccionados : " + condecimales + "€/h";
      desglose.textContent = "";
      for (let i = 0; i < array5.length; i++) {
        desglose.textContent += `\n Consumo ${array5[i]}: ${aparatoIndividual[
          i
        ].toFixed(2)} €/h`;
      }
    }
  } catch (error) {
    // Visualizar el error en la pagina
    console.error(error.message);
  }
};
calcularButton.addEventListener("click", handleCalcularButtonClick);
