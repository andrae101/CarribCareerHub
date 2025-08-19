document.addEventListener("DOMContentLoaded", () => {
  // Auto update footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ----------------------
  // Fetch and display jobs
  // ----------------------
  const jobList = document.getElementById("job-list");
  if (jobList) {
    fetch("http://localhost:5000/api/jobs") // Change this to your live backend URL when deployed
      .then(res => res.json())
      .then(data => {
        jobList.innerHTML = "";
        data.forEach(job => {
          const card = document.createElement("div");
          card.className = "job-card";
          card.innerHTML = `
            <h3>${job.title}</h3>
            <p>${job.location}</p>
            <p><strong>${job.company}</strong></p>
            <a href="apply.html">Apply Now</a>
          `;
          jobList.appendChild(card);
        });
      })
      .catch(() => {
        jobList.innerHTML = "<p>Could not load jobs.</p>";
      });
  }

  // ----------------------
  // Night Mode Toggle
  // ----------------------
  const toggle = document.getElementById("toggleMode");

  // Apply saved theme on load
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
  }

  // Set button label
  function setToggleLabel() {
    if (!toggle) return;
    toggle.textContent = document.body.classList.contains("dark-mode")
      ? "☀️ Light Mode"
      : "🌙 Night Mode";
  }
  setToggleLabel();

  // Toggle handler
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("dark-mode") ? "dark" : "light"
      );
      setToggleLabel();
    });
  }
});
