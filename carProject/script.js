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
<div class = "carHeader">
  <div class="leftPiece">
    <p>${brand} ${model} ${year} рік</p>
    <p>Дилер - ${dealerName} ${averageRanking}</p>
  </div>
  <div class="rightPiece">
    <p>${price} USD</p>
    <p>В наявності</p>
  </div>
 </div>
 <div class = "carDetail">
    <p class = "dataItem"> <label> Двигун </label> <span > ${engine} </span></p>
     <p class = "dataItem"> <label> Коробка передач </label> <span > ${transmission} </span></p>
      <p class = "dataItem"> <label>Доступні кольори </label ><span >${createColoredCircle(
        colorOptions
      )}</span></p>
 </div>
</li>

`;

  return carTemplateFactory;
}

function createColoredCircle(colors) {
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
}

function buildAccordeon() {
  let allCars = document.querySelectorAll(".carItem");

  allCars.forEach((car) => {
    let header = car.querySelector(".carHeader");
    header.addEventListener("click", () => car.classList.toggle("hidden"));
  });
}

function sortCars(cars) {
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
  buildAccordeon();
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
function handleSortingCars() {
  if (this === buttonReset) {
    buttonReset.classList.add("hiddenButton");
    buttonReset.addEventListener(
      "transitionend",
      function () {
        buttonReset.style.display = "none";
      },
      { once: true }
    );
  } else {
    buttonReset.style.display = "inline-block";
    requestAnimationFrame(() => {
      buttonReset.classList.remove("hiddenButton");
    });
  }
  sortCars.call(this, cars);

  setActiveButton(this);
}

buttonHigh.addEventListener("click", function () {
  handleSortingCars.call(this);
});
buttonLow.addEventListener("click", function () {
  handleSortingCars.call(this);
});
buttonReset.addEventListener("click", function () {
  handleSortingCars.call(this);
});

function setActiveButton(button) {
  let currentActive = document.querySelector(".sortingButton.active");

  if (currentActive === button) return;
  currentActive?.classList?.remove("active");
  button.classList.add("active");
}

function extractingColors(cars) {
  let colorExtractor = cars.flatMap((car) => {
    return car.features.colorOptions;
  });
  let colorsNoDuplicates = colorExtractor.filter((color, index) => {
    return index === colorExtractor.indexOf(color);
  });
  return colorsNoDuplicates;
}
function buildCheckboxTemplate(colors) {
  return colors
    .map((color) => {
      return `<label  style =" background:${color};" class="coloredCheckbox ">
  <input type="checkbox" />
  <img class = "checkmark" src="./img/checkmark.svg" alt="checkmark" />
</label>`;
    })
    .join("");
}
let colorUl = document.getElementById("customCheckboxes");
colorUl.innerHTML = buildCheckboxTemplate(extractingColors(cars));

function filterCircle() {}

function receiveFormData() {
  let form = document.getElementById("filterForm");
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    console.log(event);

    console.log("form sumbitted");
  });
}
receiveFormData();
setTotalCarsAmount(cars);
insertCarsItems(cars);
buildAccordeon();
