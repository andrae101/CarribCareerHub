document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("year").textContent = new Date().getFullYear();

  const jobList = document.getElementById("job-list");
  if (jobList) {
    fetch("http://localhost:5000/api/jobs") // Change to your backend URL after deploy
      .then(res => res.json())
      .then(data => {
        jobList.innerHTML = "";
        data.forEach(job => {
          const card = document.createElement("div");
          card.className = "job-card";
          card.innerHTML = `<h3>${job.title}</h3>
            <p>${job.location}</p>
            <p><strong>${job.company}</strong></p>
            <a href="apply.html">Apply Now</a>`;
          jobList.appendChild(card);
        });
      })
      .catch(err => {
        jobList.innerHTML = "<p>Could not load jobs.</p>";
      });
  }
});