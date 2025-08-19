document.addEventListener("DOMContentLoaded", () => {
  // Auto update footer year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Fetch and display jobs
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
      .catch(err => {
        jobList.innerHTML = "<p>Could not load jobs.</p>";
      });
  }

  // Night Mode Toggle
  const toggle = document.getElementById("toggleMode");
  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
      toggle.textContent = document.body.classList.contains("dark-mode")
        ? "☀️ Light Mode"
        : "🌙 Night Mode";
    });
  }
});
