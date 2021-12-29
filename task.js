/************************************************ JQuery DropDown Menu on MeetTheTem Page**************************************/
$("nav div").click(function() {
    $("ul").slideToggle();
    $("ul ul").css("display", "none");
});

$("ul li").click(function() {
    $("ul ul").slideUp();
    $(this).find('ul').slideToggle();
});

$(window).resize(function() {
    if($(window).width() > 768) {
          $("ul").removeAttr('style');
    }
});
/******************************************************JQuery animation on MeetTheTem Page**************************/
    $(".RoundImg").mouseenter(function(){
        $(this).animate({
            height: '95%',
            width: '100%',
            border:'90%',
        }).mouseleave(function() {
            $(this).animate({
                height: '80%',
                width: '90%',
                border:'90%'


            });
        });
    })
/**************************************************jQuery with chained effects on aboutUs page.**************************/
  $(document).ready(function(){
      $(".ceoPic").mouseenter(function(){
          $(this).css("border-color","blue")
          .slideUp(2000)
          .slideDown(2000);
      })
  })


/**declare a variable that store all element that has [class="add-cart"], its selecting all the elemnet that i need**/
var carts = document.querySelectorAll(".add-cart");

/* Array of objects.  its contains all the object that i sell online, the object that i am gonna be using*/
/**the product name and tag should have the same name  and name[Majuscule avec ou sans espace], tag[minuscule and en 1 mots pas d'espace] than the
 * .toLowercase() matter otherwise keep the tag[majuscule en 1mot and remove .toLowercase]
 */
var products = [{
        name: 'SamsungA',
        tag: 'samsunga', // tag to grab image  
        price: '130',
        inCart: 0, // check how many times this items is Add on the cart and its start by 0 time

    },
    {
        name: 'SamsungB',
        tag: 'samsungb', // tag to grab image
        price: '30',
        inCart: 0, // check how many times this items is Add on the cart and its start by 0 time

    },
    {
        name: 'SamsungC',
        tag: 'samsungc', // tag to grab image
        price: '55',
        inCart: 0, // check how many times this items is Add on the cart and its start by 0 time

    },
    {
        name: 'SamsungD',
        tag: 'samsungd', // tag to grab image
        price: '630',
        inCart: 0, // check how many times this items is Add on the cart and its start by 0 time

    },
    {
        name: 'SamsungE',
        tag: 'samsunge', // tag to grab image
        price: '450',
        inCart: 0, // check how many times this items is Add on the cart and its start by 0 time

    },
    {
        name: 'SamsungF',
        tag: 'samsungf', // tag to grab image
        price: '520',
        inCart: 0, // check how many times this items is Add on the cart and its start by 0 time
    },
]

/** going through the declared variable (carts variable) by a for loop and create a eventListener on clicking */
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        let cartCost = localStorage.getItem("totalCost");
        let actuallPrice = products[i].price;
        let Totalprice = Number(cartCost) + Number(actuallPrice);
        if (cartCost === null) {
            alert("Total Cart: " + actuallPrice);
        } else {
            alert("Total Cart: " + Totalprice);
        }

        /*pass array products object (as an argument) inside the cartNumbers function to know which items of the productes array has been clicked */
        cartNumbers(products[i]);
        /**4.1 we call the totalCost function in my loop and pass inside the value of the objects products*/
        totalCost(products[i]);
    })
}

/**2.The function that keep the Number of the selected item appear next to the cart image even if we referesh the page**/
function onLoadCartNumbers() {
    /*from the local storage we get the key which is a string type; mean we take what is inside the localStorage  */
    let productNumbers = localStorage.getItem('cartNumbers');
    /**if there are some productNumber from the localStorage then display its number next to the cart image */
    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
/****************************************end of the function ********************************************************* */


/**1.Update the number of item while clicking on Items and showing on the webpage the number of item selected */
function cartNumbers(product, action) {
    /* we pass a parameter product which will help to know which product and how many times its gonna be add on the localStorage */
    /*from the local storage we get the key which is a string type; mean we take what is inside the localStorage */
    let productNumbers = localStorage.getItem('cartNumbers');
    /** we convert the key from the localstorage  of type string to become an integer*/
    productNumbers = parseInt(productNumbers);

    /**7.4 */
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    /**if my action if decrease */
    if (action == "decrease") {
        /**get the total products number - 1 */
        localStorage.setItem("cartNumbers", productNumbers - 1);
        /**also update the new number of prodcut in the cart on the page  */
        document.querySelector('.cart span').textContent = productNumbers - 1;
    }
    /**if first Time to load the page and there is a number of product  */
    else if (productNumbers) {
        /**set the product to add number if u select new item or same item  */
        localStorage.setItem("cartNumbers", productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    }
    /**if we are not clicking any item */
    else {
        localStorage.setItem("cartNumbers", 1);
        document.querySelector('.cart span').textContent = 1

    }


    /**3.1 we call the setItem function and pass the parameters (product) inside  the cartNumbers function */

    setItems(product);
}
/************************************ end of function **************************************************************** */

/**3.Store inside the LocalStorage which specific item has been clicked and how many times means [key, value] are determinated*/
function setItems(product) {
    /**3.4.Check if the item exist already in the cart thats why getItem from the localStorage if it exist or not*/
    let cartItems = localStorage.getItem("productsInCart");
    /*3.5. if the item exist in the local storage then we have to convert it back into a javascript object because if the item is store in the locatStorage or database; means it has been store into a json form by JSON.stringify(x) */
    cartItems = JSON.parse(cartItems)
    /*3.6.Now let apply the condition if item its exist already or not. If the item exit already then increase only the number of time it has ben selected or clicked(check the attribute call => inCart: (number of Time))  */
    if (cartItems != null) {
        /** 3.8. now when the local storage is not empty and you wanna add another product(item) different from the first one which is already store in the localStorage;
         * then create an if statement for eqaul to undefined*/
        if (cartItems[product.tag] == undefined) {
            /*update cartItem to have what was already in the localStorage and add other items when click on them... */
            cartItems = {
                ...cartItems,
                /** what was befre */
                [product.tag]: product /*add the new one */
            }
        }
        //3.7. if the item exist in the cart; increase the product.incart to be equal to the number of time thw item is going to be selected
        cartItems[product.tag].inCart += 1; /**this code is the same as cartItems["Samsung1"] */
    } else {
        /**3.2.set the product incart number means once you click on the item once; the item tells that in the cart it has been selected(clicked) once */
        product.inCart = 1;
        /**3.4.creating variable cartItems (whatever is your tagName eg.samsung1)  of items  */
        cartItems = {
            [product.tag]: product
        }
    }
    /**3.3.store in the localStorage the item object but since it's in javascript form; you need to convert it into a JSON form by JSON.stringify */
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}
/*************************************end of the function******************************************************************************************************** */


/*4.****the function that calculate the totacl cost */
function totalCost(product, action) {
    /**4.3 if you click for the second time; you need to check if there's anything in the cart already or not so 
     * create a variable cartCost that grab the totalCost what is already in the localStorage means what have been already selected before */
    let cartCost = localStorage.getItem("totalCost");

    if (action == "decrease") {
        cartCost = parseInt(cartCost);

        localStorage.setItem("totalCost", cartCost - product.price);

    }

    /**4.5check if the totalCost is null */
    else if (cartCost != null) {
        /**4.4 since the totalCost existing is in the localStorage means its in a string type so let convert it in type number */
        cartCost = parseInt(cartCost);
        /**if its not null then whatever price was before plus the price what is added  */
        localStorage.setItem("totalCost", cartCost +
            Number(product.price));
    } else {
        /**4.2 set the localStorage to have the product price*/
        localStorage.setItem("totalCost", product.price)
    }

}
/*******************************************end of the function******************************************************** */

/**5 function that display the prodcut which is in the localStorage into the Cart Page */
function displayCart() {

    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    let cartCost = localStorage.getItem("totalCost");
    let myTotalWithVat = Number(cartCost) + Number(cartCost*0.15);


    /**check if there's a product(item) in the localStorage and check if the product is already appeared on the page */
    if (cartItems && productContainer) {
        productContainer.innerHTML = ``;
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product">
                <ion-icon name = "close-circle"></ion-icon>
                <img src ="./images/${item.tag}.jpg">
                <span>${item.name}</span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
                <ion-icon class="decrease" name="arrow-dropleft-circle"></ion-icon>
                <span>${item.inCart}</span>
                <ion-icon class="increase" name="arrow-dropright-circle"></ion-icon>
            </div> 
               
            <div class="total">
              $${item.inCart * item.price},00
            </div>
            
            `;
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">
                    Basket  Total
                </h4>
                <h4 class="basketTotal">
                    $${cartCost},00
                </h4>    
        `

    }
   
     /******************************************************************************************* */ 
    document.getElementById("Total_Vat_Disc").textContent = "Total: $" + myTotalWithVat;
    document.getElementById("vat").textContent = "VAT: $" + cartCost * 0.15;
    CheckPayementMethod()
    MethodDelivery();
    /********************************************************************************************* */
    /**6.1 the called of deleteButton() function inside the displayCart finction   */
    deleteButtons();
    /**7.3 the aclled of manageQuantity() function inside the displayCart function */
    manageQuantity();
    
}
/************************************************end of function******************************************************* */

/**6. the function that delete the product in the localStorage*/
function deleteButtons() {
    let deleButtons = document.querySelectorAll(".product ion-icon");
    let productName;
    /**get the number of produt inside the cart */
    let productNumbers = localStorage.getItem('cartNumbers');
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');
    //console.log(cartItems)

    /**for loop to go through the whole deleteButton(otherwise say the delete icon) */
    for (let i = 0; i < deleButtons.length; i++) {
        deleButtons[i].addEventListener('click', () => {
            productName = deleButtons[i].parentElement.textContent.trim().toLowerCase().replace(/ /g, "");
            console.log("productName is " + productName);
            console.log(cartItems[productName].name);
            console.log(cartItems[productName].name + " " + cartItems[productName].inCart);

            localStorage.setItem('cartNumbers', productNumbers - cartItems[productName].inCart);

            localStorage.setItem('totalCost', cartCost - (cartItems[productName].price * cartItems[productName].inCart));

            delete cartItems[productName];
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));


            displayCart();
            onLoadCartNumbers();
        })
    }

}
/**********************************************END OF THE FUNCTION****************************************************** */

/*7*********increase or decrease quantity of an item in the cart*** */
function manageQuantity() {
    /**7.1grab the increase and decrease button */
    let decreaseButtons = document.querySelectorAll(".decrease");
    let increaseButtons = document.querySelectorAll(".increase");
    let currentQuantity = 0;
    let currentProduct = "";
    /**7.3 grab the item name in the cart */
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    /**7.2loop through all the button that i grab(decrease and increase button) */
    for (let i = 0; i < decreaseButtons.length; i++) {
        decreaseButtons[i].addEventListener('click', () => {
            /*grab the quantity of a particular item */
            /*currentQuantity =  document.querySelector('.quantity span').textContent; 00000000000000000000000000*/
            currentQuantity = decreaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            /**grab the name of a particular item */
            currentProduct = decreaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            /*currentProduct= document.querySelector('.product span').textContent.toLowerCase().replace(/ /g, "").trim();0000000000000000*/
            console.log(currentProduct);

            /**if condition to check if the number of item selected is greater than 1 */
            if (cartItems[currentProduct].inCart > 1) {
                /**whatever number was in the inCart = then you minus by 1  */
                cartItems[currentProduct].inCart = cartItems[currentProduct].inCart - 1;
                cartNumbers(cartItems[currentProduct], "decrease");
                totalCost(cartItems[currentProduct], "decrease");
                //update the new localStorage when you decrease the quantity of number of an item
                localStorage.setItem('productsInCart', JSON.stringify(cartItems));

                let cartCost = localStorage.getItem("totalCost");


                //then display the new updated number
                displayCart();

            }
            /*the problem with this if statement its only update the number of time the item is selected and its price but
                         not the total price and not the number of item in the cart and for everything to be updated; its the line 263 we call function cartNumbers and pass
                         (cartItems, decrease)which are argument of parameter  line 74 cartNumbers(product, action) and line 276 to update the total and view line 146 where i also
                         pass the action
                
                         */

        })
    }

    for (let i = 0; i < increaseButtons.length; i++) {
        increaseButtons[i].addEventListener('click', () => {
            console.log("increase buttons");
            /*grab the quantity of a particular item */
            currentQuantity = increaseButtons[i].parentElement.querySelector('span').textContent;
            console.log(currentQuantity);
            /**grab the name of a particular item */
            currentProduct = increaseButtons[i].parentElement.previousElementSibling.previousElementSibling.querySelector('span').textContent.toLowerCase().replace(/ /g, '').trim();
            console.log(currentProduct);


            cartItems[currentProduct].inCart += 1;
            cartNumbers(cartItems[currentProduct]);
            totalCost(cartItems[currentProduct]);
            //update the new localStorage when you decrease the quantity of number of an item
            localStorage.setItem('productsInCart', JSON.stringify(cartItems));
            let cartCost = localStorage.getItem("totalCost");


            //then display the new updated number
            displayCart();



        })
    }
}


/** Method that cheked payment method  it's use the *************************JQuery hiding and showing on the AddCart page**************************/
function CheckPayementMethod() {

    /********************************************** */
    let cartCost = localStorage.getItem("totalCost");
    let collectionPrice = 0;
    let TotalPrice = Number(cartCost) + Number(cartCost) * 0.15;

    if ($('#delivery').is(":checked"))
        $("#deliveryOption").show();

    else if ($(".collectionClicked").is(":checked")) {
        $("#deliveryOption").hide();
        document.getElementById("delivShow").textContent = "Delivery: $" + collectionPrice;
        document.getElementById("Total_Vat_Disc").textContent = "Total: $" + TotalPrice;
        document.getElementById("vat").textContent = "VAT: $" + 0.15 * cartCost
    }





    /* else if($('#collection').is(":checked")){
          document.getElementById("delivShow").textContent="Delivery: $"+collectionPrice;
          document.getElementById("Total_Vat_Disc").textContent="Total: $"+ TotalPrice;
         document.getElementById("vat").textContent="VAT: $"+0.15*cartCost

      }*/



}

/** function that check the the payment which Delivery Method is Clicked and its use*************jQuery hiding and showing on the AddCart page */
function MethodDelivery() {
    let StandartDeliveryPrice = 50;
    let ExpressDeliveryPrice = 100;
    let cartCost = localStorage.getItem("totalCost");
    let TotalPriceWithExpressDelivery = Number(cartCost) + ExpressDeliveryPrice;
    let TotalPriceWithStandartDelivery = Number(cartCost) + StandartDeliveryPrice;
    let TotalVatExpress = TotalPriceWithExpressDelivery + (0.15 * TotalPriceWithExpressDelivery);
    let TotalVatStandart = TotalPriceWithStandartDelivery + (0.15 * TotalPriceWithStandartDelivery)

    if ($('.expressCliked').is(":checked")) {
        document.getElementById("delivShow").textContent = "Delivery: $" + ExpressDeliveryPrice;
        document.getElementById("Total_Vat_Disc").textContent = "Total: $" + TotalVatExpress;
        document.getElementById("vat").textContent = "VAT: $" + 0.15 * TotalPriceWithExpressDelivery;
    } else if ($('.standardCliked').is(":checked")) {
        document.getElementById("delivShow").textContent = "Delivery: $" + StandartDeliveryPrice;
        document.getElementById("Total_Vat_Disc").textContent = "Total: $" + TotalVatStandart;
        document.getElementById("vat").textContent = "VAT: $" + 0.15 * TotalPriceWithStandartDelivery;
    }

}

/**function that gives random reference number and confirmed that the order was successfull*/
function makeid(length) {
      
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
  
}

/**Confirmation Order function */
function ConfirmOrder(){
    let Day = new Date();
    alert("their order was successful and your reference number is "+ Day.toLocaleString()+" "+(makeid(5)));

}
/**discount function */
function Discount(){
    alert("Discount are not Available for this season");
}

/*2.1 this is the called of onLoadCartNumbers function created up so that when refereshing the page the number of item selected does not go back to zero */
onLoadCartNumbers();
/*this is the called of displayCart function which works once the cart page load  */
displayCart();


