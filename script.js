// ========================================
// ENHANCED ROSE DAY - IMPROVED NAVIGATION
// ========================================

// ===== GLOBAL VARIABLES =====
let currentSection = 1;
let musicPlaying = false;
let isTransitioning = false;
const totalSections = 6;

// ===== DOM ELEMENTS =====
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicIcon = document.querySelector('.music-icon');
const muteIcon = document.querySelector('.mute-icon');
const mainContainer = document.getElementById('mainContainer');
const progressDots = document.querySelectorAll('.progress-dot');

// ===== MUSIC CONTROL =====
function toggleMusic() {
    if (musicPlaying) {
        bgMusic.pause();
        musicIcon.classList.add('hidden');
        muteIcon.classList.remove('hidden');
        musicPlaying = false;
    } else {
        bgMusic.play().catch(e => console.log('Audio play prevented:', e));
        musicIcon.classList.remove('hidden');
        muteIcon.classList.add('hidden');
        musicPlaying = true;
    }
}

musicToggle.addEventListener('click', toggleMusic);

// Keep music playing
bgMusic.addEventListener('ended', function() {
    if (musicPlaying) {
        this.currentTime = 0;
        this.play().catch(e => console.log('Audio replay prevented:', e));
    }
});

// ===== FLOATING ROSE PETALS ANIMATION =====
function createPetal() {
    const petalsContainer = document.getElementById('petalsContainer');
    if (!petalsContainer) return;
    
    const petal = document.createElement('div');
    petal.className = 'petal-fall';
    
    const randomX = Math.random() * window.innerWidth;
    petal.style.left = randomX + 'px';
    
    const duration = 10 + Math.random() * 8;
    petal.style.animationDuration = duration + 's';
    
    const delay = Math.random() * 2;
    petal.style.animationDelay = delay + 's';
    
    const size = 10 + Math.random() * 6;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';
    
    petalsContainer.appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, (duration + delay) * 1000);
}

function initPetals() {
    for (let i = 0; i < 30; i++) {
        setTimeout(createPetal, i * 200);
    }
    setInterval(createPetal, 800);
}

// ===== FLOATING HEARTS ANIMATION =====
function createHeart() {
    const heartsContainer = document.getElementById('heartsContainer');
    if (!heartsContainer) return;
    
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = ['❤️', '💕', '💖', '💗', '💓'][Math.floor(Math.random() * 5)];
    
    const randomX = Math.random() * window.innerWidth;
    heart.style.left = randomX + 'px';
    heart.style.bottom = '0';
    
    const duration = 16 + Math.random() * 6;
    heart.style.animationDuration = duration + 's';
    
    const delay = Math.random() * 4;
    heart.style.animationDelay = delay + 's';
    
    heartsContainer.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, (duration + delay) * 1000);
}

function initHearts() {
    for (let i = 0; i < 6; i++) {
        setTimeout(createHeart, i * 600);
    }
    setInterval(createHeart, 4000);
}

// ===== SECTION NAVIGATION =====
function showSection(sectionNumber) {
    if (isTransitioning || sectionNumber < 1 || sectionNumber > totalSections) {
        return;
    }
    
    if (sectionNumber === currentSection) {
        return;
    }
    
    isTransitioning = true;
    
    // Get current and next sections
    const currentSectionEl = document.getElementById('section' + currentSection);
    const nextSectionEl = document.getElementById('section' + sectionNumber);
    
    if (!nextSectionEl) {
        isTransitioning = false;
        return;
    }
    
    // Exit current section
    if (currentSectionEl) {
        currentSectionEl.classList.add('exiting');
        currentSectionEl.classList.remove('active');
    }
    
    // Enter next section
    setTimeout(() => {
        if (currentSectionEl) {
            currentSectionEl.classList.remove('exiting');
        }
        
        nextSectionEl.classList.add('active');
        currentSection = sectionNumber;
        
        updateProgressDots();
        handleSectionAnimations(sectionNumber);
        
        setTimeout(() => {
            isTransitioning = false;
        }, 300);
    }, 100);
}

// ===== PROGRESS DOTS UPDATE =====
function updateProgressDots() {
    progressDots.forEach((dot, index) => {
        if (index + 1 === currentSection) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

// Add click handlers to progress dots
progressDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSection(index + 1);
    });
});

// ===== SECTION-SPECIFIC ANIMATIONS =====
function handleSectionAnimations(sectionNumber) {
    switch(sectionNumber) {
        case 2:
            animateSection2();
            break;
        case 3:
            animateSection3();
            break;
        case 4:
            animateSection4();
            break;
        case 5:
            animateSection5();
            break;
    }
}

// Section 2: Reveal text line by line
function animateSection2() {
    const revealTexts = document.querySelectorAll('#section2 .reveal-text');
    const nextBtn = document.getElementById('nextBtn2');
    
    revealTexts.forEach((text, index) => {
        const delay = parseInt(text.getAttribute('data-delay'));
        setTimeout(() => {
            text.classList.add('visible');
        }, delay);
    });
    
    setTimeout(() => {
        if (nextBtn) {
            nextBtn.classList.remove('hidden');
        }
    }, 6500);
}

// Section 3: Journey animations
function animateSection3() {
    const nextBtn = document.getElementById('nextBtn3');
    
    setTimeout(() => {
        if (nextBtn) {
            nextBtn.classList.remove('hidden');
        }
    }, 4000);
}

// Section 4: Rose message animations
function animateSection4() {
    const nextBtn = document.getElementById('nextBtn4');
    
    setTimeout(() => {
        if (nextBtn) {
            nextBtn.classList.remove('hidden');
        }
    }, 5500);
}

// Section 5: Emotional message
function animateSection5() {
    const emotionalText = document.querySelector('#section5 .emotional-text');
    const nextBtn = document.getElementById('nextBtn5');
    
    setTimeout(() => {
        if (emotionalText) {
            emotionalText.classList.add('visible');
        }
    }, 800);
    
    setTimeout(() => {
        if (nextBtn) {
            nextBtn.classList.remove('hidden');
        }
    }, 3500);
}

// ===== BUTTON EVENT HANDLERS =====

// Section 1: Begin button
document.getElementById('beginBtn').addEventListener('click', () => {
    if (!musicPlaying) {
        bgMusic.play().catch(e => console.log('Audio play prevented:', e));
        musicPlaying = true;
    }
    showSection(2);
});

// Next buttons
document.getElementById('nextBtn2')?.addEventListener('click', () => showSection(3));
document.getElementById('nextBtn3')?.addEventListener('click', () => showSection(4));
document.getElementById('nextBtn4')?.addEventListener('click', () => showSection(5));
document.getElementById('nextBtn5')?.addEventListener('click', () => showSection(6));

// Section 6: Answer buttons
document.getElementById('yesBtn')?.addEventListener('click', showFinalMessage);
document.getElementById('alwaysBtn')?.addEventListener('click', showFinalMessage);

// Restart button
document.getElementById('restartBtn')?.addEventListener('click', () => {
    const finalMessage = document.getElementById('finalMessage');
    if (finalMessage) {
        finalMessage.classList.remove('visible');
        
        setTimeout(() => {
            finalMessage.classList.add('hidden');
            
            // Remove body class
            document.body.classList.remove('final-message-shown');
            
            // Restore progress indicator
            document.querySelector('.progress-indicator').style.opacity = '1';
            
            showSection(1);
            
            // Reset all reveal texts
            document.querySelectorAll('.reveal-text').forEach(text => {
                text.classList.remove('visible');
            });
            
            // Hide all next buttons
            document.querySelectorAll('.next-btn').forEach(btn => {
                btn.classList.add('hidden');
            });
        }, 1500);
    }
});

// ===== FINAL MESSAGE =====
function showFinalMessage() {
    const finalMessage = document.getElementById('finalMessage');
    if (!finalMessage) return;
    
    // Add class to body to hide all sections
    document.body.classList.add('final-message-shown');
    
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.visibility = 'hidden';
    });
    
    // Hide progress indicator and music button
    document.querySelector('.progress-indicator').style.opacity = '0';
    
    finalMessage.classList.remove('hidden');
    
    createBurstAnimation();
    createConfetti();
    
    setTimeout(() => {
        finalMessage.classList.add('visible');
    }, 100);
}

// ===== BURST ANIMATION =====
function createBurstAnimation() {
    const burstContainer = document.getElementById('burstContainer');
    if (!burstContainer) return;
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const petalCount = 60;
    
    for (let i = 0; i < petalCount; i++) {
        const petal = document.createElement('div');
        petal.className = 'burst-petal';
        
        const angle = (Math.PI * 2 * i) / petalCount;
        const distance = 150 + Math.random() * 400;
        
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        petal.style.left = centerX + 'px';
        petal.style.top = centerY + 'px';
        petal.style.setProperty('--tx', tx + 'px');
        petal.style.setProperty('--ty', ty + 'px');
        petal.style.animationDelay = (Math.random() * 0.3) + 's';
        
        burstContainer.appendChild(petal);
        
        setTimeout(() => {
            petal.remove();
        }, 4500);
    }
}

// ===== CONFETTI ANIMATION =====
function createConfetti() {
    const confettiContainer = document.getElementById('confettiContainer');
    if (!confettiContainer) return;
    
    const colors = ['#ff6b9d', '#c44569', '#ffb6c1', '#ff1493', '#ffd700'];
    const confettiCount = 80;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        
        const randomX = Math.random() * window.innerWidth;
        confetti.style.left = randomX + 'px';
        confetti.style.top = '-20px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        const duration = 3 + Math.random() * 2.5;
        confetti.style.animationDuration = duration + 's';
        confetti.style.animationDelay = (Math.random() * 0.8) + 's';
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, (duration + 1) * 1000);
    }
}

// ===== SWIPE GESTURE HANDLING (Mobile) =====
let touchStartY = 0;
let touchEndY = 0;
let touchStartX = 0;
let touchEndX = 0;

mainContainer.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
    touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

mainContainer.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, { passive: true });

function handleSwipe() {
    const verticalDiff = touchStartY - touchEndY;
    const horizontalDiff = Math.abs(touchStartX - touchEndX);
    
    // Only trigger if vertical swipe is dominant
    if (Math.abs(verticalDiff) > horizontalDiff && Math.abs(verticalDiff) > 80) {
        if (verticalDiff > 0 && currentSection < totalSections) {
            // Swipe up - next section
            showSection(currentSection + 1);
        } else if (verticalDiff < 0 && currentSection > 1) {
            // Swipe down - previous section
            showSection(currentSection - 1);
        }
    }
}

// ===== KEYBOARD NAVIGATION =====
document.addEventListener('keydown', (e) => {
    if (isTransitioning) return;
    
    switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
            e.preventDefault();
            if (currentSection < totalSections) {
                showSection(currentSection + 1);
            }
            break;
        case 'ArrowUp':
        case 'PageUp':
            e.preventDefault();
            if (currentSection > 1) {
                showSection(currentSection - 1);
            }
            break;
        case 'Home':
            e.preventDefault();
            showSection(1);
            break;
        case 'End':
            e.preventDefault();
            showSection(totalSections);
            break;
    }
});

// ===== PREVENT UNWANTED SCROLLING =====
let lastScrollTop = 0;
let scrollTimeout;

// Disable scroll on main container
mainContainer.addEventListener('wheel', (e) => {
    e.preventDefault();
    
    if (isTransitioning) return;
    
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0 && currentSection < totalSections) {
            // Scroll down
            showSection(currentSection + 1);
        } else if (e.deltaY < 0 && currentSection > 1) {
            // Scroll up
            showSection(currentSection - 1);
        }
    }, 150);
}, { passive: false });

// Prevent body scroll
document.body.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

// ===== VISIBILITY CHANGE HANDLER =====
document.addEventListener('visibilitychange', () => {
    if (!document.hidden && musicPlaying && bgMusic.paused) {
        bgMusic.play().catch(e => console.log('Audio play prevented:', e));
    }
});

// ===== EASTER EGG: Double tap on rose =====
let tapCount = 0;
let tapTimer;

const roseWrapper = document.querySelector('.rose-wrapper');
if (roseWrapper) {
    roseWrapper.addEventListener('click', () => {
        tapCount++;
        
        if (tapCount === 1) {
            tapTimer = setTimeout(() => {
                tapCount = 0;
            }, 300);
        } else if (tapCount === 2) {
            clearTimeout(tapTimer);
            tapCount = 0;
            
            // Easter egg: Extra rose animation
            roseWrapper.style.animation = 'roseGrowIn 2s ease, roseRotate 3s linear';
            
            // Create extra burst of petals
            for (let i = 0; i < 15; i++) {
                setTimeout(createPetal, i * 80);
            }
        }
    });
}

// ===== INITIALIZE ON PAGE LOAD =====
document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations
    initPetals();
    initHearts();
    
    // Set first section as active
    showSection(1);
    updateProgressDots();
    
    // Set up music
    bgMusic.loop = true;
    bgMusic.preload = 'auto';
    
    // Periodic music check
    setInterval(() => {
        if (musicPlaying && bgMusic.paused && !document.hidden) {
            bgMusic.play().catch(e => console.log('Audio auto-resume prevented:', e));
        }
    }, 5000);
    
    // Accessibility
    document.getElementById('beginBtn')?.setAttribute('aria-label', 'Begin the romantic journey');
    document.getElementById('yesBtn')?.setAttribute('aria-label', 'Answer yes');
    document.getElementById('alwaysBtn')?.setAttribute('aria-label', 'Answer always');
    musicToggle.setAttribute('aria-label', 'Toggle background music');
    
    // Log message
    console.log('%c🌹 Happy Rose Day, Sanjida! 🌹', 'color: #ff6b9d; font-size: 24px; font-weight: bold;');
});

// ===== ERROR HANDLING =====
bgMusic.addEventListener('error', (e) => {
    console.log('Audio loading error - music features disabled');
    musicToggle.style.display = 'none';
});

// ===== ORIENTATION CHANGE HANDLER =====
window.addEventListener('orientationchange', () => {
    // Recalculate positions after orientation change
    setTimeout(() => {
        updateProgressDots();
    }, 300);
});

// ===== PREVENT ACCIDENTAL NAVIGATION =====
window.addEventListener('beforeunload', (e) => {
    if (currentSection > 1 && currentSection < totalSections) {
        e.preventDefault();
        e.returnValue = '';
    }
});

// ===== PERFORMANCE OPTIMIZATION =====
// Use passive event listeners where possible
const passiveSupported = (() => {
    let passive = false;
    try {
        const options = {
            get passive() {
                passive = true;
                return false;
            }
        };
        window.addEventListener('test', null, options);
        window.removeEventListener('test', null, options);
    } catch (err) {
        passive = false;
    }
    return passive;
})();

// Throttle resize events
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        updateProgressDots();
    }, 250);
}, passiveSupported ? { passive: true } : false);