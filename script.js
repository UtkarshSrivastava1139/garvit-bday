// Confetti animation
function createConfettiPiece() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti-piece');
    confetti.style.position = 'absolute';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.animationDuration = (2 + Math.random() * 3) + 's';
    confetti.style.background = `hsl(${Math.random()*360}, 80%, 60%)`;
    confetti.style.width = confetti.style.height = (8 + Math.random()*8) + 'px';
    confetti.style.animation = 'confetti-fall ' + confetti.style.animationDuration + ' linear';
    document.querySelector('.confetti').appendChild(confetti);
    setTimeout(() => confetti.remove(), 5000);
}
setInterval(createConfettiPiece, 120);

// Add CSS animation for confetti
const style = document.createElement('style');
style.textContent = `
    @keyframes confetti-fall {
        0% { transform: translateY(-100vh) rotate(0deg); }
        100% { transform: translateY(100vh) rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Sound functions
function playHornSound() {
    const horn = document.getElementById('horn-sound');
    if (horn) {
        horn.currentTime = 0;
        horn.play().catch(e => console.log('Horn sound failed:', e));
    }
    // Create extra confetti burst
    for(let i = 0; i < 20; i++) {
        setTimeout(() => createConfettiPiece(), i * 50);
    }
}

function playCelebrationSound() {
    const celebration = document.getElementById('celebration-sound');
    if (celebration) {
        celebration.currentTime = 0;
        celebration.play().catch(e => console.log('Celebration sound failed:', e));
    }
    // Massive confetti burst
    for(let i = 0; i < 50; i++) {
        setTimeout(() => createConfettiPiece(), i * 30);
    }
}

// Sound toggle
let soundEnabled = true;
const soundToggle = document.getElementById('sound-toggle');
const bgMusic = document.getElementById('bg-music');

if (soundToggle) {
    soundToggle.addEventListener('click', function() {
        soundEnabled = !soundEnabled;
        if (soundEnabled) {
            bgMusic.play().catch(e => console.log('Background music failed:', e));
            soundToggle.textContent = '🔊';
        } else {
            bgMusic.pause();
            soundToggle.textContent = '🔇';
        }
    });
}

// Simple slider (auto-scroll)
let slider = document.querySelector('.slider');
let scrollAmount = 0;
setInterval(() => {
    if (slider) {
        scrollAmount += 200;
        if (scrollAmount > slider.scrollWidth - slider.clientWidth) scrollAmount = 0;
        slider.scrollTo({ left: scrollAmount, behavior: 'smooth' });
    }
}, 2500);

// Ensure music plays on mobile (user interaction)
document.body.addEventListener('click', function() {
    if (soundEnabled && bgMusic) {
        bgMusic.play().catch(e => console.log('Background music failed:', e));
    }
});
