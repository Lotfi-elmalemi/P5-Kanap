let productInLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productInLocalStorage)
let totalQuantity = 0;
const host = "http://localhost:3000/";
const getUrl = host + "api/products/";
// Fonction permettant d'afficher les produits dans le panier si panier vide on affiche un message permettant d'avertir l'utilisateur sinon affichage de celui-ci (récupération image/description... via api)
let displayCards = function () {
    fetch(getUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        totalPrice(data);
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

//console.log(quantityNumber)
// Calcul de l'enssemble des quantités des produits présents dans le panier
totalQuantity += parseInt(productInLocalStorage[i].qty);
document.querySelector("#totalQuantity").textContent = totalQuantity;
//console.log(totalQuantity);

// Fonction permettant de supprimer un item du panier
     function deleteItem() {
         let buttons = document.querySelectorAll('.deleteItem');
         console.log(buttons);
         for (let button of buttons) {
             button.addEventListener("click", e => {
                 let canapeId = e.target.getAttribute("canapeId");
                 let canapeColor = e.target.getAttribute("canapeColor");
                 const searchDeleteItem = productInLocalStorage.find(element => element.id == canapeId && element.color == canapeColor);
                 productInLocalStorage = productInLocalStorage.filter(item => item != searchDeleteItem);
                 localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
                 window.location.href = "cart.html";
             });
         }
     }
deleteItem();
// Fonction permettant de modifier la quantité d'un item dans le panier (ajout et suppression d'une quantité)
function modifyQuantity() {
    let inputs = document.querySelectorAll('.itemQuantity');
    for (let input of Array.from(inputs)) {
         input.addEventListener("change", event => {
          let canapeId = event.target.getAttribute("canapeId");
          let canapeColor = event.target.getAttribute("canapeColor");
          const modify = productInLocalStorage.find(element => element.id == canapeId && element.color == canapeColor);
          console.log(modify)
          modify.qty = parseInt(input.value);
          productInlocalStorage = modify;
          localStorage.setItem("panier", JSON.stringify(productInLocalStorage));
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

// Fonction permettant de calculer le prix total du panier
function totalPrice(data) {
    let totalOfPrice = 0;
      fetch(getUrl)
      .then((response) => response.json())
      .then((data) => {
    function foundProduct(id) {
            return data.find((product) => product._id === id);
        } 
    for (i = 0 ; i < productInLocalStorage.length ; i++) {
    let id = productInLocalStorage[i].id
    let dataProduct = foundProduct(id)
    totalOfPrice += parseInt(dataProduct.price * productInLocalStorage[i].qty);
    console.log(totalOfPrice);
    //let additionPrice = totalOfPrice;
    //additionPrice += parseInt(totalOfPrice);
    //console.log(additionPrice)
    document.querySelector("#totalPrice").textContent = totalOfPrice;
    }})
}


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
  //let form  = document.getElementsByTagName('form')[0];
  let firstName = document.getElementById('firstName');
  //let firstNameError = document.querySelector('.firstNameErrorMsg');

  //let patternFirstName = document.querySelector("#firstName");
  let nameRegex   = /^[a-zA-Z\-çñàéèêëïîôüù ]{2,}$/;
  firstName.addEventListener('input', (e) => {
    e.preventDefault();
    if(nameRegex.test(firstName.value) == false || firstName.value == "") {
        document.getElementById('firstNameErrorMsg').textContent = "Le prénom saisi n'est pas valide";
        return false;
    } else {
        document.getElementById('firstNameErrorMsg').textContent = "";
        return true;
    }
});
console.log(nameRegex.test(firstName.value));
  //if (nameRegex.test(firstName.value) == false || firstName.value == '') {
   //document.getElementById("firstNameErrorMsg").innerHTML += "Le prénom n'est pas valide";
  //}
  //console.log(nameRegex.test(firstName.value))
  //patternFirstName.setAttribute("pattern", "[a-zA-Z-éèà' -]*");
  //function isValid(value) {
    //return patternFirstName.test(value);
//}
//console.log(isValid);

  let lastName = document.querySelector("#lastName");
  lastName.addEventListener('input', (e) => {
    e.preventDefault();
    if(nameRegex.test(lastName.value) == false || lastName.value == ""){
        document.getElementById('lastNameErrorMsg').textContent = "Le nom saisi n'est pas valide";
        return false;
    } else {
        document.getElementById('lastNameErrorMsg').textContent = "";
        return true;
    }
}); 

    let addressRegex = /^[0-9a-zA-Z\s,.'-çñàéèêëïîôüù]{3,}$/;
    let address = document.querySelector("#address");
    address.addEventListener('input' , (e) => {
        e.preventDefault();
        if(addressRegex.test(address.value) == false || address.value == '') {
            document.getElementById('addressErrorMsg').textContent ="L'adresse saisie n'est pas valide";
            return false;
        } else {
            document.getElementById('addressErrorMsg').textContent = "";
        }
    });

  let city = document.querySelector("#city");
  city.addEventListener('input', (e) => {
    e.preventDefault();
    if(addressRegex.test(city.value) == false || city.value == "") {
        document.getElementById('cityErrorMsg').textContent = "La ville saisie n'est pas valide";
        return false;
    } else {
        document.getElementById('cityErrorMsg').textContent = "";
        return true;
    }
});

  let emailRegex = /^[A-Za-z0-9\-\.]+@([A-Za-z0-9\-]+\.)+[A-Za-z0-9-]{2,4}$/;
  let email = document.querySelector("#email");
  email.addEventListener('input', (e) => {
    e.preventDefault();
    if(emailRegex.test(email.value) == false || email.value == "") {
        document.getElementById('emailErrorMsg').textContent = "L'adresse mail saisie n'est pas valide";
        return false;
    } else {
        document.getElementById('emailErrorMsg').textContent = "";
        return true;
    }
});


  
  
  // Création d'un array ayant tout les ID des produits présent dans le panier et si entrée formulaire valide création de ID de confirmation
 
let order = document.getElementById('order');
order.addEventListener('click', async (e) => {
    e.preventDefault();
    // récupère les données du client
    let contact = {
        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };
    // conditions
    let isEmpty = 
        firstName.value === "" || 
        lastName.value === "" || 
        address.value === "" || 
        city.value === "" || 
        email.value === "";
    
    let isTextRegex = 
        nameRegex.test(firstName.value) == false || 
        nameRegex.test(lastName.value) == false || 
        addressRegex.test(address.value) == false ||
        nameRegex.test(city.value) == false || 
        emailRegex.test(email.value) == false;
    if(isEmpty | isTextRegex) {
        alert("Renseigner vos coordonnées correctement afin de passer la commande.")
        return;
    } else {
        let products = productInLocalStorage.map((order) => order.id);
        let pageOrder = {contact, products};
        // envois des données à l'API
        try {
            const res = await fetch('http://localhost:3000/api/products/order', {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(pageOrder),
            });
            const confirm = await res.json();
            window.location.href = "./confirmation.html?orderId=" + confirm.orderId;
            localStorage.clear();
        } catch (error) {
            console.log(`erreur : ${error}`);
        }
    }
});        


