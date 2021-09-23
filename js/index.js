import { boxDetails, takeData } from "./data.js";
import { addCurrencyToMainScreen, selectedCurrencyBoxes } from "./modal.js";
import { boxMainScreenView } from "./View.js";

let state = {
  selectedCurrencyFromList: [],
  ratesFromAPI: [],
};

let { selectedCurrencyFromList, ratesFromAPI } = state;

export function getData(data) {
  ratesFromAPI = data;
  displayDate(ratesFromAPI);
}

/*Actualizarea datei*/
export function displayDate(data) {
  document.getElementById("datetime").innerHTML = `${data.date.substr(
    8,
    2
  )}/${data.date.substr(5, 2)}/${data.date.substr(0, 4)}`;
}

/*Main Screen */
export let currencyFromMainScreen = [];
export function mainScreenContainer(selectedCurrencyBoxes) {
  boxDetails.map((currencyFromData) => {
    if (selectedCurrencyBoxes.includes(currencyFromData.code))
      selectedCurrencyFromList.push(currencyFromData);
  });
  currencyFromMainScreen = selectedCurrencyFromList;

  boxMainScreenView(currencyFromMainScreen);
  selectedCurrencyFromList = [];
}
/*Close the card with X */
export function closeButtons(closeBtns) {
  closeBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      currencyFromMainScreen.splice(index, 1);
      selectedCurrencyBoxes.splice(index, 1);
      boxMainScreenView(currencyFromMainScreen);
    });
  });
}
/*change the color when click in input and change the base currency in every card */
export function changeBoxColor(
  currenciesBoxes,
  inputs,
  baseCurrency,
  ratesBox
) {
  inputs.forEach((input, index) => {
    input.addEventListener("focus", () => {
      currenciesBoxes.forEach((el) => {
        el.style.backgroundColor = "rgb(241, 241, 241)";
      });
      currenciesBoxes[index].style.backgroundColor = "rgb(153, 170, 201)";

      baseCurrency.forEach((el) => {
        el.innerText = currencyFromMainScreen[index].code;
      });

      input.addEventListener("change", (e) => {
        changeInputsValue(e, inputs, index, ratesBox);
      });
    });
  });
}
/*change the value in every input card with the conversion value */
function changeInputsValue(e, inputs, index, ratesBox) {
  let value = parseInt(e.target.value);
  let rates = [];
  let otherRates = [];
  /*take currency from data which we selected in Modal */
  currencyFromMainScreen.map((el) => {
    let index = Object.keys(ratesFromAPI.rates).indexOf(el.code);
    if (Object.keys(ratesFromAPI.rates).includes(el.code)) {
      rates.push(Object.values(ratesFromAPI.rates)[index]);
    }
  });
  /*put the coversion value in inputs.All conversion was made with Euro as base currency */
  inputs.forEach((input, i) => {
    if (i !== index) {
      input.value = ((value / rates[index]) * rates[i]).toFixed(2); //ex:convert 100$ in ron ((100$(base currency)/1.17446($/eur)*4.949469(euro/ron))=~421.43
    }
    otherRates.push(((value / rates[index]) * rates[i]) / value); //find the new rate for the rest currency from the list
  });
  //change the rates in the card ex:1 USD=4.21 RON
  ratesBox.forEach((r, i) => {
    i !== index
      ? otherRates.length === 1
        ? (r.innerText = otherRates[0].toFixed(2))
        : (r.innerText = otherRates[i].toFixed(2))
      : (r.innerText = 1);
  });
}
//init

takeData();
addCurrencyToMainScreen();
