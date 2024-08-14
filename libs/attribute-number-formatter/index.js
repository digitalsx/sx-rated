'use strict';
import { attributeElementFetcher } from "../../utils/attributeElementFetcher";
import { ready } from "../../utils/page-ready";

function attributeNumberFormatter() {
  const baseNames = ['sx-currency-format', 'sx-number-format', 'sx-leading-zeros'];
  attributeElementFetcher(baseNames, (otherElement, inputElement) => {
    formatElement(otherElement, inputElement);
  });

  observeNewElements(baseNames, (element) => {
    formatElement(element, null);
  });

  function formatElement(otherElement, inputElement) {
    const attribute = getSxFormatAttribute(otherElement);
    if (!attribute) return;
    const formatType = attribute.includes('currency') ? 'currency' : 'number';
    const iso = otherElement.getAttribute(attribute);
    const leadingZeros = getLeadingZeros(otherElement);
    let value = inputElement ? inputElement.value || "0" : otherElement.innerText || otherElement.value || "0";
    if (isValidNumber(value)) {
      const formattedNumber = formatNumber(parseFloat(value), iso, formatType, leadingZeros);
      if (otherElement.tagName.toLowerCase() === 'input') {
        otherElement.value = formattedNumber;
      } else {
        otherElement.innerText = formattedNumber;
      }
    }
  }

  function getSxFormatAttribute(element) {
    for (let attr of element.attributes) {
      if (attr.name.startsWith('sx-') && attr.name.includes('format')) {
        return attr.name;
      }
    }
    return null;
  }

  function getLeadingZeros(element) {
    const leadingZerosAttr = element.getAttribute('sx-leading-zeros');
    return leadingZerosAttr ? parseInt(leadingZerosAttr) : 0;
  }

  function isValidNumber(value) {
    return !isNaN(value) && isFinite(value);
  }

  function formatNumber(number, iso, formatType, leadingZeros) {
    let options;
    if (formatType === 'currency') {
      options = {
        style: 'currency',
        currency: iso,
        minimumFractionDigits: leadingZeros,
        maximumFractionDigits: leadingZeros
      };
    } else {
      options = {
        minimumFractionDigits: leadingZeros,
        maximumFractionDigits: leadingZeros,
        useGrouping: true
      };
    }
    try {
      return new Intl.NumberFormat(undefined, options).format(number);
    } catch (e) {
      return new Intl.NumberFormat(undefined, {
        minimumFractionDigits: leadingZeros,
        maximumFractionDigits: leadingZeros
      }).format(number);
    }
  }
}

function observeNewElements(baseNames, cb) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach(node => {
          if (node.nodeType === 1) { // Element node
            baseNames.forEach(baseName => {
              if (node.hasAttribute(baseName) || Array.from(node.attributes).some(attr => attr.name.startsWith(baseName))) {
                cb(node);
              }
            });
          }
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};

ready(attributeNumberFormatter);