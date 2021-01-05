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
        expression = firstNumber + secondNumber;
        this.checkAnswer(expression);
        break;

      case 1:
        currentOperator = '-';
        this.dropExpression.currentOperator.innerHTML = currentOperator;
        if (firstNumber >= secondNumber) {
          this.dropExpression.firstNumber.innerHTML = firstNumber;
          this.dropExpression.secondNumber.innerHTML = secondNumber;
          expression = firstNumber - secondNumber;
          this.checkAnswer(expression);
        } else {
          this.buildExpression();
        }
        break;

      case 2:
        currentOperator = '*';
        this.dropExpression.currentOperator.innerHTML = '×';
        this.dropExpression.firstNumber.innerHTML = firstNumber;
        this.dropExpression.secondNumber.innerHTML = secondNumber;
        expression = firstNumber * secondNumber;
        this.checkAnswer(expression);
        break;

      case 3:
        currentOperator = '/';
        if (firstNumber % secondNumber === 0 && secondNumber !== 0) {
          this.dropExpression.currentOperator.innerHTML = '÷';
          this.dropExpression.firstNumber.innerHTML = firstNumber;
          this.dropExpression.secondNumber.innerHTML = secondNumber;
          expression = firstNumber / secondNumber;
          this.checkAnswer(expression);
        } else {
          this.buildExpression();
        }
        break;
    }
  },

  getCoordinateStoneTop: function () {
    this.elements.drop.style.setProperty(
      '--coordinataY',
      `${
        this.elements.stone.getBoundingClientRect().y -
        this.elements.drop.offsetHeight
      }px`
    );
  },

  getTimeDropDown: function () {
    this.elements.drop.style.setProperty ('--timeDropDown', '3s');
  },

  showDrop: function () {
    this.elements.drop.classList.remove('hidden');
    countNumbers.getCoordinateStoneTop();
    this.getTimeDropDown();
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

  checkAnswer: function (expression) {
    if (expression) {
      console.log(expression);
    }
  },
};

countNumbers.init();

countNumbers.elements.keys.addEventListener('click', (e) =>
  countNumbers.getNumberKey(e)
);

countNumbers.buttons.buttonPlay.addEventListener('click', function () {
  countNumbers.hideButtons();
  moveDropOneTimes ();
});

function moveDropOneTimes () {
  countNumbers.showDrop();
  countNumbers.buildExpression();
  countNumbers.moveDropDown();
  countNumbers.elements.drop.addEventListener('transitionend', function () {
    countNumbers.stopMoveDropDown();
    countNumbers.hideDrop();
  });
}