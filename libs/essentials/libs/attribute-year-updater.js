export function attributeYearUpdater() {
  console.log('attributeYearUpdater function called');
  const yearSpan = document.getElementById('year');
  if (!yearSpan) return;
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
};
