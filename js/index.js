const dropdowns = document.querySelectorAll(".cus-dropdown");

dropdowns.forEach(dropdown => {
  const btn = dropdown.querySelector(".cus-dropdown-btn");
  const menu = dropdown.querySelector(".cus-dropdown-menu");

  btn.addEventListener("click", (e) => {
    e.stopPropagation();

    // Close others
    dropdowns.forEach(d => {
      if (d !== dropdown) {
        d.classList.remove("active");
        d.querySelector(".cus-dropdown-btn").classList.remove("active");
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
    dropdown.querySelector(".cus-dropdown-btn").classList.remove("active");
  });
});

const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, {
  threshold: 0.2
});

reveals.forEach((el) => observer.observe(el));

const track = document.querySelector(".carousel-track");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;

const cardWidth = 220; // card width + gap

nextBtn.addEventListener("click", () => {
  const maxIndex = track.children.length - 3; // visible cards

  if (currentIndex < maxIndex) {
    currentIndex++;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }
});

prevBtn.addEventListener("click", () => {
  if (currentIndex > 0) {
    currentIndex--;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }
});