window.addEventListener("DOMContentLoaded", init);

const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get("category");
console.log("category", category);
let produktURL;

if (category) {
  produktURL = `https://kea-alt-del.dk/t7/api/products?category=${category}`;
  document.querySelector("h1").textContent = category;
  console.log("cate");
} else {
  produktURL = "https://kea-alt-del.dk/t7/api/products";
  console.log("normal");
}

let produkt_template;
let produktListe_container;

function init() {
  console.log("init");

  produkt_template = document.querySelector(".produkt_template");
  console.log("produkt_template", produkt_template);

  produktListe_container = document.querySelector(".produktListe_container");
  console.log("produktListe_container", produktListe_container);

  fetch(produktURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      showProdukts(json);
    });
}

function showProdukts(ProduktsJSON) {
  let ProduktClone;

  ProduktsJSON.forEach((produkt) => {
    console.log("produkt", produkt);
    ProduktClone = produkt_template.cloneNode(true).content;
    ProduktClone.querySelector(".produkt_img").src = `https://kea-alt-del.dk/t7/images/webp/1000/${produkt.id}.webp`;
    ProduktClone.querySelector(".produkt_img").alt = `Picture of a ${produkt.productdisplayname} beer`;
    ProduktClone.querySelector(".produkt_name").textContent = produkt.productdisplayname;
    ProduktClone.querySelector(".produkt_category").textContent = produkt.category;
    ProduktClone.querySelector(".produkt_price").textContent = `${produkt.price} kr,-`;
    ProduktClone.querySelector(".link_produkt").href = `produkt.html?id=${produkt.id}`;
    ProduktClone.querySelector(".produkt_rabt").textContent = `Rabat: ${produkt.discount} %`;
    ProduktClone.querySelector(".produkt_rabatPrice").textContent = ` ${((produkt.price / 100) * produkt.discount).toFixed(0)} kr,-`;
    // ProduktClone.querySelector(".beer_tagline").textContent = beer.tagline;
    // ProduktClone.querySelector(".beer_description").textContent = beer.description;

    if (produkt.soldout) {
      ProduktClone.querySelector(".card_div").classList.add("udsolgt");
      console.log("hej");
    } else {
      ProduktClone.querySelector(".card_div h3").classList.add("display_none");
    }
    if (produkt.discount) {
      ProduktClone.querySelector(".rabatKasse").classList.add("rabat");
      ProduktClone.querySelector(".rabatKasse").classList.add("rabat_boks");
      ProduktClone.querySelector(".produkt_price").classList.add("line_t");
      console.log("hej");
    } else {
      ProduktClone.querySelector(".rabat_tekst").classList.add("display_none");
      ProduktClone.querySelector(".produkt_rabatPrice").classList.add("display_none");
    }

    produktListe_container.appendChild(ProduktClone);

    // let rabatForsvind
    // let stockForsvind
    // document.querySelector(".produkt_outOfStock").textContent = stockForsvind
    // document.querySelector(".produkt_rabt").textContent = rabatForsvind

    // if (produkt.discount <= 0){
    //     document.querySelector(".rabat_boks").classList.remove(".hidden_rabt")
    // }
  });
}
