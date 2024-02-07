window.addEventListener("DOMContentLoaded", init);

const produktURL = 'https://kea-alt-del.dk/t7/api/products';


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
    ProduktClone.querySelector(".produkt_price").textContent = `${produkt.price} kr,-`;
    ProduktClone.querySelector(".link_produkt").href = `produkt.html?id=${produkt.id}`;
    ProduktClone.querySelector(".produkt_rabt").textContent = `Rabat: ${produkt.discount} %`;
    ProduktClone.querySelector(".produkt_rabatPrice").textContent = ` ${(produkt.price/100 * produkt.discount).toFixed(0)} kr,-`;
    // ProduktClone.querySelector(".beer_tagline").textContent = beer.tagline;
    // ProduktClone.querySelector(".beer_description").textContent = beer.description;
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