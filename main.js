const PLAY_DURATION = 180;
const TIME_TOGGLE_MIDDLE_LEVEL = 140;
const TIME_TOGGLE_HARD_LEVEL = 60;
const DROWN_STEP_HEIGHT = 10;
const MINUS = '-';
const PLUS = '+';
const MULTUPLICATION_SIGN = '×';
const DIVISION_SIGN = '÷';

const SPEED_DROP = {
  SLOW: '10s',
  MEDIUM: '8s',
  FAST: '4s',
};

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
    waveContainer: null,
    waveDirection: true,
    sound: null,
    soundRightAnswer: null,
    soundWrongAnswer: null,
    videoHowPlay: null,
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
    this.buttons.buttonPlay = document.querySelector('.play-button');
    this.buttons.buttonShowHowPlay = document.querySelector('.how-play-button');

    this.elements.drop = document.querySelector('.drop');
    this.elements.keys = document.querySelector('.keys');
    this.elements.screen = document.querySelector('.control-panel__screen-number');
    this.elements.stones = document.querySelector('.stones');
    this.elements.waveContainer = document.querySelector('.wave');
    this.elements.wave = document.querySelector('.wave_animation');
    this.elements.sound = document.querySelector('.rains-sound');
    this.elements.soundRightAnswer = document.querySelector('.rigth-answer');
    this.elements.soundWrongAnswer = document.querySelector('.wrong-answer');
    this.elements.videoHowPlay = document.querySelector('.how-to-play-demo-video');

    this.gameState.firstNumberDrop = document.querySelector('.drop__numbers_first-number');
    this.gameState.secondNumberDrop = document.querySelector('.drop__numbers_second-number');
    this.gameState.currentOperatorDrop = document.querySelector('.drop-math-operator');
    this.gameState.score = document.querySelector('.window-score__number');
  },

  hideButtons: function () {
    this.buttons.buttonPlay.style.display = 'none';
    this.buttons.buttonShowHowPlay.style.display = 'none';
  },

  showButtons: function () {
    this.buttons.buttonPlay.style.display = 'block';
    this.buttons.buttonShowHowPlay.style.display = 'block';
  },

  showHowToPlay: function () {
    this.elements.videoHowPlay.style.display = 'block';
    this.elements.videoHowPlay.play();
  },

  stopVideoHowToPlay: function () {
    this.elements.videoHowPlay.pause();
    this.elements.videoHowPlay.style.display = 'none';
    this.showButtons();
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
        return PLUS;

      case 1:
        return MINUS;

      case 2:
        return MULTUPLICATION_SIGN;

      case 3:
        return DIVISION_SIGN;
    }
  },

  compileUserNumber: function (e) {
    this.gameState.userResponse = this.elements.screen.innerHTML;

    let currentNumber = this.gameState.userResponse;
    const newNumber = `${e.target.textContent}`;

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
      case PLUS:
        this.gameState.currentOperatorDrop.innerHTML = currentOperator;
        this.gameState.firstNumberDrop.innerHTML = firstNumber;
        this.gameState.secondNumberDrop.innerHTML = secondNumber;
        this.gameState.expressionDrop = firstNumber + secondNumber;
        break;

      case MINUS:
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

      case MULTUPLICATION_SIGN:
        this.gameState.currentOperatorDrop.innerHTML = currentOperator;
        this.gameState.firstNumberDrop.innerHTML = firstNumber;
        this.gameState.secondNumberDrop.innerHTML = secondNumber;
        this.gameState.expressionDrop = firstNumber * secondNumber;
        break;

      case DIVISION_SIGN:
        if (secondNumber !== 0) {
          firstNumber = firstNumber * secondNumber;
          this.gameState.currentOperatorDrop.innerHTML = currentOperator;
          this.gameState.firstNumberDrop.innerHTML = firstNumber;
          this.gameState.secondNumberDrop.innerHTML = secondNumber;
          this.gameState.expressionDrop = firstNumber / secondNumber;
        } 
        break;
    }
  },

  setCoordinateStoneTop: function () {
    this.elements.drop.style.setProperty(
      '--coordinataY',
      `${
        this.elements.stones.getBoundingClientRect().top  -
        this.elements.drop.getBoundingClientRect().height
      }px`
    );
  },

  setTimeDropDown: function (time) {
    let speed = SPEED_DROP.SLOW;
    switch (true) {
      case time <= TIME_TOGGLE_MIDDLE_LEVEL && time > TIME_TOGGLE_HARD_LEVEL:
        speed = SPEED_DROP.MEDIUM;
        break;

      case time <= TIME_TOGGLE_HARD_LEVEL:
        speed = SPEED_DROP.FAST;
        break;
    }

    this.elements.drop.style.setProperty('--timeDropDown', speed);
  },

  startWaveAnimation: function () {
    this.elements.wave.style.animationPlayState = 'running';
  },

  stopWaveAnimation: function () {
    this.elements.wave.style.animationPlayState = 'paused';
  },

  startTimeGame: function () {
    let time = PLAY_DURATION;

    this.playBackgroundSound();
    this.startWaveAnimation();

    let timerId = setInterval(() => {
      time--;
      this.setTimeDropDown(time);
      if (time === 0) {
        this.stopWaveAnimation();
        clearInterval(timerId);
        this.stopMoveDropDown();
        this.hideDrop();
        this.elements.sound.pause();
        alert(`Great! Your result ${this.gameState.score.textContent}!`);

        setTimeout(() => {
          location.reload();
        }, 1000);
      }
    }, 1000);
  },

  playBackgroundSound: function () {
    this.elements.sound.loop = 'loop';
    this.elements.sound.play();
  },

  showDrop: function () {
    this.elements.drop.classList.remove('drop_hidden');
    this.setCoordinateStoneTop();
  },

  moveDropDown: function () {
    this.elements.drop.classList.add('move-down');
  },

  stopMoveDropDown: function () {
    this.elements.drop.classList.remove('move-down');
  },

  hideDrop: function () {
    this.elements.drop.classList.add('drop_hidden');
  },

  checkAnswer: function () {
    if (this.gameState.expressionDrop === +this.gameState.userResponse) {
      this.stopMoveDropDown();
      this.hideDrop();
      this.elements.soundRightAnswer.play();
      this.elements.soundRightAnswer.currentTime = 0;
      this.setNumberPlusToScreen();
      setTimeout(() => {
        this.moveDrop();
      });
    } else {
      this.countWrongUserAnswer();
      this.stopMoveDropDown();
      this.hideDrop();
      this.elements.soundWrongAnswer.play();
      this.elements.soundWrongAnswer.currentTime = 0;
      this.setNumberMinusToScreen();
      setTimeout(() => {
        this.moveDrop();
      }, 1000);
    }
  },

  drownStonesWater: function () {
    switch (this.gameState.counterWrongAnswer) {
      case 1:
        for (let i = 0; i < this.elements.stones.children.length; i++) {
          this.elements.stones.children[i].classList.add('drownOne');
          this.elements.waveContainer.style.height = `${this.elements.waveContainer.offsetHeight + DROWN_STEP_HEIGHT}px` ;
        }
        break;
    
      case 2:
        for (let i = 0; i < this.elements.stones.children.length; i++) {
          this.elements.stones.children[i].classList.add('drownTwo');
          this.elements.waveContainer.style.height = `${this.elements.waveContainer.offsetHeight + DROWN_STEP_HEIGHT}px` ;
        }
        break;

      case 3:
        for (let i = 0; i < this.elements.stones.children.length; i++) {
          this.elements.stones.children[i].classList.add('drownThree');
          this.elements.waveContainer.style.height = `${this.elements.waveContainer.offsetHeight + DROWN_STEP_HEIGHT}px` ;
        }
        break;   
    }
  },

  countWrongUserAnswer: function () {
    this.gameState.counterWrongAnswer += 1;
    this.drownStonesWater();
    if (this.gameState.counterWrongAnswer === 3) {
      this.stopMoveDropDown();
      this.hideDrop();
      this.elements.sound.pause();
      setTimeout( () => {
        alert(`Great! Your result ${this.gameState.score.textContent}!`);
        location.reload();
      }, 1500);
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

  startGame: function () {
    this.buttons.buttonPlay.addEventListener('click',  () => {
      this.elements.keys.addEventListener('click', (e) => {
        this.compileUserNumber(e);
      });
      this.hideButtons();
      this.startTimeGame();
      this.startWaveAnimation();
      this.moveDrop();
    });
  },
 
  showVideoInstruction: function (){
    this.buttons.buttonShowHowPlay.addEventListener('click', (e) => {
      this.hideButtons();
      this.showHowToPlay();
    });
    this.elements.videoHowPlay.addEventListener('ended', () => {
      game.stopVideoHowToPlay();
    });
  },

  moveDrop: function () {
    
    this.showDrop();
    this.buildExpression();
    this.moveDropDown();
    this.elements.drop.addEventListener('transitionend',  () => {
      if(this.checkFallDropStone())
       {
          this.checkAnswer();
        }
      });
  },

  checkFallDropStone: function (){
    if (
      Math.trunc(game.elements.drop.getBoundingClientRect().bottom) ===
      Math.trunc(game.elements.stones.getBoundingClientRect().top)
      ) {
        return true;
      } else {
        return false;
      }
  }

};

game.init();
game.startGame();
game.showVideoInstruction();