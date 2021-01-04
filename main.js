const countNumbers = {
  buttons: {
    buttonPlay: null,
    buttonShowHowPlay: null,
  },

  elements: {
    drop: null,
    keys: null,
    screen: null,
    stone: null,
  },

  numericRange: {
    min: 0,
    max: 10,
  },

  operatorMath: {
    '+': 0,
    '-': 1,
    '*': 2,
    '/': 3,
  },

  dropExpression: {
    firstNumber: null,
    secondNumber: null,
    currentOperator: null,
  },

  init: function () {
    this.elements.drop = document.querySelector('.drop');
    this.buttons.buttonPlay = document.querySelector('.play');
    this.buttons.buttonShowHowPlay = document.querySelector('.howToPlay');
    this.elements.keys = document.querySelector('.keys');
    this.elements.screen = document.querySelector('.screen_number');
    this.elements.stone = document.querySelector('.stone');
    this.dropExpression.firstNumber = document.querySelector('.firstNumber');
    this.dropExpression.secondNumber = document.querySelector('.secondNumber');
    this.dropExpression.currentOperator = document.querySelector('.operator');
    console.log(this.dropExpression.firstNumber);
  },

  hideButtons: function () {
    this.buttons.buttonPlay.style.display = 'none';
    this.buttons.buttonShowHowPlay.style.display = 'none';
  },

  getRandomNumber: function () {
    return Math.round(
      Math.random() * (this.numericRange.max - this.numericRange.min) +
        this.numericRange.min
    );
  },

  getRandomOperator: function () {
    return Math.round(
      Math.random() * (this.operatorMath['+'] - this.operatorMath['/']) +
        this.operatorMath['/']
    );
  },

  getNumberKey: function (e) {
    let number = this.elements.screen.innerHTML;
    let newNumber = `${e.target.textContent}`;
    number += newNumber;

    if (number.length === 2 && number[0] === '0') {
      number = number.substring(1);
    }

    switch (newNumber) {
      case 'Enter':
        number = number.substring(0, number.length - 5);
        break;

      case 'Clear':
        number = number.substring(0, number.length - 6);
        if (number === '') {
          number = 0;
        }
        break;

      case 'Del':
        number = 0;
        break;
    }
    this.elements.screen.innerHTML = number;
  },

  buildExpression: function () {
    let expression = '';
    let currentOperator = this.getRandomOperator();
    let firstNumber = this.getRandomNumber();
    let secondNumber = this.getRandomNumber();
    switch (currentOperator) {
      case 0:
        currentOperator = '+';
        this.dropExpression.currentOperator.innerHTML = currentOperator;
        this.dropExpression.firstNumber.innerHTML = firstNumber;
        this.dropExpression.secondNumber.innerHTML = secondNumber;
        expression = `${firstNumber}${currentOperator}${secondNumber}`;
        break;

      case 1:
        currentOperator = '-';
        this.dropExpression.currentOperator.innerHTML = currentOperator;
        console.log(firstNumber, secondNumber);
        if (firstNumber < secondNumber) {
          this.dropExpression.firstNumber.innerHTML = secondNumber;
          this.dropExpression.secondNumber.innerHTML = firstNumber;
          expression = `${secondNumber}${currentOperator}${firstNumber}`;
        } else {
          this.dropExpression.firstNumber.innerHTML = firstNumber;
          this.dropExpression.secondNumber.innerHTML = secondNumber;
          expression = `${firstNumber}${currentOperator}${secondNumber}`;
        }
        break;

      case 2:
        currentOperator = '*';
        this.dropExpression.currentOperator.innerHTML = '×';
        this.dropExpression.firstNumber.innerHTML = firstNumber;
        this.dropExpression.secondNumber.innerHTML = secondNumber;
        expression = `${firstNumber}${currentOperator}${secondNumber}`;
        break;

      case 3:
        currentOperator = '/';
        console.log(firstNumber, secondNumber);
        if (firstNumber % secondNumber !== 0 || secondNumber === 0) {
          break;
        }
        this.dropExpression.currentOperator.innerHTML = '÷';
        this.dropExpression.firstNumber.innerHTML = firstNumber;
        this.dropExpression.secondNumber.innerHTML = secondNumber;
        expression = `${firstNumber}${currentOperator}${secondNumber}`;
        break;
    }
  },

  getCoordinateStoneTop: function (){
    console.log(this.elements.stone.getBoundingClientRect().y);
    this.elements.drop.style.setProperty('--coordinataY', this.elements.stone.getBoundingClientRect().y + 'px');
  },

  showDrop: function () {
    this.elements.drop.classList.remove('hidden');
  },

  moveDropDown: function () {
    this.elements.drop.classList.add('move-down');
  },

  stopMoveDropDown: function () {
    this.elements.drop.classList.remove('move-down');
  },

  hideDrop: function () {
    this.elements.drop.classList.add('hidden');
  },

  

  checkAnswer: function () {},
};

countNumbers.init();
countNumbers.getCoordinateStoneTop();
countNumbers.elements.keys.addEventListener('click', (e) =>
  countNumbers.getNumberKey(e)
);

countNumbers.buttons.buttonPlay.addEventListener('click', function () {
  countNumbers.hideButtons();
  setInterval(() => {
    setTimeout(() => {
      countNumbers.showDrop();
      countNumbers.buildExpression();
    }, 0);

    setTimeout(() => {
      countNumbers.moveDropDown();
    }, 100);

    setTimeout(() => {
      countNumbers.stopMoveDropDown();
      countNumbers.hideDrop();
    }, 3000);
  }, 3100);
});
