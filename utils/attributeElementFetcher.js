/**
 * Action callback function.
 * @callback actionCallback
 * @param {Element} otherElement - The current element being processed.
 * @param {InputElement|null} inputElement - The paired element or null if no pair is found.
 */

/**
 * Fetches elements with specific attributes and applies a callback function to paired elements.
 * @function attributeElementFetcher
 * @param {string[]} baseNames - Array of base attribute names to match.
 * @param {actionCallback} cb - The callback function to handle each element or paired elements.
 * @param {Element} cb.otherElement - The current element being processed.
 * @param {Element|null} cb.inputElement - The paired element or null if no pair is found.
 * @returns {number}
 */
export function attributeElementFetcher(baseNames, cb) {
  const elements = getAttributesWithBaseNames(baseNames);
  elements.forEach(element => {
    const attribute = getSxAttribute(element);
    if (!attribute) return;

    if (extractNumber(attribute) === null) {
      cb(element, null);
    } else {
      const pair = handlePairing(element);
      if (pair) {
        pair.inputElement.addEventListener('change', () => cb(pair.otherElement, pair.inputElement));
      }
    }
  });

  /**
   * Fetches elements that have attributes matching the base names.
   * 
   * @param {string[]} baseNames - Array of base attribute names to match.
   * @returns {Element[]} Array of elements with matching attributes.
   */
  function getAttributesWithBaseNames(baseNames) {
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

  /**
   * Gets the first attribute starting with 'sx-' from the element.
   * 
   * @param {Element} element - The element to check.
   * @returns {string|null} The matching attribute name or null if not found.
   */
  function getSxAttribute(element) {
    for (let attr of element.attributes) {
      if (attr.name.startsWith('sx-')) return attr.name;
    }
    return null;
  }

  /**
   * Extracts the number from an attribute name.
   * 
   * @param {string} attribute - The attribute name.
   * @returns {string|null} The extracted number or null if no number is found.
   */
  function extractNumber(attribute) {
    const match = attribute.match(/-\d+$/);
    return match ? match[0].slice(1) : null;
  }

  /**
   * Handles the pairing of elements based on the extracted number.
   * 
   * @param {Element} element - The element to be paired.
   * @param {string} number - The extracted number used for pairing.
   * @returns {{otherElement: Element, inputElement: Element}|null} The paired elements or null if not found.
   */
  function handlePairing(element) {
    const pair = document.querySelectorAll(`[${element.attributes[0].name}]`);
    if (pair.length === 2) {
      const otherElement = Array.from(pair).find(el => !['input', 'select', 'checkbox', 'radio'].includes(el.tagName.toLowerCase()));
      const inputElement = Array.from(pair).find(el => ['input', 'select', 'checkbox', 'radio'].includes(el.tagName.toLowerCase()));

      if (otherElement && inputElement) {
        return { otherElement, inputElement };
      }
    }
    return null;
  }
}
