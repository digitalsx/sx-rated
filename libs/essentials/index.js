import { attributeCurrentYear } from "./libs/attribute-current-year.js";
(function() {
    function initialize() {
        attributeCurrentYear();
    }

    document.addEventListener('DOMContentLoaded', initialize);
})();
