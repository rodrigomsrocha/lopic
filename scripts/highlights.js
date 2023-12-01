window.addEventListener("load", loadData);

const carousel = document.querySelector(".carousel-inner")
const carouselIndicators = document.querySelector(".carousel-indicators")

async function loadData() {
  const res = await fetch("https://lopic-server.rodrigomsrocha.repl.co/highlights")
  const data = await res.json();

  data.forEach((highlight, index) => {
    carouselIndicators.innerHTML += `
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to=${index}
        class="active rounded-circle"
        aria-current="true"
        aria-label="Slide ${index+1}"
      ></button>
    `
    carousel.innerHTML += `
      <div class="carousel-item">
        <img
          src=${highlight.url}
          class="d-block w-100 img"
          alt="..."
        />
        <div class="carousel-caption d-none d-md-block">
          <p style="color: #000; background: #fff; border-radius: 0.5rem">${highlight.description}</p>
        </div>
      </div>
    `
  })

  carousel.children[0].classList.add("active");
}
