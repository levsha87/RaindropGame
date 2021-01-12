const playDuration = 30;


const game = {
  buttons: {
    buttonPlay: null,
    buttonShowHowPlay: null,
  },

  elements: {
    drop: null,
    keys: null,
    userResponse: null,
    screen: null,
    stones: null,
    score: null,
    sound: null,
    soundRightAnswer: null,
    soundWrongAnswer: null,
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
    expression: null,
  },

  init: function () {
    this.elements.drop = document.querySelector('.drop');
    this.buttons.buttonPlay = document.querySelector('.play');
    this.buttons.buttonShowHowPlay = document.querySelector('.howToPlay');
    this.elements.keys = document.querySelector('.keys');
    this.elements.screen = document.querySelector('.screen_number');
    this.elements.stones = document.querySelector('.stones');
    this.dropExpression.firstNumber = document.querySelector('.firstNumber');
    this.dropExpression.secondNumber = document.querySelector('.secondNumber');
    this.dropExpression.currentOperator = document.querySelector('.operator');
    this.elements.score = document.querySelector('.score__number');
    this.elements.sound = document.querySelector('.rains_sound');
    this.elements.soundRightAnswer = document.querySelector('.rigth_answer');
    this.elements.soundWrongAnswer = document.querySelector('.wrong_answer');
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
    this.elements.userResponse = this.elements.screen.innerHTML;
    let number = this.elements.userResponse;
    let newNumber = `${e.target.textContent}`;
    number += newNumber;

    if (number.length === 2 && number[0] === '0') {
      number = number.substring(1);
      this.elements.userResponse = number;
    }

    switch (newNumber) {
      case 'Enter':
        number = number.substring(0, number.length - 5);
        this.elements.userResponse = number;
        this.checkAnswer();
        number = 0;
        break;

      case 'Clear':
        number = number.substring(0, number.length - 6);
        if (number === '') {
          number = 0;
        }
        this.elements.userResponse = number;
        break;

      case 'Del':
        number = 0;
        this.elements.userResponse = number;
        break;
    }
    this.elements.screen.innerHTML = number;
  },

  buildExpression: function () {
    let currentOperator = this.getRandomOperator();
    let firstNumber = this.getRandomNumber();
    let secondNumber = this.getRandomNumber();
    switch (currentOperator) {
      case 0:
        currentOperator = '+';
        this.dropExpression.currentOperator.innerHTML = currentOperator;
        this.dropExpression.firstNumber.innerHTML = firstNumber;
        this.dropExpression.secondNumber.innerHTML = secondNumber;
        this.dropExpression.expression = firstNumber + secondNumber;
        break;

      case 1:
        currentOperator = '-';
        this.dropExpression.currentOperator.innerHTML = currentOperator;
        if (firstNumber >= secondNumber) {
          this.dropExpression.firstNumber.innerHTML = firstNumber;
          this.dropExpression.secondNumber.innerHTML = secondNumber;
          this.dropExpression.expression = firstNumber - secondNumber;
        } else {
          this.buildExpression();
        }
        break;

      case 2:
        currentOperator = '*';
        this.dropExpression.currentOperator.innerHTML = '×';
        this.dropExpression.firstNumber.innerHTML = firstNumber;
        this.dropExpression.secondNumber.innerHTML = secondNumber;
        this.dropExpression.expression = firstNumber * secondNumber;
        break;

      case 3:
        currentOperator = '/';
        if (firstNumber % secondNumber === 0 && secondNumber !== 0) {
          this.dropExpression.currentOperator.innerHTML = '÷';
          this.dropExpression.firstNumber.innerHTML = firstNumber;
          this.dropExpression.secondNumber.innerHTML = secondNumber;
          this.dropExpression.expression = firstNumber / secondNumber;
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
        this.elements.stones.getBoundingClientRect().y -
        this.elements.drop.offsetHeight
      }px`
    );
  },

  getTimeDropDown: function () {
    this.elements.drop.style.setProperty('--timeDropDown', '10s');
  },

  showHowToPlay: function () {
    this.startTimeGame ();
    console.log('exit');
  },

  startTimeGame: function () {
   let time = playDuration;
   console.log(time);
    this.playBackgroundSound();
    let timerId = setInterval(() => {
      time--;
      console.log(time);
      if (time === 0) {
        clearInterval(timerId);
        game.stopMoveDropDown();
        game.hideDrop();
        this.elements.sound.pause();
        alert(`Great! Your result ${this.elements.score.textContent}!`);
        location.reload();
      }
    }, 1000);
  },

  playBackgroundSound: function () {
    this.elements.sound.loop = 'loop';
    this.elements.sound.play();
  },

  showDrop: function () {
    this.elements.drop.classList.remove('hidden');
    game.getCoordinateStoneTop();
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

  checkAnswer: function () {
       if (
      this.dropExpression.expression === +this.elements.userResponse
    ) {
      console.log('right');
      game.stopMoveDropDown();
      game.hideDrop();
      this.elements.soundRightAnswer.play();
      this.elements.soundRightAnswer.currentTime = 0;
      this.setNumberPlusToScreen();
      setTimeout( () => {moveDrop();});
    } else {
      game.stopMoveDropDown();
      game.hideDrop();
      this.elements.soundWrongAnswer.play();
      this.elements.soundWrongAnswer.currentTime = 0;
      this.setNumberMinusToScreen();
      setTimeout( () => {moveDrop();});
    }
  },

  setNumberPlusToScreen: function () {
    let score = +this.elements.score.innerHTML;
    score += +this.elements.userResponse;
    this.elements.score.innerHTML = score;
  },

  setNumberMinusToScreen: function () {
    let score = +this.elements.score.innerHTML;
      score -= +this.dropExpression.expression;
      this.elements.score.innerHTML = score;
  }
};

game.init();

game.elements.keys.addEventListener('click', (e) => {
  game.getNumberKey(e);
});

game.buttons.buttonPlay.addEventListener('click', function () {
  game.hideButtons();
  game.startTimeGame();
  moveDrop();
});

game.buttons.buttonShowHowPlay.addEventListener('click', function () {
  game.hideButtons();
  moveDrop();
  game.showHowToPlay();
});

function moveDrop() {
  game.showDrop();
  game.buildExpression();
  game.moveDropDown();
  game.elements.drop.addEventListener('transitionend', function () {
    game.stopMoveDropDown();
    game.hideDrop();
    setTimeout( () => {
      moveDrop();
    }, 1);
  });
}
