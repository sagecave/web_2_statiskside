

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");
const url = `https://kea-alt-del.dk/t7/api/products/${id}`;



function getProdukt() {
    fetch(url)
        .then((response) => response.json())
        .then(visProdukt);
}

function visProdukt(produkt){
    console.log(produkt, "hej")
    document.querySelector(".produkt_overskrift").textContent = produkt.productdisplayname;
    document.querySelector(".produktInfo_single").textContent = `Brand: ${produkt.brandname}`;
    document.querySelector(".pris_single").textContent = `Price: ${produkt.price} kr,-`;
    document.querySelector(".rabat_single").textContent = `Rabat: ${produkt.discount} %`;
    document.querySelector(".info_img img").src = `https://kea-alt-del.dk/t7/images/webp/1000/${produkt.id}.webp`;
    document.querySelector(".info_img").alt = `Picture of a ${produkt.productdisplayname} beer`;
  
    

}

getProdukt();