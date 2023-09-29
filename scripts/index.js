const mobileNav = document.querySelector(".mobile-nav");
const navBtn = document.querySelector(".nav-btn");

navBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

document.addEventListener("click", function (event) {
  if (event.target !== navBtn && event.target !== mobileNav) {
    mobileNav.classList.remove("open");
  }
});
