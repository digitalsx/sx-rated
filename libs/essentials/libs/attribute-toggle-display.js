import { attributeElementFetcher } from "../../../utils/attributeElementFetcher";

export function attributeToggleDisplay() {

    attributeElementFetcher(['sx-toggle-display'], (otherElement, inputElement) => {
        const inputTagName = inputElement.tagName.toLowerCase();
        if (inputTagName === 'input' && inputElement.type === 'checkbox') {

            if (inputElement.checked) {
                otherElement.style.display = 'block';
            } else {
                otherElement.style.display = 'none';
            }
        } else {
            if (otherElement.style.display === 'none') {
                otherElement.style.display = 'block';
            } else {
                otherElement.style.display = 'none';
            }
        }
    });
}