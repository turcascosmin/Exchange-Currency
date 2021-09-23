import { modalFunctionality } from "./modal.js";
import { closeButtons, changeBoxColor } from "./index.js";

const boxes = document.querySelector(".boxes");
const modalContent = document.querySelector(".modal-content");

//UI for a box from Modal
export const boxModalView = (boxDetails) => {
  let markup = boxDetails.map((currency) => {
    return ` <div class="modalCurrencyBox">
        <img src="./icon/${currency.flag}" alt="flag" />
        <p><span id="code">${currency.code}</span> - ${currency.name}</p>
      </div>`;
  });
  modalContent.innerHTML = "";
  modalContent.insertAdjacentHTML("afterbegin", markup.join(" "));
  const modalCurrencyBoxes = document.querySelectorAll(".modalCurrencyBox");
  modalFunctionality(modalCurrencyBoxes);
};
//UI for a box from Main Screen
export function boxMainScreenView(currencyFromMainScreen) {
  let markup = currencyFromMainScreen.map((currency) => {
    return `<section class="currencyBox">
    <button class="closeButton">X</button>
    <div class="flagAndInput">
      <img src="./icon/${currency.flag}" alt="flag" />
      <p class="currencyIcon">${currency.symbol}</p>
      <input type="number" name="amount" id="amount" />
    </div>
    <div class="rates">
          <p><span id="currencyCode">${currency.code}</span> - ${currency.name}</p>
          <p>1 <span id="baseCurrency">Base Currency</span> = <span id="ratesBox"></span> ${currency.code}</p>
        </div>
      
  </section>`;
  });

  boxes.innerHTML = "";
  boxes.insertAdjacentHTML("afterbegin", markup.join(" "));
  const DOMStringsView = {
    closeBtns: document.querySelectorAll(".closeButton"),
    currenciesBoxes: document.querySelectorAll(".currencyBox"),
    inputs: document.querySelectorAll("#amount"),
    baseCurrency: document.querySelectorAll("#baseCurrency"),
    ratesBox: document.querySelectorAll("#ratesBox"),
  };
  const { closeBtns, currenciesBoxes, inputs, baseCurrency, ratesBox } =
    DOMStringsView;

  changeBoxColor(currenciesBoxes, inputs, baseCurrency, ratesBox);
  closeButtons(closeBtns, currencyFromMainScreen);
}
