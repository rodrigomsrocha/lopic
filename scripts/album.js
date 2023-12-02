const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const title = document.querySelector(".title");
const description = document.querySelector(".description");
const loc = document.querySelector(".loc");
const date = document.querySelector(".date");
const mainImg = document.querySelector(".main-img");

const gallery = document.querySelector(".gallery");
const carousel = document.querySelector(".carousel-content");

const highlightBtn = document.querySelector(".highlight-btn");

window.addEventListener("load", () => {
  getData();
  getImgs();
});

let albun;

async function getData() {
  updateHighlightState();
  const res = await fetch(
    `https://lopic-server.rodrigomsrocha.repl.co/albuns/${id}`
  );
  albun = await res.json();

  title.innerText = "Álbum " + albun.title;
  description.innerText = albun.description;
  loc.innerText = albun.title;
  date.innerText = albun.date;
  mainImg.setAttribute("src", `../${albun.highlight}`);
  mainImg.setAttribute("alt", albun.title);
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

let isAlbumInHighlights = false;
let highlightId = null;

async function updateHighlightState() {
  const res = await fetch(
    "https://lopic-server.rodrigomsrocha.repl.co/highlights"
  );
  const data = await res.json();

  const highlight = data.find((highlight) => {
    return highlight.albunId === +id;
  });

  isAlbumInHighlights = !!highlight;

  console.log(isAlbumInHighlights);

  if (isAlbumInHighlights) {
    highlightId = highlight.id;
    highlightBtn.innerText = "Remover dos destaques";
  } else {
    highlightId = null;
    highlightBtn.innerText = "Adicionar aos destaques";
  }
}

async function handleHighlight() {
  if (isAlbumInHighlights) {
    await fetch(
      `https://lopic-server.rodrigomsrocha.repl.co/highlights/${highlightId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    await fetch("https://lopic-server.rodrigomsrocha.repl.co/highlights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        albunId: +id,
        description: albun.description,
        url: albun.highlight,
      }),
    });
  }
  updateHighlightState();
}

highlightBtn.addEventListener("click", handleHighlight);
