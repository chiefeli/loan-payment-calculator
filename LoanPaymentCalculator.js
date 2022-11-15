/* eslint-disable max-len */
const readline = require('readline-sync');

let monthlyInterestRate;
let monthlyPayment;
let durationMonths;

// function for caclulating monthly mortgage payment
function calcMonthlyPayment(loanAmount, monthlyInterestRate, durationMonths) {
  monthlyPayment = loanAmount * (monthlyInterestRate / (1 - Math.pow((1 + monthlyInterestRate), (-durationMonths))));
  return monthlyPayment;
}

function prompt(message) {
  console.log(`=> ${message}`);
}
// function for validating user inputs
function invalidNumber(num) {
  return num.trimStart() === ''        ||
         Number(num) < 0               ||
         Number.isNaN(Number(num));
}
// function for converting percent to integer and monthly interest rate
function convertAnnualRate(annualPercentRate) {
  annualPercentRate /= 12;
  monthlyInterestRate = parseFloat(annualPercentRate) / 100;
  return monthlyInterestRate;
}
// function for converting months to years
function convertYrToMo(durationYears) {
  durationMonths = durationYears * 12;
  return durationMonths;
}

while (true) {
  prompt("Hello! Welcome to the mortgage/car loan calulator!");

  // asking the user for the total loan amount
  prompt("What is the total loan amoun?");
  let loanAmount = readline.question();
  // validating user input a number
  while (invalidNumber(loanAmount)) {
    prompt("Loan amount is invalid. Try again... Please enter a valid positve loan amount. i.e 45000.50");
    loanAmount = readline.question();
  }
  // asking the user to enter the annual percentage rate as a number
  prompt("Please enter the annual percentage rate as a number. i.e 6 for 6%");
  let annualPercentRate = readline.question();
  // validating user input a number
  while (invalidNumber(annualPercentRate)) {
    prompt("Invalid anuual percentage rate. Try again... Please enter a valid positive annual percentage rate as a number");
    annualPercentRate = readline.question();
  }
  // Asking the user for the duration of the loan in years
  prompt("What is the duration of the laon in years?");
  let durationYears = readline.question();
  // validating user input a number
  while (invalidNumber(durationYears)) {
    prompt("Invalid input. Try again... Please enter a valid positive number in years.");
    durationYears = readline.question();
  }
  // calculating monthly interest rate
  convertAnnualRate(annualPercentRate);
  // calculating duration of loan in months
  convertYrToMo(durationYears);
  // calculating loan monthly payment
  calcMonthlyPayment(parseFloat(loanAmount), parseFloat(monthlyInterestRate), parseFloat(durationMonths));
  // printing loan monthly payment as dollar amount
  prompt(`Your total monthly loan payment is ${'$' + monthlyPayment.toFixed(2)}`);
  prompt("Please make your payments on time!\n");
  // asking the user if they would like to perform another loan calculation
  prompt('Would you like to perform another calculation? Yes or No?');
  let userAns = readline.question();
  if (userAns.toLowerCase() !== 'yes') {
    break;
  }
}