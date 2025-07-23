"use strict";

// searchCar use background position.
//
//
//
//

///
///
///
function setTotalCarsAmount(carArray) {
  const numOFCars = document.getElementById("carsAmount");
  numOFCars.textContent = carArray.length + " aвтомобілів";
}

function createCarTemplate({
  brand,
  model,
  year,
  price,
  features: { engine, transmission, colorOptions },
  dealer: { name: dealerName, average: averageRanking },
}) {
  // brand model year       -  price + " usd"
  //  dealer name, average rating

  //Header
  let carTemplateFactory = `
<li class="carItem hidden">
<div class = "carHeader ">
  <div class="leftPiece">
    <p>${brand} ${model} ${year} рік</p>
    <p>Дилер - ${dealerName} ${averageRanking}</p>
  </div>
  <div class="rightPiece">
    <p>${price} USD</p>
    <p>В наявності</p>
  </div>
 </div>
 <div class = "carDetail  ">
    <p class = "dataItem"> <label> Двигун </label> <span > ${engine} </span></p>
     <p class = "dataItem"> <label> Коробка передач </label> <span > ${transmission} </span></p>
      <p class = "dataItem"> <label>Доступні кольори </label ><span >${colorSelector(
        colorOptions
      )}</span></p>
 </div>
</li>

`;
  // Details
  //console.log(carTemplateFactory);

  return carTemplateFactory;
}

function colorSelector(colors) {
  return colors
    .map((color) => {
      return `<span style = "background: ${color}" class = "coloredCircle"> </span>`;
    })
    .join(" ");
}
function insertCarsItems(carArray) {
  const ulCarObject = document.getElementById("cars");
  ulCarObject.innerHTML = "";

  let modifiedCarArray = carArray.map((element) => {
    let {
      brand,
      model,
      year,
      price,
      features,
      dealer: { name: dealerName, ratings },
    } = element;

    let average =
      ratings.reduce((accumulator, current) => {
        return accumulator + current;
      }, 0) / ratings.length;

    return {
      brand,
      model,
      year,
      price,
      features,
      dealer: { name: dealerName, average: average.toFixed(2) },
    };
  });

  modifiedCarArray.forEach((element) => {
    ulCarObject.insertAdjacentHTML("beforeEnd", createCarTemplate(element));
  });
  console.log(modifiedCarArray);
}

function accordeon() {
  let allCars = document.querySelectorAll(".carItem");

  allCars.forEach((car) => {
    let header = car.querySelector(".carHeader");
    header.addEventListener("click", () => car.classList.toggle("hidden"));
  });
}

function sortCars(cars) {
  console.log(this.dataset.sort);

  //sort cars
  let holdSortedCards = cars;
  // sort by lowest price
  if ("sortLow" === this.dataset.sort) {
    holdSortedCards = cars.toSorted((a, b) => a.price - b.price);
  }
  //sort by highest price
  if ("sortHigh" === this.dataset.sort) {
    holdSortedCards = cars.toSorted((a, b) => b.price - a.price);
  }

  insertCarsItems(holdSortedCards);
  accordeon();
}
/////
/////
////

let buttonLow = document.getElementById("lowestPriceFirst");
let buttonHigh = document.getElementById("highestPriceFirst");
let buttonReset = document.getElementById("resetPrice");
////
////
///
////
////
buttonHigh.addEventListener("click", function () {
  sortCars.call(this, cars);
  clickedSorting();
  setActiveButton(this);
});
buttonLow.addEventListener("click", function () {
  sortCars.call(this, cars);
  clickedSorting();
  setActiveButton(this);
});
buttonReset.addEventListener("click", function () {
  sortCars.call(this, cars);
  buttonReset.classList.add("hiddenButton");
  setActiveButton(this);
});
function clickedSorting() {
  buttonReset.classList.remove("hiddenButton");
}

function setActiveButton(button) {
  let currentActive = document.querySelector(".sortingButton.active");
  console.log(currentActive);
  if (button === buttonReset) {
    currentActive?.classList?.remove("active");
  }
  if (currentActive === button) return;
  currentActive?.classList?.remove("active");
  button.classList.add("active");
}
setTotalCarsAmount(cars);
insertCarsItems(cars);
accordeon();
