const mobileNav = document.querySelector(".mobile-nav");
const navBtn = document.querySelector(".nav-btn");

const albunsContainer = document.querySelector(".albuns");

window.addEventListener("load", getData);

async function getData() {
  const albunsRes = await fetch(
    "https://lopic-server.rodrigomsrocha.repl.co/albuns"
  );
  const albuns = await albunsRes.json();

  albuns.forEach((album) => {
    let popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
          <div class="popup-map">
            <header>
              <h3>
                <a href="${album.url}">${album.title}</a>
              </h3>
              <span>${album.date}<span>
            </header>
            <img src="${album.highlight}" />
          </div>
        `);
    const marker = new mapboxgl.Marker({ color: "#09090b" })
      .setLngLat(album.loc)
      .setPopup(popup)
      .addTo(map);

    albunsContainer.innerHTML += `
      <div class="album">
        <a href=${album.url} class="img-wrapper">
          <img src=${album.highlight} alt=${album.title} />
        </a>
        <div class="album-info">
          <strong>${album.title}</strong>
          <span>
            ${album.description}
          </span>
        </div>
      </div>
    `;
  });
}

const centralLatLong = [-3.70379, 40.416775];

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9kcmlnbzIxMDciLCJhIjoiY2xwbmJiOWt6MDN5MjJqcXQxNnlhdHFpeiJ9.LCoW2fnRYaZDsChm_M2_Hw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v12",
  center: centralLatLong,
  zoom: 9,
});

navBtn.addEventListener("click", () => {
  mobileNav.classList.toggle("open");
});

document.addEventListener("click", function (event) {
  if (event.target !== navBtn && event.target !== mobileNav) {
    mobileNav.classList.remove("open");
  }
});
