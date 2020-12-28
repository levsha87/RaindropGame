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

    },

    init: function (){
        this.drop = document.querySelector('.drop');
        this.buttonPlay = document.querySelector('.play');
        this.buttonShowHowPlay = document.querySelector('.howToPlay');
    },

    hideButtons: function () {
        this.buttonPlay.style.display ='none';
        this.buttonShowHowPlay.style.display ='none';
    },

};


countNumbers.init();
countNumbers.hideButtons();
