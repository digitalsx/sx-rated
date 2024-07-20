// index.js
import { attributeYearUpdater } from "./libs/attribute-year-updater.js";
// Import other utility functions as needed

// Self-initializing function
(function() {
    function initialize() {
        // Call your utility functions here
        attributeYearUpdater();
        // Call other utility functions as needed
    }

    // Listen for the DOMContentLoaded event
    document.addEventListener('DOMContentLoaded', initialize);
})();
