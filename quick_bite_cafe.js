if (document.readyState == 'loading') {
document.addEventListener('DOMContentLoaded', ready)
} else {
ready()
}

function ready() {
    const cartIcon = document.querySelector(".cart_icon");
    const cart = document.querySelector(".cartList");
    const closeCart = document.querySelector("#cart_close");
    
    cartIcon.addEventListener("click", () => {
    cart.classList.add("active");
    });
    
    closeCart.addEventListener("click", () => {
    cart.classList.remove("active");
    });	

let preveiwContainer = document.querySelector('.products_preview');
let previewBox = preveiwContainer.querySelectorAll('.preview');
document.querySelectorAll('.product').forEach(product =>{
product.onclick = () =>{
    preveiwContainer.style.display = 'flex';
    let name = product.getAttribute('data-name');
    previewBox.forEach(preview =>{
    let target = preview.getAttribute('data-target');
    if(name == target){
        preview.classList.add('active');
    }
    });
};
});
previewBox.forEach(close =>{
close.querySelector('.close').onclick = () =>{
    close.classList.remove('active');
    preveiwContainer.style.display = 'none';
};
});
previewBox.forEach(close =>{
    close.querySelector('.shop_item_button').onclick = () =>{
        close.classList.remove('active');
        preveiwContainer.style.display = 'none';
    };
    });


var removeCartItemButtons = document.getElementsByClassName('btn_danger')
for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', removeCartItem)
}

var quantityInputs = document.getElementsByClassName('cart_quantity_input')
for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i]
    input.addEventListener('change', quantityChanged)
}

var addToCartButtons = document.getElementsByClassName('shop_item_button')
for (var i = 0; i < addToCartButtons.length; i++) {
    var button = addToCartButtons[i]
    button.addEventListener('click', addToCartClicked)
}

// document.getElementsByClassName('btn_purchase')[0].addEventListener('click', purchaseClicked)
}

function purchaseClicked() {
alert('Thank you for your purchase')
var cartItems = document.getElementsByClassName('cart_items')[0]
while (cartItems.hasChildNodes()) {
    cartItems.removeChild(cartItems.firstChild)
}
updateCartTotal()
}

function removeCartItem(event) {
var buttonClicked = event.target
buttonClicked.parentElement.parentElement.remove()
updateCartTotal()
}

function quantityChanged(event) {
var input = event.target
if (isNaN(input.value) || input.value <= 0) {
    input.value = 1
}
updateCartTotal()
}

function addToCartClicked(event) {
var button = event.target
var shopItem = button.parentElement.parentElement
var title = shopItem.getElementsByClassName('shop_item_title')[0].innerText
var price = shopItem.getElementsByClassName('shop_item_price')[0].innerText
var imageSrc = shopItem.getElementsByClassName('shop_item_image')[0].src
addItemToCart(title, price, imageSrc)
updateCartTotal()
}

function addItemToCart(title, price, imageSrc) {
var cartRow = document.createElement('div')
cartRow.classList.add('cart_row')
var cartItems = document.getElementsByClassName('cart_items')[0]
var cartItemNames = cartItems.getElementsByClassName('cart_item_title')
for (var i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
        alert('This item is already added to the cart')
        return
    }
}
var cartRowContents = `
    <div class="cart_item cart_column">
        <img class="cart_item_image" src="${imageSrc}" width="100" height="100">
        <p class="cart_item_title">${title}</p>
    </div>
    <p class="cart_price cart_column">${price}</p>
    <div class="cart_quantity cart_column">
        <input class="cart_quantity_input" type="number" value="1">
        <button class="btn btn_danger" type="button">REMOVE</button>
    </div>`
cartRow.innerHTML = cartRowContents
cartItems.append(cartRow)
cartRow.getElementsByClassName('btn_danger')[0].addEventListener('click', removeCartItem)
cartRow.getElementsByClassName('cart_quantity_input')[0].addEventListener('change', quantityChanged)
}

function updateCartTotal() {
var cartItemContainer = document.getElementsByClassName('cart_items')[0]
var cartRows = cartItemContainer.getElementsByClassName('cart_row')
var total = 0
for (var i = 0; i < cartRows.length; i++) {
    var cartRow = cartRows[i]
    var priceElement = cartRow.getElementsByClassName('cart_price')[0]
    var quantityElement = cartRow.getElementsByClassName('cart_quantity_input')[0]
    var price = parseFloat(priceElement.innerText.replace('RM', ''))
    var quantity = quantityElement.value
    total = total + (price * quantity)
}
total = Math.round(total * 100) / 100
document.getElementsByClassName('cart_total_price')[0].innerText = 'RM' + total
}

function showBillingAddress(val){
if(val==3)
{
    document.getElementsByClassName('billingAddress').style.display='block';
}
else{
    document.getElementsByClassName('billingAddress').style.display='none';
}
}