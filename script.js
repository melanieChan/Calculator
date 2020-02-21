var result = document.getElementById("display-result"); // from html
var operations = document.getElementById("display-operations");
var numbers = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]);
var validFloat = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."]);
var validTerm = new Set(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "x", "÷"]);


function getLastCharacterInOperation() {
  return operations.textContent.charAt(operations.textContent.length-1);
}
function isNumber(numberToCheck) {
  return numbers.has(numberToCheck);
}
function isValidFloat(numberToCheck) {
  return validFloat.has(numberToCheck);
}
function isValidTerm (charToCheck) {
  return validTerm.has(charToCheck);
}
function addNumber(numberToAdd) {
  // at beginning, before any button is pressed
  // if length of operations is 1 and the digit is 0
  if ( operations.textContent === "0") {
    operations.textContent = "";
  }
  operations.textContent += numberToAdd; // concatenates 8 to string of operations
}
// given index, return a number from the index up to next operation
function getNumber(index) {
  var number = "";
  var counter = index;
  // add next digits
  while ( isValidFloat( operations.textContent.charAt(counter) ) ) {
    number += operations.textContent.charAt(counter);
    // increment
    counter++;
  }
  // turn string into number
  return parseFloat(number);
}
function numberOfPlusMinus(string) { // count how many plus / minus signs are in the string
  var count = 0;

  for (var char = 0; char < string.length; char++) {
    if (string.charAt(char) === "+"
    || string.charAt(char) === "-")
      count++;
  }
  return count;
}


document.getElementById("btn-seven").onclick = function (event) {
  addNumber("7");
}
document.getElementById("btn-eight").onclick = function (event) {
  addNumber("8");
}
document.getElementById("btn-nine").onclick = function (event) {
  addNumber("9");
}
document.getElementById("btn-seven").onclick = function (event) {
  addNumber("7");
}
document.getElementById("btn-eight").onclick = function (event) {
  addNumber("8");
}
document.getElementById("btn-nine").onclick = function (event) {
  addNumber("9");
}
document.getElementById("btn-six").onclick = function (event) {
  addNumber("6");
}
document.getElementById("btn-five").onclick = function (event) {
  addNumber("5");
}
document.getElementById("btn-four").onclick = function (event) {
  addNumber("4");
}
document.getElementById("btn-three").onclick = function (event) {
  addNumber("3");
}
document.getElementById("btn-two").onclick = function (event) {
  addNumber("2");
}
document.getElementById("btn-one").onclick = function (event) {
  addNumber("1");
}
document.getElementById("btn-zero").onclick = function (event) {
  addNumber("0");
}

document.getElementById("btn-plus").onclick = function (event) {
  // only add plus sign if there's not a plus sign at the end already already
  if (isNumber(getLastCharacterInOperation()))
    operations.textContent += "+";
}
document.getElementById("btn-minus").onclick = function (event) {
  // if last character is a digit
  if ( isNumber( getLastCharacterInOperation() ) )
    operations.textContent += "-";
  else if (getLastCharacterInOperation() === "+") {
    // removes last character
    operations.textContent = operations.textContent.substring(0, operations.textContent.length - 1);
    // add plus at the end
    operations.textContent += "-";
  }
}
document.getElementById("btn-multi").onclick = function (event) {
  if ( isNumber(getLastCharacterInOperation()))
    operations.textContent += "x";
}
document.getElementById("btn-divide").onclick = function (event) {
  if ( isNumber(getLastCharacterInOperation()))
    operations.textContent += "÷";
}
document.getElementById("btn-decimal").onclick = function (event) {
  // decimal will not come after operation or another decimal
  var lastFloat = [];
  for (var i = operations.textContent.length - 1; i >= 0; i--) {
    var digit = operations.textContent.charAt(i);
    if (isValidFloat(digit)) {
      lastFloat.push(digit);
    } else {
      break;
    }
  }
  if ( !lastFloat.includes(".") && isNumber( getLastCharacterInOperation() ) )
    operations.textContent += ".";
}
document.getElementById("btn-ac").onclick = function (event) {
  operations.textContent = "0";
}
document.getElementById("btn-ce").onclick = function (event) { // removes last character
  // last character is a non-zero digit
  if ( operations.textContent.length === 1 && getLastCharacterInOperation() !== "0") {
    operations.textContent = "0";
  }

  // last character follows other more characters
  if ( operations.textContent.length > 1 )
    // remove last character
    operations.textContent = operations.textContent.substring(0, operations.textContent.length - 1);
}

document.getElementById("btn-equals").onclick = function (event) {
  var numberOfSubAddSigns = numberOfPlusMinus(operations.textContent);

/*PASSED*/ //console.log(numberOfSubAddSigns);

  // array of terms (floats) and operations (strings)
  var equation = [];

  // add each term(number that has only been multiplied/divided but not added/subtracted) and each operation to the equation array
  var index = 0;
  for (var termOrOp = 1; termOrOp <= (numberOfSubAddSigns * 2) + 1; termOrOp++) {
    // term of numbers to be multiplied/divided
    if( isValidTerm(operations.textContent.charAt(index)) ) {
      product = 1;
      // multiply / divide
      while ( isValidTerm(operations.textContent.charAt(index)) ) {
        // current index is a digit: get all digits in one number
        if ( isValidFloat(operations.textContent.charAt(index)) ) {
          var factor = getNumber(index);
/*PASSED*/ console.log(factor);

          // multiply / divide
          if ( operations.textContent.charAt(index - 1) === "x"
          || index === 0                  // first digit in the term
          || operations.textContent.charAt(index - 1) === "+"
          || operations.textContent.charAt(index - 1) === "-")
            product = product * factor;
          else if (operations.textContent.charAt(index -1) === "÷")
            product = product / factor;
          console.log(product);

          //increment
          var factorLength = factor.toString().length;
          index = index + factorLength;
/*INCREMENT WORKS | 9*8-4 */ //console.log(index);
        }

        // if it's a multi/divide symbol, increment index by 1
        else if ( operations.textContent.charAt(index) === "x"
              ||  operations.textContent.charAt(index) === "÷")
              index++
      }
      equation.push(product);
    }


    // record add / subtract operation into equation array
      if (operations.textContent.charAt(index) === "+"
      || operations.textContent.charAt(index) === "-")
      {
        equation.push( operations.textContent.charAt(index) );
        index++;
      }
    }
    //console.log(equation);
    // solve equation w/ add/subtract
    var answer = equation[0];
    // in equation array: odd indices are operations, even indices are terms
    for (var term = 2; term < equation.length; term += 2) {
      // add
      if ( equation[term - 1] === "+") // if the element before this one is a plus sign
        answer += equation[term];
      // subtract
      else if ( equation[term - 1] === "-")
        answer -= equation[term];
    }
    result.textContent = answer.toString();
  }
