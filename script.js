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

    // --- Clock Function (for Innie Header) ---
    function updateTime() {
        if (!currentTimeDisplay) return; // Only run if element exists
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    }

    // --- Main Transition Logic ---
    function initiateTransition(viewType) {
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
        const currentTimeDisplay = document.getElementById('current-time');
        const body = document.body;
    
        // --- ADD THIS LINE: Get the audio element ---
        const backgroundMusic = document.getElementById('background-music');
        let musicStarted = false; // Flag to ensure music only starts once
    
        // --- Clock Function (for Innie Header) ---
        // ... (keep existing clock function) ...
        function updateTime() {
            if (!currentTimeDisplay) return;
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            currentTimeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        }
    
    
        // --- Main Transition Logic ---
        function initiateTransition(viewType) {
                    // --- ADD THIS BLOCK: Attempt to play music ---
                    if (backgroundMusic && !musicStarted) {
                        backgroundMusic.play().then(() => {
                            // Autoplay started!
                            musicStarted = true;
                        }).catch(error => {
                            // Autoplay was prevented. User interaction is required.
                            // In this case, the click *is* the interaction, so it should work.
                            // If it still fails, browser settings might be very strict.
                            console.warn("Background music autoplay prevented:", error);
                            // We still set musicStarted to true to avoid trying again uselessly
                            musicStarted = true;
                        });
                    }
                    // --- END OF ADDED BLOCK ---
            
            
                    // 1. Disable buttons, Fade out Access Point
                    innieAccessBtn.disabled = true;
                    outieAccessBtn.disabled = true;
                    accessPoint.classList.remove('active');
                    body.setAttribute('aria-busy', 'true');
            
                    // ... (rest of the initiateTransition function remains the same) ...
            
                }
            
                // --- Event Listeners ---
                innieAccessBtn.addEventListener('click', () => {
                    initiateTransition('innie');
                });
            
                outieAccessBtn.addEventListener('click', () => {
                    initiateTransition('outie');
                });
            
            });
        // Disable buttons, Fade out Access Point
        innieAccessBtn.disabled = true;
        outieAccessBtn.disabled = true;
        accessPoint.classList.remove('active');
        body.setAttribute('aria-busy', 'true'); // Indicate loading state

        // After Access Point fades, show Transition Screen
        setTimeout(() => {
            accessPoint.style.display = 'none'; // Hide completely
            transitionScreen.classList.add('active');
            // Simulate different processing times/messages
            if (viewType === 'innie') {
                transitionText.textContent = 'Syncing Neural Implant... Compliance Check...';
                // Play subtle processing sound (conceptual)
                // playSound('processing');
            } else {
                transitionText.textContent = 'Verifying Surface Permit... Please Wait...';
                 // Play different sound (conceptual)
                 // playSound('verifying');
            }

            // Simulate processing time, then fade out transition
            const processingTime = viewType === 'innie' ? 2500 : 1500; // Innie takes longer
            setTimeout(() => {
                transitionScreen.classList.remove('active');

                // 4. After transition fades, show the main interface
                setTimeout(() => {
                    transitionScreen.style.display = 'none'; // Hide completely
                    interfaceContainer.style.display = 'block'; // Make container available
                    body.style.overflow = 'auto'; // Allow scrolling

                    // Select the correct view
                    if (viewType === 'innie') {
                        innieView.classList.add('active');
                        outieView.classList.remove('active');
                        updateTime(); // Start the clock
                        setInterval(updateTime, 1000); // Update clock every second
                    } else {
                        outieView.classList.add('active');
                        innieView.classList.remove('active');
                    }

                    // Force reflow before adding visible class for transition
                    void interfaceContainer.offsetHeight;
                    interfaceContainer.classList.add('visible');
                    interfaceContainer.setAttribute('aria-hidden', 'false');
                    body.setAttribute('aria-busy', 'false'); // Loading finished

                }, 300); // Matches CSS transition speed / 2

            }, processingTime);

        }, 300); // Matches CSS transition speed / 2
    }

    // --- Event Listeners ---
    innieAccessBtn.addEventListener('click', () => {
        initiateTransition('innie');
    });

    outieAccessBtn.addEventListener('click', () => {
        initiateTransition('outie');
    });

});
