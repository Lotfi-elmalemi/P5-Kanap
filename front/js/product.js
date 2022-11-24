// 
const string = window.location;
const url = new URL(string);
const id = url.searchParams.get("id");
const host = "http://localhost:3000/";
const objectURL = host + "api/products/" + id;

  // Fonction permettant d'afficher les informations liées au produit sélectionné.
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

// Fonction permettant de stocker la quantité
function quantityValue() {
  let quantity = document.getElementById("quantity");
  return parseInt(quantity.value);
}
// Fonction permettant de stocker la couleur
function colorValue() {
  let color = document.getElementById("colors");
  return color.value;
}

console.log(quantityValue());
console.log(colorValue());


const toCartBtn = document.getElementById("addToCart");
// Prise en compte de la quantité et de la couleurs sélectionné par l'utilisateur.
toCartBtn.addEventListener("click", () => {
  let qty = quantityValue();
  let color = colorValue();

  addToCart(id, color, qty);
});
// Fonction permettant d'afficher la panier
function getCart() {
  let items = [];
  if (localStorage.getItem("panier") != null) {
    items = JSON.parse(localStorage.getItem("panier"));
  }
  return items;
}
// Fonction permettant de sauvegarder le panier
function saveCart() {
  localStorage.setItem("panier", JSON.stringify(panier))
  } 


// Fonction permettant d'ajouter au panier l'id, la couleur et la quantité du produit.
function addToCart(id, color, qty) {
  let cartInfo = {
    id : id,
    color: color,
    qty : qty
  }
// Condition pour panier si même Id mais couleur différentes création d'une nouvelle entrée dans le panier sinon ajout d'une quantité supplémentaire.
 let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
    if (productInLocalStorage === null) {
        productInLocalStorage= [];
        productInLocalStorage.push(cartInfo);
        localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
    } else {
        const found = productInLocalStorage.find(element => element.id == cartInfo.id && element.color == cartInfo.color);
            if (found == undefined) {
            productInLocalStorage.push(cartInfo);
            localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
          } else {
            found.qty += cartInfo.qty;
            localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
        }
    }   
  }

  //let foundProduct = cart.find(p => p.id == product.id);
  //if (foundProduct != undefined) {
  //foundProduct.quantity++;
  //} else {
  //console.log(quantity.value);
  //localStorage.setItem("panier", JSON.stringify(cartInfo));
  //}

