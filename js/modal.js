import { boxDetails } from "./data.js";
import { mainScreenContainer, currencyFromMainScreen } from "./index.js";
import { boxModalView } from "./View.js";

const DOMStrings = {
  modal: document.getElementById("Modal"),
  addCurrencyBtn: document.querySelector(".addCurrency"),
  addCurrencyModal: document.querySelector(".addCurrencyModal"),
};
const { modal, addCurrencyBtn, addCurrencyModal } = DOMStrings;

//add event on add button
export function addCurrencyToMainScreen() {
  addCurrencyBtn.addEventListener("click", openModal);
  window.addEventListener("click", outsideClick);
}
// render the Modal
function openModal() {
  modal.style.display = "block";
  boxModalView(boxDetails);
}
//close the Modal when we click outside
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}
//modal functionality
export let selectedCurrencyBoxes = [];
export function modalFunctionality(modalCurrencyBoxes) {
  modalCurrencyBoxes.forEach((currencyBox) => {
    currencyBox.addEventListener("click", () => {
      currencyBox.classList.toggle("selected");
      let element = currencyBox.querySelector("#code").innerText.toString(); //take the currency code for ex: EUR, AED,USD

      if (!selectedCurrencyBoxes.includes(element)) {
        selectedCurrencyBoxes.push(element); //array with selected currency
      } else {
        if (
          currencyFromMainScreen
            .map((el) => {
              return el.code;
            })
            .includes(element)
        ) {
          alert("This currency is already in the main screeen!"); //alert if the currency selected is already in the main screen

          currencyBox.classList.remove("selected");
        } else {
          const index = selectedCurrencyBoxes.indexOf(element);
          selectedCurrencyBoxes.splice(index, 1);
        }
      }
    });
  });
  //add event on add button from Modal
  addCurrencyModal.addEventListener("click", () => {
    modal.style.display = "none";
    mainScreenContainer(selectedCurrencyBoxes);
    modalCurrencyBoxes.forEach((currencyBox) => {
      currencyBox.classList.remove("selected");
    });
  });
}
