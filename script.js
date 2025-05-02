/* Basic Reset */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

/* Apply Fonts & Basic Body */
body {
    font-family: 'Roboto', sans-serif; /* Readability for body */
    background-color: #ffffff; /* Pure white background */
    color: #111111; /* Near black text */
    line-height: 1.6;
    overflow: hidden; /* Prevent scrollbars initially */
}

/* MDR Color Palette (Minimalist) */
:root {
    --mdr-text: #111111;
    --mdr-background: #ffffff;
    --mdr-border: #cccccc; /* Light grey border */
    --mdr-accent-light: #e0e0e0; /* Very light grey for subtle backgrounds */
    --mdr-header-font: 'Rajdhani', sans-serif; /* Thematic font */
    --mdr-body-font: 'Roboto', sans-serif;
    --interactive-green: #00a98f; /* Keep for hover states if needed */
    --interactive-blue: #0077c8;
}

/* Phase 1: Elevator Screen */
#elevator-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: var(--mdr-background);
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    z-index: 100;
    opacity: 1;
    transition: opacity 0.8s ease-out;
}

#elevator-screen:not(.active) {
    opacity: 0;
    pointer-events: none;
}

.mdr-logo {
    margin-bottom: 20px;
    font-family: var(--mdr-header-font);
    font-size: 1.8em; /* Adjust size as needed */
    font-weight: 700;
    color: var(--mdr-text);
    letter-spacing: 1px;
}

.mdr-logo .logo-bar {
    display: inline-block;
    margin-right: 10px; /* Space between bar and text */
    font-weight: bold;
}

.elevator-content .subtitle {
    color: #555555; /* Slightly lighter grey */
    margin-bottom: 40px;
    font-size: 1.1em;
    font-family: var(--mdr-body-font);
}

.elevator-buttons {
    display: flex;
    flex-direction: column;
    gap: 15px;
    align-items: center;
}

.elevator-button {
    padding: 12px 25px;
    font-size: 0.9em;
    font-weight: 700;
    font-family: var(--mdr-header-font); /* Use header font for buttons */
    border: 2px solid var(--mdr-text); /* Black border */
    background-color: var(--mdr-background); /* White background */
    color: var(--mdr-text); /* Black text */
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 250px;
    letter-spacing: 0.5px;
}

.elevator-button:hover {
    background-color: var(--mdr-text); /* Black background on hover */
    color: var(--mdr-background); /* White text on hover */
}
/* Optional: Keep subtle color hints on hover if desired */
/*
.elevator-button.recruiter:hover { background-color: var(--interactive-green); border-color: var(--interactive-green); color: white;}
.elevator-button.visitor:hover { background-color: var(--interactive-blue); border-color: var(--interactive-blue); color: white;}
*/


/* Main Portfolio Container */
#portfolio-container {
    max-width: 850px; /* Slightly narrower for MDR feel */
    margin: 40px auto;
    padding: 30px 40px;
    background-color: var(--mdr-background);
    border: 1px solid var(--mdr-border);
    opacity: 0; /* Hidden initially */
    transition: opacity 0.8s ease-in;
    display: none;
}

#portfolio-container.visible {
    display: block;
    opacity: 1;
}

/* General Portfolio View Styling */
.portfolio-view {
    display: none;
}

.portfolio-view.active {
    display: block;
}

section {
    margin-bottom: 35px;
    padding-bottom: 25px;
    border-bottom: 1px solid var(--mdr-border); /* Lighter border */
}

section:last-child {
    border-bottom: none;
    margin-bottom: 10px; /* Reduce margin on last section */
}

h1, h2, h3 {
    font-family: var(--mdr-header-font);
    color: var(--mdr-text);
    font-weight: 700;
    margin-bottom: 15px;
}

h1 {
    font-size: 1.6em; /* Adjust as needed */
    text-align: center;
    letter-spacing: 1px;
}

h2 {
    font-size: 1.3em;
    letter-spacing: 0.5px;
    padding-bottom: 5px;
    /* border-bottom: 2px solid var(--mdr-text); */ /* Simple underline */
    display: flex; /* For aligning bar */
    align-items: center;
}

.section-bar {
    font-size: 1.5em; /* Make bar taller */
    font-weight: bold;
    margin-right: 10px; /* Space between bar and text */
    line-height: 1; /* Adjust vertical alignment if needed */
}


h3 {
    font-size: 1.1em;
    font-weight: 600; /* Slightly less bold */
    color: #333333; /* Slightly lighter than main text */
    margin-bottom: 10px;
}

p, li {
    margin-bottom: 8px;
    color: var(--mdr-text);
    font-family: var(--mdr-body-font); /* Ensure body font */
    font-size: 0.95em;
    font-weight: 400;
}

ul {
    list-style: none; /* Remove default bullets */
    padding-left: 5px;
}

strong {
    font-weight: 700; /* Roboto bold */
}

.intro-phrase {
    font-style: italic;
    color: #555555;
    text-align: center;
    margin: -10px 0 30px 0; /* Position it after header, before first section */
    font-size: 1em;
}

/* Innie Specific Styles */
.innie-header {
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 1px solid var(--mdr-border);
}
.innie-header .file-id {
    text-align: center;
    font-size: 0.9em;
    color: #666;
    margin-top: -10px;
    margin-bottom: 10px;
}
.innie-header .compliance-note {
    text-align: center;
    font-size: 0.85em;
    color: #777777;
    line-height: 1.4;
}


.record-item,
.assignment-item,
.project-item,
.recognition-category,
.skill-category {
    margin-bottom: 20px;
    padding: 15px;
    border: 1px solid var(--mdr-border); /* Simple border */
    background-color: var(--mdr-background); /* Ensure white background */
    box-shadow: none; /* Remove shadows for flat look */
}
.skill-category{
     border-left: 3px solid #444; /* Subtle left border */
     padding-left: 12px;
}

.date-range {
    font-style: normal; /* Less emphasis */
    font-size: 0.85em;
    color: #555555;
    margin-bottom: 10px;
    font-family: var(--mdr-header-font); /* Use header font for dates */
    font-weight: 600;
}

.directives {
    padding-left: 10px;
}

.directive-marker {
    margin-right: 8px;
    color: #666; /* Grey marker */
    font-weight: bold;
}

.innie-footer {
    margin-top: 30px;
    text-align: center;
    font-size: 0.85em;
    color: #888888;
    font-style: italic;
}


/* Outie Specific Styles */
.outie-header {
    text-align: center;
    margin-bottom: 30px;
    padding: 15px;
    border-bottom: 1px solid var(--mdr-border);
}
.outie-header h1 {
    font-size: 1.8em;
    margin-bottom: 5px;
}
.outie-header p {
    color: #444;
    font-size: 1em;
    line-height: 1.5;
}


#outie-view h2 .section-bar {
    /* Optional: different accent for outie, but sticking to black/white is more MDR */
     color: var(--mdr-text);
}

.passion-item,
.community-item,
.journey-item {
     margin-bottom: 15px;
     padding-bottom: 15px;
     border-bottom: 1px dashed var(--mdr-border); /* Dashed divider */
}
.passion-item:last-child,
.community-item:last-child,
.journey-item:last-child {
    border-bottom: none;
}
#outie-explorations .project-list-outie {
     list-style-type: none;
     padding-left: 0;
 }

 #outie-explorations .project-list-outie li::before {
     content: "»"; /* Use a different marker for outie projects */
     margin-right: 8px;
     color: #555;
 }


.outie-footer {
     margin-top: 30px;
     text-align: center;
     font-size: 0.9em;
     color: #666;
 }
