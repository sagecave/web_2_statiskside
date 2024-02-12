// const url = `https://kea-alt-del.dk/t7/api/products?categories=${category}`;
// const url = `https://kea-alt-del.dk/t7/api/products`;
const url = `https://kea-alt-del.dk/t7/api/categories`;

function getProdukt() {
  fetch(url)
    .then((response) => response.json())
    .then((json) => visProdukt(json));
}

function visProdukt(produktsJSON) {
  console.log("produktsJSON", produktsJSON);
  const categoryTemplate = document.querySelector("template");
  let categoryClone;

  const categoryContainer = document.querySelector(".kategori_box");
  console.log("produktListeContainer", categoryContainer);

  produktsJSON.forEach((category) => {
    categoryClone = categoryTemplate.cloneNode(true).content;
    categoryClone.querySelector(".apparel_link").textContent = category.category;
    categoryClone.querySelector(".apparel_link").href = `produktliste.html?category=${category.category}`;
    categoryContainer.appendChild(categoryClone);
  });
}

getProdukt();
console.log("hej22");
