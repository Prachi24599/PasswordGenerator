const inputSlider = document.querySelector("[data-lengthSlider]"); //fetching data using custom attribute
const lengthDisplay = document.querySelector("[data-lengthNumber]");
const passwordDisplay = document.querySelector("[data-PasswordDisplay]");
const copyBtn = document.querySelector("[data-copy]");
const copyMsg = document.querySelector("[data-copyMsg]");
const upperCaseCheck = document.querySelector("#uppercase");
const lowerCaseCheck = document.querySelector("#lowercase");
const numbersCheck = document.querySelector("#numbers");
const symbolsCheck = document.querySelector("#symbols");
const indicator = document.querySelector("[data-indicator]");
const generateBtn = document.querySelector(".generate-button");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

//Initially
let password = "";
let passwordLength = 10;
let checkCount = 1;
//set strength color to gray

//Set Password length
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
}
handleSlider();

//set color and shadow of indicator
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  //add shadow
}

function getRanInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomNumber() {
  return getRanInteger(0, 9);
}

function generateLowerCase() {
  return String.fromCharCode(getRanInteger(97, 123)); //97 - a, 123 - z
}

function generateUpperCase() {
  return String.fromCharCode(getRanInteger(65, 91)); //65 - A, 91 - Z
}

function generateSymbol() {
  const randNum = getRanInteger(0, symbols.length);
  return symbols.charAt(randNum);
}

function calcStrength() {
  let hasUpper = false;
  let hasLower = false;
  let hasNum = false;
  let hasSym = false;

  if (upperCaseCheck.checked) hasUpper = true;
  if (lowerCaseCheck.checked) hasLower = true;
  if (symbolsCheck.checked) hasSym = true;
  if (numbersCheck.checked) hasNum = true;

  if (hasUpper && hasLower && (hasSym || hasSym) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUpper) &&
    (hasNum || hasSym) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }
}
