/* function showDrop() {
drop.classList.remove('hidden');
}

function moveDropDown() {
drop.classList.add('move-down');
}

function hideDrop () {
    drop.classList.add('hidden');
} 
setInterval(() => {
    hideButtons();
    setTimeout(showDrop, 100);
    setTimeout(moveDropDown, 200);
    setTimeout(() => {
    drop.classList.remove('move-down');
    drop.classList.add('hidden');
    }, 1900);
}, 2000);
 */

const countNumbers = {
  buttons: {
    buttonPlay: null,
    buttonShowHowPlay: null,
  },

  elements: {
    drop: null,
    keys: null,
    screen: null,
  },

  numericRange: {
    min: 0,
    max: 10,
  },

  operatorMath: {
    0: '+',
    1: '-',
    2: '*',
    3: '/',
  },

  init: function () {
    this.elements.drop = document.querySelector('.drop');
    this.buttons.buttonPlay = document.querySelector('.play');
    this.buttons.buttonShowHowPlay = document.querySelector('.howToPlay');
    this.elements.keys = document.querySelector('.keys');
    this.elements.screen = document.querySelector('.screen_number');
    console.log(this.elements.keys);
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
    let operatorNumber = this.getRandomNumber();
    console.log(operatorNumber);
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
    /*first random number 
        operand
        second number*/
  },

  insertExpressionDrop: function () {},

  checkAnswer: function () {},
};

countNumbers.init();
countNumbers.hideButtons();
countNumbers.getRandomOperator(1, 4);
console.log(countNumbers.getRandomNumber());
countNumbers.elements.keys.addEventListener('click', (e) =>
  countNumbers.getNumberKey(e)
);
/*  */
