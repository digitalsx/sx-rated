(function () {
  'use strict';

  class NumberFormatter {
    baseNames = ['sx-currency-format', 'sx-number-format', 'sx-leading-zeros'];

    constructor() {
      this.init();
    }

    init() {
      const elements = this.getAttributesWithBaseNames(this.baseNames);
      elements.forEach(element => {
        const attribute = this.getSxFormatAttribute(element);
        if (!attribute) return;

        const formatType = attribute.includes('currency') ? 'currency' : 'number';
        const iso = element.getAttribute(attribute);
        const number = this.extractNumber(attribute);
        const leadingZeros = this.getLeadingZeros(element);

        if (number === null) {
          this.formatElement(element, iso, formatType, leadingZeros);
        } else {
          this.handlePairing(element, iso, number, formatType, leadingZeros);
        }
      });
    }

    getSxFormatAttribute(element) {
      for (let attr of element.attributes) {
        if (attr.name.startsWith('sx-') && attr.name.includes('format')) {
          return attr.name;
        }
      }
      return null;
    }

    getAttributesWithBaseNames(baseNames) {
      const allElements = document.querySelectorAll('*');
      const matchingElements = [];

      allElements.forEach(element => {
        for (let attr of element.attributes) {
          for (let baseName of baseNames) {
            const suffixPattern = new RegExp(`^${baseName}-\\d+$`);
            if (attr.name === baseName || suffixPattern.test(attr.name)) {
              matchingElements.push(element);
              break;
            }
          }
        }
      });

      // Remove duplicates (if any)
      const uniqueMatchingElements = [...new Set(matchingElements)];

      return uniqueMatchingElements;
    }

    extractNumber(attribute) {
      const match = attribute.match(/sx-\w+-format-(\d+)/);
      return match ? match[1] : null;
    }

    getLeadingZeros(element) {
      const leadingZerosAttr = element.getAttribute('sx-leading-zeros');
      return leadingZerosAttr ? parseInt(leadingZerosAttr) : 0;
    }

    formatElement(element, iso, formatType, leadingZeros) {
      const value = element.innerText || element.value || "0";
      if (this.isValidNumber(value)) {
        const formattedNumber = this.formatNumber(parseFloat(value), iso, formatType, leadingZeros);
        if (element.tagName.toLowerCase() === 'input') {
          element.value = formattedNumber;
        } else {
          element.innerText = formattedNumber;
        }
      }
    }

    handlePairing(element, iso, number, formatType, leadingZeros) {
      const pair = document.querySelectorAll(`[sx-${formatType}-format-${number}]`);
      if (pair.length === 2) {
        const textElement = Array.from(pair).find(el => el.tagName.toLowerCase() !== 'input');
        const inputElement = Array.from(pair).find(el => el.tagName.toLowerCase() === 'input');

        if (textElement && inputElement) {
          this.formatElement(textElement, iso, formatType, leadingZeros);
          inputElement.addEventListener('input', () => {
            const inputValue = inputElement.value || "0";
            if (this.isValidNumber(inputValue)) {
              textElement.innerText = this.formatNumber(parseFloat(inputValue), iso, formatType, leadingZeros);
            }
          });
        }
      }
    }

    isValidNumber(value) {
      return !isNaN(value) && isFinite(value);
    }

    formatNumber(number, iso, formatType, leadingZeros) {
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
        // Fallback to a default formatting if ISO is not found or invalid
        return new Intl.NumberFormat(undefined, {
          minimumFractionDigits: leadingZeros,
          maximumFractionDigits: leadingZeros
        }).format(number);
      }
    }
  }

  // Initialize the number formatter
  document.addEventListener('DOMContentLoaded', () => {
    new NumberFormatter();
  });

})();