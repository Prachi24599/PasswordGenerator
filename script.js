"use strict";
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
let checkCount = 0;
//set strength color to gray
setIndicator("#ccc");

//Set Password length
function handleSlider() {
  inputSlider.value = passwordLength;
  lengthDisplay.innerText = passwordLength;
  const min = inputSlider.min;
  const max = inputSlider.max;
  inputSlider.style.backgroundSize =
    ((passwordLength - min) * 100) / (max - min) + "% 100%";
}
handleSlider();

//set color and shadow of indicator
function setIndicator(color) {
  indicator.style.backgroundColor = color;
  //add shadow
  indicator.style.boxShadow = `0px 0px 12px 1px ${color}`;
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

async function copyContent() {
  try {
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText = "copied!";
  } catch (error) {
    copyMsg.innerText = "Failed";
  }
  //To make copy wala span visible
  copyMsg.classList.add("active");
  //to make copy wala text invisible after 2 sec
  setTimeout(() => {
    copyMsg.classList.remove("active");
  }, 2000);
}

//Shuffle the generated password
function shufflePassword(array) {
  //Fisher Yates Method to shuffle password
  for (let i = array.length - 1; i > 0; i--) {
    //random J = find out using random function
    const j = Math.floor(Math.random() * (i + 1));
    //swao the number at ith index with jth index
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  let str = "";
  array.forEach((el) => (str += el));
  return str;
}

function handleCheckBoxChange() {
  checkCount = 0;
  allCheckBox.forEach((checkbox) => {
    if (checkbox.checked) checkCount++;
  });
  //special cond
  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }
}

allCheckBox.forEach((checkbox) => {
  checkbox.addEventListener("change", handleCheckBoxChange);
});

//Chamging password length text according to slider value
inputSlider.addEventListener("input", (e) => {
  passwordLength = e.target.value;
  handleSlider();
});

copyBtn.addEventListener("click", () => {
  if (passwordDisplay.value) copyContent();
});

generateBtn.addEventListener("click", () => {
  //none of checkbox selected
  if (checkCount == 0) return;

  if (passwordLength < checkCount) {
    passwordLength = checkCount;
    handleSlider();
  }

  //finding new password

  //first remove old password
  password = "";

  //lets put the stuff mentioned by checkboxes
  // if (upperCaseCheck.checked) {
  //   password += generateUpperCase();
  // }
  // if (lowerCaseCheck.checked) {
  //   password += generateLowerCase();
  // }
  // if (symbolsCheck.checked) {
  //   password += generateSymbol();
  // }
  // if (numbersCheck.Checked) {
  //   password += generateRandomNumber();
  // }

  let funArr = [];
  if (upperCaseCheck.checked) {
    funArr.push(generateUpperCase);
  }
  if (lowerCaseCheck.checked) {
    funArr.push(generateLowerCase);
  }
  if (numbersCheck.checked) {
    funArr.push(generateRandomNumber);
  }
  if (symbolsCheck.checked) {
    funArr.push(generateSymbol);
  }

  //compulsory addition
  for (let i = 0; i < funArr.length; i++) {
    password += funArr[i]();
  }

  //remaining addition
  for (let i = 0; i < passwordLength - funArr.length; i++) {
    let randIndex = getRanInteger(0, funArr.length);
    // console.log(randIndex);
    password += funArr[randIndex]();
  }

  //shuffle the password
  password = shufflePassword(Array.from(password));

  //show password in UI
  passwordDisplay.value = password;

  //calculate password function
  calcStrength();
});
