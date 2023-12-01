const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const title = document.querySelector(".title");
const description = document.querySelector(".description");
const loc = document.querySelector(".loc");
const date = document.querySelector(".date");
const mainImg = document.querySelector(".main-img");

const gallery = document.querySelector(".gallery");
const carousel = document.querySelector(".carousel-content");

window.addEventListener("load", () => {
  getData();
  getImgs();
});

async function getData() {
  const res = await fetch(
    `https://lopic-server.rodrigomsrocha.repl.co/albuns/${id}`
  );
  const data = await res.json();

  title.innerText = "Álbum " + data.title;
  description.innerText = data.description;
  loc.innerText = data.title;
  date.innerText = data.date;
  mainImg.setAttribute("src", `../${data.highlight}`);
  mainImg.setAttribute("alt", data.title);
}

async function getImgs() {
  const res = await fetch(
    `https://lopic-server.rodrigomsrocha.repl.co/pics?albunId=${id}`
  );
  const data = await res.json();

  data.forEach((pic) => {
    gallery.innerHTML += `
      <div class="gallery-item">
        <button
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          type="button"
        >
          <img src="..${pic.url}" alt=${pic.description} />
        </button>
        <span>${pic.description}</span>
      </div>
    `;
    carousel.innerHTML += `
      <div class="carousel-item">
        <img
          src="..${pic.url}"
          class="d-block w-100 img"
          alt="${pic.description}"
        />
      </div>
    `;
  });

  carousel.children[0].classList.add("active");
}
