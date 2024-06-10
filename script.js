const gameContainer = document.querySelector('.game-container');
const player = document.querySelector('.player');
const scoreDisplay = document.querySelector('.score');
let score = 0;

document.addEventListener('keydown', (e) => {
    const left = player.offsetLeft;
    if (e.key === 'ArrowLeft' && left > 0) {
        player.style.left = `${left - 20}px`;
    } else if (e.key === 'ArrowRight' && left < gameContainer.clientWidth - player.clientWidth) {
        player.style.left = `${left + 20}px`;
    }
});

function createFallingObject() {
    const object = document.createElement('div');
    object.className = 'falling-object';
    object.style.left = `${Math.random() * (gameContainer.clientWidth - 20)}px`;
    object.style.animationDuration = `${2 + Math.random() * 3}s`;
    gameContainer.appendChild(object);

    object.addEventListener('animationend', () => {
        if (isCaught(object)) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }
        object.remove();
    });
}

function isCaught(object) {
    const playerRect = player.getBoundingClientRect();
    const objectRect = object.getBoundingClientRect();
    return (
        objectRect.bottom >= playerRect.top &&
        objectRect.left >= playerRect.left &&
        objectRect.right <= playerRect.right
    );
}

setInterval(createFallingObject, 1000);
