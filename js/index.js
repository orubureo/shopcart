const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(dropdown => {
  const btn = dropdown.querySelector(".dropdown-btn");
  const menu = dropdown.querySelector(".dropdown-menu");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    // Close others
    dropdowns.forEach(d => {
      if (d !== dropdown) {
        d.classList.remove("active");
        d.querySelector(".dropdown-btn").classList.remove("active");
      }
    });

    // Toggle current
    dropdown.classList.toggle("active");
    btn.classList.toggle("active");
  });
});

// Close all when clicking outside
document.addEventListener("click", () => {
  dropdowns.forEach(dropdown => {
    dropdown.classList.remove("active");
    dropdown.querySelector(".dropdown-btn").classList.remove("active");
  });
});