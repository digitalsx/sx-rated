'use strict';

import { ready } from "../../utils/page-ready.js";

import { attributeCurrentYear } from "./libs/attribute-current-year.js";
import { attributeToggleDisplay } from "./libs/attribute-toggle-display.js";


function initialize() {
    attributeCurrentYear();
    attributeToggleDisplay();
}

ready(initialize);
