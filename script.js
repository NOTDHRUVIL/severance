document.addEventListener('DOMContentLoaded', () => {
    const elevatorScreen = document.getElementById('elevator-screen');
    const recruiterBtn = document.getElementById('recruiter-btn');
    const visitorBtn = document.getElementById('visitor-btn');
    const portfolioContainer = document.getElementById('portfolio-container');
    const innieView = document.getElementById('innie-view');
    const outieView = document.getElementById('outie-view');

    // --- Function to handle view transition ---
    function showPortfolio(viewToShow) {
        // 1. Start fading out elevator
        elevatorScreen.classList.remove('active');

        // 2. Wait for fade out transition to nearly finish
        setTimeout(() => {
            // 3. Hide elevator completely
            elevatorScreen.style.display = 'none';

            // 4. Make portfolio container ready to be shown
            portfolioContainer.style.display = 'block';

            // 5. Select the correct view and hide the other
            if (viewToShow === 'innie') {
                innieView.classList.add('active');
                outieView.classList.remove('active');
            } else {
                outieView.classList.add('active');
                innieView.classList.remove('active');
            }

            // 6. Force reflow/repaint before adding fade-in class (important!)
            void portfolioContainer.offsetHeight;

            // 7. Start fading in the portfolio container
            portfolioContainer.classList.add('visible');

            // 8. Allow scrolling on the body now
            document.body.style.overflow = 'auto';

        }, 700); // Slightly less than CSS transition duration (800ms)
    }

    // --- Event Listeners for Buttons ---
    recruiterBtn.addEventListener('click', () => {
        showPortfolio('innie');
    });

    visitorBtn.addEventListener('click', () => {
        showPortfolio('outie');
    });

});
