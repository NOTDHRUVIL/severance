document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const accessPoint = document.getElementById('access-point');
    const innieAccessBtn = document.getElementById('innie-access-btn');
    const outieAccessBtn = document.getElementById('outie-access-btn');
    const transitionScreen = document.getElementById('transition-screen');
    const transitionText = document.getElementById('transition-text');
    const interfaceContainer = document.getElementById('interface-container');
    const innieView = document.getElementById('innie-view');
    const outieView = document.getElementById('outie-view');
    const currentTimeDisplay = document.getElementById('current-time'); // For Innie header clock
    const body = document.body;
    const backgroundMusic = document.getElementById('background-music'); // Get the audio element

    let musicStarted = false; // Flag to ensure music only starts once
    let clockIntervalId = null; // To store the interval ID for the clock

    // --- Clock Function (for Innie Header) ---
    function updateTime() {
        if (!currentTimeDisplay) return; // Only run if element exists
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
            if(currentTimeDisplay) currentTimeDisplay.textContent = "--:--:--"; // Reset display
        }
    }

    // --- Main Transition Logic ---
    function initiateTransition(viewType) {
        // --- Attempt to play music on first interaction ---
        if (backgroundMusic && !musicStarted) {
            backgroundMusic.play().then(() => {
                // Autoplay started!
                musicStarted = true;
            }).catch(error => {
                // Autoplay was prevented. User interaction is required.
                // The click *is* the interaction, so this usually works unless browser settings are very strict.
                console.warn("Background music autoplay prevented:", error);
                // Set flag anyway to avoid repeated attempts
                musicStarted = true;
            });
        }

        // 1. Disable buttons, Fade out Access Point
        innieAccessBtn.disabled = true;
        outieAccessBtn.disabled = true;
        accessPoint.classList.remove('active');
        body.setAttribute('aria-busy', 'true'); // Indicate loading state

        // 2. After Access Point fades, show Transition Screen
        // Use transitionend event for more robust timing if needed, but setTimeout is often sufficient here
        setTimeout(() => {
            accessPoint.style.display = 'none'; // Hide completely after fade
            transitionScreen.classList.add('active');

            // Simulate different processing times/messages
            if (viewType === 'innie') {
                transitionText.textContent = 'Syncing Neural Implant... Compliance Check...';
                // Optional: Change spinner color or add specific class
                transitionScreen.querySelector('.spinner').style.borderTopColor = 'var(--lumon-green)';
            } else {
                transitionText.textContent = 'Verifying Surface Permit... Please Wait...';
                // Optional: Change spinner color or add specific class
                transitionScreen.querySelector('.spinner').style.borderTopColor = 'var(--lumon-blue)';
            }

            // 3. Simulate processing time, then fade out transition
            const processingTime = viewType === 'innie' ? 2500 : 1500; // Innie takes longer
            setTimeout(() => {
                transitionScreen.classList.remove('active');

                // 4. After transition fades, show the main interface
                setTimeout(() => {
                    transitionScreen.style.display = 'none'; // Hide completely after fade
                    interfaceContainer.style.display = 'block'; // Make container available in layout flow
                    body.style.overflow = 'auto'; // Allow scrolling ONCE content is ready

                    // Clear previous clock if switching views (though currently no direct switch)
                    stopClock();

                    // Select and activate the correct view
                    if (viewType === 'innie') {
                        innieView.classList.add('active');
                        outieView.classList.remove('active');
                        updateTime(); // Show initial time immediately
                        clockIntervalId = setInterval(updateTime, 1000); // Start updating clock
                    } else {
                        outieView.classList.add('active');
                        innieView.classList.remove('active');
                        // No clock for outie view
                    }

                    // Force reflow/repaint before adding 'visible' class to ensure transition plays
                    void interfaceContainer.offsetHeight;

                    interfaceContainer.classList.add('visible');
                    interfaceContainer.setAttribute('aria-hidden', 'false');
                    body.setAttribute('aria-busy', 'false'); // Loading finished

                }, 300); // Half of the CSS transition duration for the fade out

            }, processingTime);

        }, 300); // Half of the CSS transition duration for the fade out
    }

    // --- Event Listeners ---
    innieAccessBtn.addEventListener('click', () => {
        initiateTransition('innie');
    });

    outieAccessBtn.addEventListener('click', () => {
        initiateTransition('outie');
    });

    // Initial setup
    body.setAttribute('aria-busy', 'true'); // Body is busy until a choice is made

});
