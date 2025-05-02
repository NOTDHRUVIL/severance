document.addEventListener('DOMContentLoaded', () => {
    // --- Elements ---
    const body = document.body;
    const accessPoint = document.getElementById('access-point');
    const innieAccessBtn = document.getElementById('innie-access-btn');
    const outieAccessBtn = document.getElementById('outie-access-btn');
    const transitionScreen = document.getElementById('transition-screen');
    const transitionSpinner = transitionScreen.querySelector('.spinner');
    const transitionText = document.getElementById('transition-text');
    const interfaceContainer = document.getElementById('interface-container');
    const innieView = document.getElementById('innie-view');
    const outieView = document.getElementById('outie-view');
    const numberGridBg = document.getElementById('number-grid-background');
    const mdrOverlay = document.querySelector('.mdr-content-overlay'); // Scroll container
    const backgroundMusic = document.getElementById('background-music');
    // const hoverSound = document.getElementById('hover-sound'); // Optional sound

    // --- State & Config ---
    let musicStarted = false;
    let currentHovered = null;
    let currentNeighbors = [];
    const NUM_ROWS = 35; // Adjust density as needed
    const NUM_COLS = 70; // Adjust density
    const NEIGHBOR_RADIUS = 2; // How far the ripple effect reaches
    const TRANSITION_FADE_DURATION = 600;
    const VIEW_LOAD_DELAY = 100;

    // --- MDR Grid Generation ---
    function createNumberGrid() {
        if (!numberGridBg) return;
        const fragment = document.createDocumentFragment();
        numberGridBg.innerHTML = ''; // Clear previous grid
        numberGridBg.style.gridTemplateColumns = `repeat(${NUM_COLS}, auto)`; // CSS Grid setup

        for (let r = 0; r < NUM_ROWS; r++) {
            for (let c = 0; c < NUM_COLS; c++) {
                const span = document.createElement('span');
                span.textContent = Math.floor(Math.random() * 10);
                span.dataset.row = r;
                span.dataset.col = c;
                fragment.appendChild(span);
            }
        }
        numberGridBg.appendChild(fragment);
    }

    // --- MDR Hover Effect Logic ---
    function handleGridHover(event) {
        const target = event.target;

        if (target && target.tagName === 'SPAN' && numberGridBg.contains(target)) {
            // if (hoverSound) { // Optional sound playback
            //     hoverSound.currentTime = 0;
            //     hoverSound.play().catch(e => {}); // Ignore play errors
            // }

            const targetRow = parseInt(target.dataset.row, 10);
            const targetCol = parseInt(target.dataset.col, 10);

            // Clear previous effects efficiently
            if (currentHovered) currentHovered.classList.remove('hovered');
            currentNeighbors.forEach(neighbor => neighbor.classList.remove('neighbor-1', 'neighbor-2'));

            // Apply effect to current target
            target.classList.add('hovered');
            currentHovered = target;
            currentNeighbors = []; // Reset neighbors array

            // Apply effect to neighbors
            const spans = numberGridBg.children; // More efficient than querySelectorAll
            for (let i = 0; i < spans.length; i++) {
                 const span = spans[i];
                 const row = parseInt(span.dataset.row, 10);
                 const col = parseInt(span.dataset.col, 10);
                 const distance = Math.max(Math.abs(row - targetRow), Math.abs(col - targetCol));

                 if (distance > 0 && distance <= NEIGHBOR_RADIUS) {
                     if (distance === 1) {
                         span.classList.add('neighbor-1');
                     } else if (distance === 2) {
                         span.classList.add('neighbor-2');
                     }
                     currentNeighbors.push(span);
                 }
             }

        } else {
            // If hovering off a span or onto the container background
            clearGridHoverEffects();
        }
    }

    function clearGridHoverEffects() {
        if (currentHovered) {
            currentHovered.classList.remove('hovered');
            currentHovered = null;
        }
        currentNeighbors.forEach(neighbor => neighbor.classList.remove('neighbor-1', 'neighbor-2'));
        currentNeighbors = [];
    }


    // --- Scroll Reveal Animation Logic ---
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Optional: stop observing once revealed
            }
        });
    }, {
        root: null, // Use viewport as root
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% is visible
    });

    function observeScrollElements() {
        const revealElements = document.querySelectorAll('.reveal-on-scroll');
        revealElements.forEach(el => revealObserver.observe(el));
    }

    // --- Main Transition Logic ---
    function initiateTransition(viewType) {
        if (backgroundMusic && !musicStarted && backgroundMusic.readyState >= 2) {
            backgroundMusic.play().then(() => musicStarted = true).catch(error => {
                console.warn("BG music autoplay failed:", error);
                musicStarted = true; // Avoid retries
            });
        } else if (!musicStarted) { musicStarted = true; }

        innieAccessBtn.disabled = true;
        outieAccessBtn.disabled = true;
        accessPoint.classList.remove('active');
        body.setAttribute('aria-busy', 'true');

        setTimeout(() => {
            accessPoint.style.display = 'none';
            transitionScreen.style.display = 'flex';
            void transitionScreen.offsetHeight;
            transitionScreen.classList.add('active');

            if (viewType === 'innie') {
                transitionText.textContent = 'Establishing MDR Uplink...';
                transitionSpinner.className = 'spinner innie';
            } else {
                transitionText.textContent = 'Requesting Surface Access...';
                transitionSpinner.className = 'spinner outie';
            }

            const processingTime = viewType === 'innie' ? 2200 : 1500;
            setTimeout(() => {
                transitionScreen.classList.remove('active');

                setTimeout(() => {
                    transitionScreen.style.display = 'none';
                    body.style.overflow = 'auto';

                    innieView.classList.remove('active');
                    outieView.classList.remove('active');
                    body.classList.remove('outie-active');
                    numberGridBg.removeEventListener('mouseover', handleGridHover); // Cleanup listener
                    numberGridBg.removeEventListener('mouseout', clearGridHoverEffects); // Cleanup listener
                    revealObserver.disconnect(); // Stop observing old elements

                    if (viewType === 'innie') {
                        body.classList.remove('outie-active');
                        createNumberGrid(); // Generate grid *before* showing view
                        innieView.classList.add('active');
                        // Add hover listeners specifically for Innie view
                        numberGridBg.addEventListener('mouseover', handleGridHover);
                        numberGridBg.addEventListener('mouseleave', clearGridHoverEffects); // Use mouseleave on container
                    } else {
                        body.classList.add('outie-active');
                        outieView.classList.add('active');
                    }

                    interfaceContainer.style.display = 'block';
                    void interfaceContainer.offsetHeight;

                    setTimeout(() => {
                        interfaceContainer.classList.add('visible');
                        interfaceContainer.setAttribute('aria-hidden', 'false');
                        body.setAttribute('aria-busy', 'false');
                        observeScrollElements(); // Start observing AFTER view is visible
                         // Ensure scroll container is at top for Innie view
                         if (viewType === 'innie' && mdrOverlay) {
                            mdrOverlay.scrollTop = 0;
                         }

                    }, VIEW_LOAD_DELAY);

                }, TRANSITION_FADE_DURATION);

            }, processingTime);

        }, TRANSITION_FADE_DURATION);
    }

    // --- Event Listeners ---
    innieAccessBtn.addEventListener('click', () => initiateTransition('innie'));
    outieAccessBtn.addEventListener('click', () => initiateTransition('outie'));

    // --- Initial Setup ---
    body.style.opacity = 1;
    body.setAttribute('aria-busy', 'true');

});
