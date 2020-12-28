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
        buttonShowHowPlay: null
    },

    elements: {
        drop: null,
        keys: null
    },

    init: function (){
        this.elements.drop = document.querySelector('.drop');
        this.buttons.buttonPlay = document.querySelector('.play');
        this.buttons.buttonShowHowPlay = document.querySelector('.howToPlay');
        this.elements.keys = document.querySelectorAll('.key');
    },

    hideButtons: function () {
        this.buttons.buttonPlay.style.display ='none';
        this.buttons.buttonShowHowPlay.style.display ='none';
    },

    enterAnswer: function(){
        this.elements.keys.forEach((elem) => elem.addEventListener('click', function (){
            console.log(`${elem.textContent}`);
        }));
    },

    buildExpression: function(){
        /*first random number 
        operand
        second number*/
    },

    insertExpressionDrop: function(){ 

    }, 

    checkAnswer: function () {

    },





};


countNumbers.init();
countNumbers.hideButtons();
countNumbers.enterAnswer();