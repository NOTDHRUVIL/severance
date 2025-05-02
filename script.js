document.addEventListener('DOMContentLoaded', () => {
    // Elements
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
    const mdrContent = document.querySelector('.mdr-content'); // For number grid
    const numberGridBg = document.querySelector('.number-grid-bg'); // For number grid
    const currentTimeDisplay = document.getElementById('current-time'); // For Innie footer clock
    const backgroundMusic = document.getElementById('background-music'); // Audio element

    let musicStarted = false;
    let clockIntervalId = null;
    const TRANSITION_FADE_DURATION = 600; // Match CSS --transition-speed-med
    const VIEW_LOAD_DELAY = 100; // Short delay before fading in view

    // --- Clock Function (for Innie Footer) ---
    function updateTime() {
        if (!currentTimeDisplay) return;
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // --- Stop Clock Function ---
    function stopClock() {
        if (clockIntervalId) {
            clearInterval(clockIntervalId);
            clockIntervalId = null;
            if(currentTimeDisplay) currentTimeDisplay.textContent = "--:--:--";
        }
    }

    // --- Generate Random Numbers for MDR Background ---
    function populateNumberGrid() {
        if (!numberGridBg || !mdrContent) return;

        const lines = 50; // Number of lines (adjust based on desired density)
        const charsPerLine = 150; // Characters per line (adjust)
        let gridHTML = '';

        for (let i = 0; i < lines; i++) {
            let line = '';
            for (let j = 0; j < charsPerLine; j++) {
                line += Math.floor(Math.random() * 10) + ' '; // Add random digit and space
            }
            gridHTML += line + '\n';
        }
        numberGridBg.textContent = gridHTML; // Use textContent for performance
    }


    // --- Main Transition Logic ---
    function initiateTransition(viewType) {
        // --- Attempt to play music on first interaction ---
        if (backgroundMusic && !musicStarted && backgroundMusic.readyState >= 2) { // Check if ready
            backgroundMusic.play().then(() => {
                musicStarted = true;
            }).catch(error => {
                console.warn("Background music autoplay prevented:", error);
                // Attempt to play again on a subsequent interaction might be needed depending on browser
                musicStarted = true; // Avoid repeated console warnings
            });
        } else if (!musicStarted) {
             console.warn("Audio not ready or element not found.");
             musicStarted = true; // Avoid repeated checks
        }


        // 1. Disable buttons, Fade out Access Point
        innieAccessBtn.disabled = true;
        outieAccessBtn.disabled = true;
        accessPoint.classList.remove('active');
        body.setAttribute('aria-busy', 'true');

        // 2. After Access Point fades, show Transition Screen
        setTimeout(() => {
            accessPoint.style.display = 'none';
            transitionScreen.style.display = 'flex'; // Set display before adding class
            void transitionScreen.offsetHeight; // Force reflow
            transitionScreen.classList.add('active');

            // Configure transition based on view type
            if (viewType === 'innie') {
                transitionText.textContent = 'Initializing MDR Connection...';
                transitionSpinner.className = 'spinner innie'; // Style spinner
            } else {
                transitionText.textContent = 'Establishing Surface Link...';
                 transitionSpinner.className = 'spinner outie'; // Style spinner
            }

            // 3. Simulate processing time, then fade out transition
            const processingTime = viewType === 'innie' ? 2200 : 1500;
            setTimeout(() => {
                transitionScreen.classList.remove('active');

                // 4. After transition fades, prepare and show the main interface
                setTimeout(() => {
                    transitionScreen.style.display = 'none';
                    body.style.overflow = 'auto'; // Allow scrolling NOW

                    // Clear previous states and set up new view
                    stopClock();
                    innieView.classList.remove('active');
                    outieView.classList.remove('active');
                    body.classList.remove('outie-active'); // Reset body class

                    if (viewType === 'innie') {
                        body.classList.remove('outie-active'); // Ensure dark bg
                        innieView.classList.add('active');
                        populateNumberGrid(); // Generate numbers for the background
                        updateTime(); // Initial time
                        clockIntervalId = setInterval(updateTime, 1000);
                    } else {
                        body.classList.add('outie-active'); // Switch to light bg
                        outieView.classList.add('active');
                    }

                    // Make container visible *after* setting up the correct view
                    interfaceContainer.style.display = 'block'; // Make container layout visible
                    void interfaceContainer.offsetHeight; // Force reflow

                    // Add slight delay before triggering fade-in animation for smoothness
                    setTimeout(() => {
                         interfaceContainer.classList.add('visible');
                         interfaceContainer.setAttribute('aria-hidden', 'false');
                         body.setAttribute('aria-busy', 'false'); // Loading finished
                    }, VIEW_LOAD_DELAY);


                }, TRANSITION_FADE_DURATION); // Wait for fade out

            }, processingTime);

        }, TRANSITION_FADE_DURATION); // Wait for fade out
    }

    // --- Event Listeners ---
    innieAccessBtn.addEventListener('click', () => {
        initiateTransition('innie');
    });

    outieAccessBtn.addEventListener('click', () => {
        initiateTransition('outie');
    });

    // Initial setup
    body.style.opacity = 1; // Ensure body is visible after potential FOUC style
    body.setAttribute('aria-busy', 'true'); // Busy until choice made

});
