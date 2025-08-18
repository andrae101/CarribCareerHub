/* CarribCareerHub JavaScript
   Modern & lightweight for interactivity
*/

// Auto update year in footer
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Job search functionality (basic client-side filter demo)
  const searchForm = document.querySelector(".search-form");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const keyword = searchForm.querySelector("input[type='text']").value.toLowerCase();
      const location = searchForm.querySelectorAll("input[type='text']")[1].value.toLowerCase();

      // For now, filter only featured jobs on homepage
      const jobCards = document.querySelectorAll(".job-card");
      jobCards.forEach((card) => {
        const title = card.querySelector("h3").textContent.toLowerCase();
        const place = card.querySelector("p").textContent.toLowerCase();

        if (
          (keyword && !title.includes(keyword)) ||
          (location && !place.includes(location))
        ) {
          card.style.display = "none";
        } else {
          card.style.display = "block";
        }
      });
    });
  }
});

// Future features (for later versions):
// - Save jobs to localStorage
// - Quick apply modal popup
// - Employer dashboard logic
