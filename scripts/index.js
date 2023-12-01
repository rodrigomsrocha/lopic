const mobileNav = document.querySelector(".mobile-nav");
const navBtn = document.querySelector(".nav-btn");

window.addEventListener("load", getData);

async function getData() {
  const res = await fetch("https://lopic-server.rodrigomsrocha.repl.co/albuns");
  const data = await res.json();

  data.forEach((album) => {
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
    const marker = new mapboxgl.Marker({ color: "#84e" })
      .setLngLat(album.loc)
      .setPopup(popup)
      .addTo(map);
  });
}

const centralLatLong = [-3.70379, 40.416775];

mapboxgl.accessToken =
  "pk.eyJ1Ijoicm9kcmlnbzIxMDciLCJhIjoiY2xwbGp1emZsMDBzdTJqbWx6ZGI1bnlycCJ9.G1Swubdn_EFSMlM-Q86GsA";
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
