let currentScreen = 0;

const audio = document.getElementById('bg-audio');
const musicBtn = document.getElementById('music-btn');
const musicIcon = document.getElementById('music-icon');
const musicText = document.getElementById('music-text');

musicBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().catch(err => console.log("Audio deferred:", err));
        musicIcon.innerText = "⏸";
        musicText.innerText = "Pause Music";
        musicBtn.classList.add('bg-emerald-500/20', 'border-emerald-500/30', 'text-emerald-300');
    } else {
        audio.pause();
        musicIcon.innerText = "🎵";
        musicText.innerText = "Play Music";
        musicBtn.classList.remove('bg-emerald-500/20', 'border-emerald-500/30', 'text-emerald-300');
    }
});

function changeScreen(targetIndex) {
    document.getElementById(`screen-${currentScreen}`).className = "screen-hidden";
    currentScreen = targetIndex;
    document.getElementById(`screen-${currentScreen}`).className = "screen-active";
}

function nextScreen() {
    if (currentScreen < 7) changeScreen(currentScreen + 1);
}

function startLoading() {
    changeScreen(1);
    let progressBar = document.getElementById('loading-bar');
    let width = 0;
    let interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            setTimeout(() => { changeScreen(2); }, 300);
        } else {
            width += 4;
            progressBar.style.width = width + '%';
        }
    }, 80);
}

let cakeStage = 0;
function decorateCake() {
    const actionBtn = document.getElementById('cake-action-btn');
    if (cakeStage === 0) {
        document.getElementById('cake-cream').classList.remove('hidden');
        actionBtn.innerText = "🔥 Light the Candle";
        cakeStage = 1;
    } else if (cakeStage === 1) {
        document.getElementById('cake-candle').classList.remove('hidden');
        actionBtn.innerText = "Blow the Candle💨";
        actionBtn.onclick = null;
        cakeStage = 2;
    }
}

function blowCandle() {
    document.getElementById('candle-flame').style.display = 'none';
    confetti({ particleCount: 100, spread: 60, origin: { y: 0.6 } });
    
    const actionBtn = document.getElementById('cake-action-btn');
    actionBtn.innerText = "Next Chapter ➔";
    actionBtn.onclick = nextScreen;
}

let totalBalloons = 4;
let messageArray = [];
function popBalloon(element, word) {
    element.style.visibility = 'hidden';
    element.style.pointerEvents = 'none';
    messageArray.push(word);
    
    document.getElementById('revealed-text').innerText = messageArray.join(" ");
    totalBalloons--;
    document.getElementById('balloon-counter').innerText = `Balloons Left: ${totalBalloons}`;
    
    if (totalBalloons === 0) {
        document.getElementById('balloon-next-btn').disabled = false;
        confetti({ particleCount: 50, spread: 40 });
    }
}

function openGift() {
    confetti({ particleCount: 180, spread: 100 });
    setTimeout(() => { nextScreen(); }, 400);
}

function restartCelebration() {
    cakeStage = 0;
    totalBalloons = 4;
    messageArray = [];
    
    document.getElementById('candle-flame').style.display = 'block';
    document.getElementById('cake-candle').classList.add('hidden');
    document.getElementById('cake-cream').classList.add('hidden');
    
    const cakeBtn = document.getElementById('cake-action-btn');
    cakeBtn.innerText = "✨ Decorate Cake";
    cakeBtn.onclick = decorateCake;

    document.querySelectorAll('.balloon-item').forEach(b => {
        b.style.visibility = 'visible';
        b.style.pointerEvents = 'auto';
    });
    document.getElementById('balloon-counter').innerText = "Balloons Left: 4";
    document.getElementById('revealed-text').innerText = "";
    document.getElementById('balloon-next-btn').disabled = true;
    
    changeScreen(0);
}
