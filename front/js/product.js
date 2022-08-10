const string = window.location;
const url = new URL(string);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;


let displayProduct = function () {
  fetch(objectURL)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Image et Alttext
      let img = document.querySelector(".item__img");
      img.innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}">`;
      // Nom et titre
      let name = document.getElementById("title");
      name.innerHTML = data.name;
      let title = document.querySelector("title");
      title.innerHTML = data.name;
      // prix
      let price = document.getElementById("price");
      price.innerHTML = `${data.price}`;
      // description
      let description = document.getElementById("description");
      description.innerHTML = data.description;
      // couleurs
      let color = document.getElementById("colors");
      for (i = 0; i < data.colors.length; i++) {
        color.innerHTML += `<option value="${data.colors[i]}">${data.colors[i]}</option>`;
      }
    });
};
displayProduct();