// CarribCareerHub — Front-only mock script
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const searchBtn = document.querySelector('[data-js="search"]');
  if (searchBtn) {
    searchBtn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('Design-only: search coming soon ✨');
    });
  }
});