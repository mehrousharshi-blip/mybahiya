let currentScreen = 0;

function changeScreen(targetIndex) {
    const currentEl = document.getElementById(`screen-${currentScreen}`);
    const targetEl = document.getElementById(`screen-${targetIndex}`);
    if (currentEl) currentEl.className = "screen-hidden";
    if (targetEl) targetEl.className = "screen-active";
    currentScreen = targetIndex;
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
            if (progressBar) progressBar.style.width = width + '%';
        }
    }, 50);
}

let cakeStage = 0;
function decorateCake() {
    const actionBtn = document.getElementById('cake-action-btn');
    if (cakeStage === 0) {
        const cream = document.getElementById('cake-cream');
        if (cream) cream.classList.remove('hidden');
        if (actionBtn) actionBtn.innerText = "🔥 Light the Candle";
        cakeStage = 1;
    } else if (cakeStage === 1) {
        const candle = document.getElementById('cake-candle');
        if (candle) candle.classList.remove('hidden');
        if (actionBtn) {
            actionBtn.innerText = "Blow the Candle 💨";
            actionBtn.onclick = null;
        }
        cakeStage = 2;
    }
}

function blowCandle() {
    const flame = document.getElementById('candle-flame');
    if (flame) flame.style.display = 'none';
    
    const actionBtn = document.getElementById('cake-action-btn');
    if (actionBtn) {
        actionBtn.innerText = "Next Chapter ➔";
        actionBtn.onclick = nextScreen;
    }
}

let totalBalloons = 4;
let messageArray = [];
function popBalloon(element, word) {
    if (element) {
        element.style.visibility = 'hidden';
        element.style.pointerEvents = 'none';
    }
    messageArray.push(word);
    
    const revText = document.getElementById('revealed-text');
    const counter = document.getElementById('balloon-counter');
    const nextBtn = document.getElementById('balloon-next-btn');
    
    if (revText) revText.innerText = messageArray.join(" ");
    totalBalloons--;
    if (counter) counter.innerText = `Balloons Left: ${totalBalloons}`;
    
    if (totalBalloons === 0) {
        if (nextBtn) nextBtn.disabled = false;
    }
}

function openGift() {
    setTimeout(() => { nextScreen(); }, 300);
}

function restartCelebration() {
    cakeStage = 0;
    totalBalloons = 4;
    messageArray = [];
    
    const flame = document.getElementById('candle-flame');
    const candle = document.getElementById('cake-candle');
    const cream = document.getElementById('cake-cream');
    const cakeBtn = document.getElementById('cake-action-btn');
    const counter = document.getElementById('balloon-counter');
    const revText = document.getElementById('revealed-text');
    const nextBtn = document.getElementById('balloon-next-btn');
    
    if (flame) flame.style.display = 'block';
    if (candle) candle.classList.add('hidden');
    if (cream) cream.classList.add('hidden');
    
    if (cakeBtn) {
        cakeBtn.innerText = "✨ Decorate Cake";
        cakeBtn.onclick = decorateCake;
    }

    document.querySelectorAll('.balloon-item').forEach(b => {
        b.style.visibility = 'visible';
        b.style.pointerEvents = 'auto';
    });
    if (counter) counter.innerText = "Balloons Left: 4";
    if (revText) revText.innerText = "";
    if (nextBtn) nextBtn.disabled = true;
    
    changeScreen(0);
}
