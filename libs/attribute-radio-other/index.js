'use strict';

import { ready } from "../../utils/page-ready.js";

function attributeRadioOther() {
    var otherRadioGroups = document.querySelectorAll('[sx-radio-other="group"]');
    otherRadioGroups.forEach(function (group) {
        var otherRadioButtons = group.querySelectorAll('input[type="radio"]');
        var otherRadioButton = group.querySelector('input[sx-radio-other="toggle"]');
        var otherInput = group.querySelector('input[sx-radio-other="input"]');
        if (!otherRadioButtons || !otherRadioButton || !otherInput) return;

        function toggleOtherInput() {
            if (otherRadioButton.checked) {
                otherInput.style.display = 'block';
            } else {
                otherInput.style.display = 'none';
                otherInput.value = '';
            }
        }
        otherRadioButtons.forEach(function (button) {
            button.addEventListener('change', toggleOtherInput);
        });

        toggleOtherInput();
    });
}

ready(attributeRadioOther);