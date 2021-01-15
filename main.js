const PLAY_DURATION = 30;

const game = {
  buttons: {
    buttonPlay: null,
    buttonShowHowPlay: null,
  },

  elements: {
    drop: null,
    keys: null,
    screen: null,
    stones: null,
    wave: null,
    waveDirection: true,
    sound: null,
    soundRightAnswer: null,
    soundWrongAnswer: null,
  },

  gameState: {
    userResponse: null,
    userWrongResponse: 0,
    score: null,
    counterWrongAnswer: 0,
    firstNumberDrop: null,
    secondNumberDrop: null,
    currentOperatorDrop: null,
    expressionDrop: null,
  },

  numericRange: {
    min: 0,
    max: 10,
  },

  numericRangeChooseRandomOperator: {
    min: 0,
    max: 3,
  },

  init: function () {
    this.buttons.buttonPlay = document.querySelector('.play');
    this.buttons.buttonShowHowPlay = document.querySelector('.howToPlay');

    this.elements.drop = document.querySelector('.drop');
    this.elements.keys = document.querySelector('.keys');
    this.elements.screen = document.querySelector('.screen_number');
    this.elements.stones = document.querySelector('.stones');
    this.elements.wave = document.querySelector('.wave_animation');
    this.elements.sound = document.querySelector('.rains_sound');
    this.elements.soundRightAnswer = document.querySelector('.rigth_answer');
    this.elements.soundWrongAnswer = document.querySelector('.wrong_answer');

    this.gameState.firstNumberDrop = document.querySelector('.firstNumber');
    this.gameState.secondNumberDrop = document.querySelector('.secondNumber');
    this.gameState.currentOperatorDrop = document.querySelector('.operator');
    this.gameState.score = document.querySelector('.score__number');
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
    let numberOperator = Math.round(
      Math.random() *
        (this.numericRangeChooseRandomOperator.max -
          this.numericRangeChooseRandomOperator.min) +
        this.numericRangeChooseRandomOperator.min
    );
    switch (numberOperator) {
      case 0:
        return '+';

      case 1:
        return '-';

      case 2:
        return '*';

      case 3:
        return '/';
    }
  },

  compileUserNumber: function (e) {
    this.gameState.userResponse = this.elements.screen.innerHTML;

    let currentNumber = this.gameState.userResponse;
    let newNumber = `${e.target.textContent}`;

    if (!isNaN(newNumber)) {
      currentNumber += newNumber;
    }

    if (currentNumber[0] === '0') {
      currentNumber = +currentNumber;
      this.gameState.userResponse = currentNumber;
    }

    switch (newNumber) {
      case 'Enter':
        this.gameState.userResponse = currentNumber;
        this.checkAnswer();
        currentNumber = 0;
        break;

      case 'Clear':
        currentNumber = currentNumber.substring(0, currentNumber.length - 1);
        if (currentNumber === '') {
          currentNumber = 0;
        }
        this.gameState.userResponse = currentNumber;
        break;

      case 'Del':
        currentNumber = 0;
        this.gameState.userResponse = currentNumber;
        break;
    }
    this.elements.screen.innerHTML = currentNumber;
  },

  buildExpression: function () {
    let currentOperator = this.getRandomOperator();
    let firstNumber = this.getRandomNumber();
    let secondNumber = this.getRandomNumber();
    switch (currentOperator) {
      case '+':
        this.gameState.currentOperatorDrop.innerHTML = currentOperator;
        this.gameState.firstNumberDrop.innerHTML = firstNumber;
        this.gameState.secondNumberDrop.innerHTML = secondNumber;
        this.gameState.expressionDrop = firstNumber + secondNumber;
        break;

      case '-':
        this.gameState.currentOperatorDrop.innerHTML = currentOperator;
        if (firstNumber >= secondNumber) {
          this.gameState.firstNumberDrop.innerHTML = firstNumber;
          this.gameState.secondNumberDrop.innerHTML = secondNumber;
          this.gameState.expressionDrop = firstNumber - secondNumber;
        } else {
          this.gameState.firstNumberDrop.innerHTML = secondNumber;
          this.gameState.secondNumberDrop.innerHTML = firstNumber;
          this.gameState.expressionDrop = secondNumber - firstNumber;
        }
        break;

      case '*':
        this.gameState.currentOperatorDrop.innerHTML = '×';
        this.gameState.firstNumberDrop.innerHTML = firstNumber;
        this.gameState.secondNumberDrop.innerHTML = secondNumber;
        this.gameState.expressionDrop = firstNumber * secondNumber;
        break;

      case '/':
        if (firstNumber % secondNumber === 0 && secondNumber !== 0) {
          this.gameState.currentOperatorDrop.innerHTML = '÷';
          this.gameState.firstNumberDrop.innerHTML = firstNumber;
          this.gameState.secondNumberDrop.innerHTML = secondNumber;
          this.gameState.expressionDrop = firstNumber / secondNumber;
        } else {
          this.buildExpression();
        }
        break;
    }
  },

  setCoordinateStoneTop: function () {
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
    this.startTimeGame();
    console.log('exit');
  },

  moveWave: function () {
    let x = 0;
    let timeWave = setInterval(() => {
      if (x >= 120 || x < 0) {
        this.elements.waveDirection = !this.elements.waveDirection;
      }
      if (this.elements.waveDirection) {
        x++;
      } else {
        x--;
      }
      this.elements.wave.setAttribute('viewBox', `${x} 0 500 150`);
    }, 30);
  },

  startTimeGame: function () {
    let time = PLAY_DURATION;
    console.log(time);
    this.playBackgroundSound();
    game.moveWave();
    let timerId = setInterval(() => {
      time--;
      console.log(time);
      if (time === 0) {
        clearInterval(timerId);
        game.stopMoveDropDown();
        game.hideDrop();
        this.elements.sound.pause();
        alert(`Great! Your result ${this.gameState.score.textContent}!`);
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
    game.setCoordinateStoneTop();
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
    if (this.gameState.expressionDrop === +this.gameState.userResponse) {
      console.log('right');
      game.stopMoveDropDown();
      game.hideDrop();
      this.elements.soundRightAnswer.play();
      this.elements.soundRightAnswer.currentTime = 0;
      this.setNumberPlusToScreen();
      setTimeout(() => {
        moveDrop();
      });
    } else {
      game.stopMoveDropDown();
      game.hideDrop();
      this.elements.soundWrongAnswer.play();
      this.elements.soundWrongAnswer.currentTime = 0;
      this.setNumberMinusToScreen();
      this.countWrongUserAnswer();
      setTimeout(() => {
        moveDrop();
      });
    }
  },

  countWrongUserAnswer: function () {
    this.gameState.counterWrongAnswer++;
    if (this.gameState.counterWrongAnswer === 3) {
      game.stopMoveDropDown();
      game.hideDrop();
      this.elements.sound.pause();
      alert(`Great! Your result ${this.gameState.score.textContent}!`);
      location.reload();
    }
  },

  setNumberPlusToScreen: function () {
    let score = +this.gameState.score.innerHTML;
    score += 10;
    this.gameState.score.innerHTML = score;
  },

  setNumberMinusToScreen: function () {
    let score = +this.gameState.score.innerHTML;
    score -= 5;
    if (score < 0) {
      score = 0;
    }
    this.gameState.score.innerHTML = score;
  },
};

game.init();

game.buttons.buttonPlay.addEventListener('click', function () {
  game.elements.keys.addEventListener('click', (e) => {
    game.compileUserNumber(e);
  });
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
    game.elements.soundWrongAnswer.play();
    game.elements.soundWrongAnswer.currentTime = 0;
    game.setNumberMinusToScreen();
    setTimeout(() => {
      moveDrop();
    });
  });
}
