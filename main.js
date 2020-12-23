const drop = document.querySelector('.drop');
const buttonPlay = document.querySelector('.play');
const buttonShowHowPlay = document.querySelector('.howToPlay');
console.log(drop);

function hideButtons() {
    buttonPlay.style.display ='none';
    buttonShowHowPlay.style.display ='none';
}

function showDrop() {
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



