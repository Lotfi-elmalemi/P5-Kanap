let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productInLocalStorage)
let totalQuantity = 0;
const host = "http://localhost:3000/";
const getUrl = host + "api/products/";

let displayCards = function () {
    fetch(getUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        let foundProduct = function(id) {
            return data.find((product) => product._id === id)
        }
    console.log((foundProduct))
        
 if (productInLocalStorage == null || productInLocalStorage.length == 0) {
    document.getElementById("cart__items").innerHTML += `Votre panier est vide`;

} else {
    document.getElementById("cart__items").innerHTML += `Votre panier`;
 for (i = 0 ; i < productInLocalStorage.length ; i ++) {
    let id = productInLocalStorage[i].id
    let dataProduct = foundProduct(id)
    console.log(dataProduct)
    document.querySelector("#cart__items").innerHTML +=     `<article class="cart__item" data-id="${productInLocalStorage[i].id}">
                                                                    <div class="cart__item__img">
                                                                        <img src="${dataProduct.imageUrl}" alt="${dataProduct.altTxt}">
                                                                    </div>
                                                                  <div class="cart__item__content">
                                                                        <div class="cart__item__content__titlePrice">
                                                                            <h2>${dataProduct.name}</h2>
                                                                            <p>${dataProduct.price} €</p>
                                                                        </div>
                                                                        <div class="cart__item__content__settings">
                                                                            <div class="cart__item__content__settings__quantity">
                                                                                <p>Couleur : ${productInLocalStorage[i].color}</p>
                                                                                <p>Qté : </p>
                                                                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" canapeId="${productInLocalStorage[i].id}" canapeColor="${productInLocalStorage[i].color}" value="${productInLocalStorage[i].qty}">
                                                                            </div>
                                                                            <div class="cart__item__content__settings__delete">
                                                                                <p class="deleteItem" canapeId="${productInLocalStorage[i].id}" canapeColor="${productInLocalStorage[i].color}">Supprimer</p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </article>`;                                                     
let quantityNumber = parseInt(productInLocalStorage[i].qty);
//console.log(quantityNumber)
totalQuantity += parseInt(productInLocalStorage[i].qty);
document.querySelector("#totalQuantity").textContent = totalQuantity;
//console.log(totalQuantity);
//let price = parseInt(dataProduct[i].price);
//totalPrice += parseInt(dataProduct[i].price * productInLocalStorage[i].qty);
//document.querySelector("#totalPrice").textContent = totalPrice;
 
let deleteItem = () => {
    let buttons = document.querySelectorAll('.deleteItem');
    console.log(buttons);
    for (let button of buttons) {
        button.addEventListener("click", e => {
            let canapeId = e.target.getAttribute("canapeId");
            let canapeColor = e.target.getAttribute("canapeColor");
            const searchDeleteItem = productInLocalStorage.find(element => element.id == canapeId && element.color == canapeColor);
            productInLocalStorage = productInLocalStorage.filter(item => item != searchDeleteItem);
            localStorage.removeItem("Canape", JSON.stringify(productInLocalStorage));
            window.location.href = "cart.html";
        });
    }
}
deleteItem();
function modifyQuantity() {
    let inputs = document.querySelectorAll('.itemQuantity');
    for (let input of Array.from(inputs)) {
         input.addEventListener("change", event => {
          let canapeId = event.target.getAttribute("canapeId");
          let canapeColor = event.target.getAttribute("canapeColor");
          const modify = productInLocalStorage.find(element => element.id == canapeId && element.color == canapeColor);
          console.log(modify)
          modify.qty = input.value;
          productInlocalStorage = modify;
          localStorage.setItem("Canape", JSON.stringify(productInLocalStorage));
          window.location.href = "cart.html";
      })
    }
  }
modifyQuantity();
}
};
})
}
displayCards();


//function modifyQuantity() {
//    let inputs = document.querySelectorAll('.itemQuantity');
//    for (let input of Array.from(inputs)) {
//        input.addEventListener("change", event => {
//          let canapeId = event.target.getAttribute("canapeId");
//          let canapeColor = event.target.getAttribute("canapeColor");
//          const modify = productInLocalStorage.find(element => element.id == productInLocalStorage.id && element.couleur == productInLocalStorage.color);
//          console.log(modify)
//          modify.qty = input.value;
//          productInlocalStorage = modify;
//          localStorage.setItem("Canape", JSON.stringify(productInLocalStorage));
//          window.location.href = "cart.html";
//      })
//    }
//  }

//  modifyQuantity();

//function deleteItem() {

//    for (let button of buttons){
//        button.addEventListener("click", e => {
//            let canapeId = e.target.getAttribute("canapeId");
//            let canapeColor = e.target.getAttribute("canapeColor");
//            const searchDeleteItem = productInLocalStorage.find(element => element.id == canapeId && element.couleur == canapeColor);
//            productInLocalStorage = productInLocalStorage.filter(item => item != searchDeleteItem);
//            localStorage.removeItem("Canape", JSON.stringify(productInLocalStorage));
//            window.location.href = "cart.html";
//        })
//    }
//  }
 
// deleteItem();

  let patternFirstName = document.querySelector("#firstName");
  patternFirstName.setAttribute("pattern", "[a-zA-Z-éèà' -]*");
    
  let patternLastName = document.querySelector("#lastName");
  patternLastName.setAttribute("pattern", "[a-zA-Z-éèà' -]*");
  
  let patternCity = document.querySelector("#city");
  patternCity.setAttribute("pattern", "[a-zA-Z-éèà' -]*");

  let patternEmail = document.querySelector("#email");
  patternEmail.setAttribute("pattern", "[a-zA-z-éèà-0-9' -@")




