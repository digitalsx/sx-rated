export function attributeCurrentYear() {
  const elements = document.querySelectorAll('[sx-current-year]');
  const currentYear = new Date().getFullYear();

  elements.forEach(element => {
    element.textContent = currentYear;
  });
};