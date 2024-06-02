import { cartItems, removeFromCart, updateDeliveryOption } from "../productsMain/cartItems.js";
import { products } from "../productsMain/products0to500.js";
import { deliveryOptions } from "../productsMain/deliveryOptions.js";
import { dollarsToCents, centsToDollars } from "../utils/base.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

let jsCheckoutItem = document.querySelector(".js-checkout-items");
let jscartCount = document.querySelector(".cart-count");
let jsCartCount = document.querySelector(".js-cart-count");

let shippingFee = "";

function renderOrderSummary() {
  function updateCartQuantity() {
    let cartQuantity = 0;
    cartItems.forEach((item) => {
      cartQuantity += item.quantity;
    });

    jsCartCount.textContent = cartQuantity;
  }
  updateCartQuantity();

  jscartCount.textContent = cartItems.length;

  let jsCheckoutHtml = "";
  cartItems.forEach((cartItem) => {
    const productId = cartItem.productId;
    const cartQuantity = cartItem.quantity;

    // Find the matching product
    let matchingProduct = products.find((product) => product.upc === productId);

    if (!matchingProduct) {
      console.error(`Product with UPC ${productId} not found`);
      return;
    }

    jsCheckoutHtml += `
            <div class="flex flex-col md:flex-row items-start md:items-center bg-white border border-gray-200 rounded-lg p-4 md:space-x-4 js-cart-item-container-${matchingProduct.upc}">
                <div class="flex-shrink-0 w-full md:w-auto md:px-4 py-2">
                    <img src="${matchingProduct.image}" alt="${matchingProduct.name}"
                    onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" class="w-24 h-24 md:w-32 md:h-32 rounded object-cover mx-auto md:mx-0">
                </div>
                <div class="flex flex-col w-full md:w-auto md:px-4 py-2 space-y-2">
                    <div>
                        <span class="block text-gray-900 text-sm md:text-base font-medium">${matchingProduct.name}</span>
                    </div>
                    <div class="flex flex-col justify-between md:flex-row items-start md:items-center w-full md:space-x-4">
                        <div class="w-full md:w-auto">
                            <label for="quantity" class="text-gray-600 text-xs md:text-sm">Quantity</label>
                            <input id="quantity" type="number" value="${cartQuantity}" disabled class="w-full md:w-16 py-1 px-1 border border-gray-200 rounded text-center">
                        </div>
                        <div class="w-full md:w-auto mt-2 md:mt-0">
                            <label for="price" class="text-gray-600 text-xs md:text-sm">Price</label>
                            <span id="price" class="block text-gray-900 text-sm md:text-base font-medium">$${centsToDollars(dollarsToCents(matchingProduct.price)).toFixed(2)}</span>
                        </div>
                        <div class="w-full md:w-auto mt-2 md:mt-0">
                            <label for="shipping" class="text-gray-600 text-xs md:text-sm">Shipping Fee</label>
                            <span id="shipping" class="block text-gray-900 text-sm md:text-base font-medium">$${centsToDollars(shippingFee)}</span>
                        </div>
                        <div class="w-full md:w-auto mt-2 md:mt-0">
                            <label for="total" class="text-gray-600 text-xs md:text-sm">Total</label>
                            <span id="total" class="block text-gray-900 text-sm md:text-base font-medium">$${(
                              centsToDollars(dollarsToCents(matchingProduct.price)) + parseFloat(centsToDollars(shippingFee))
                            ).toFixed(2)}</span>
                        </div>
                        <div class="w-full md:w-auto mt-2 md:mt-0">
                            <button class="text-red-600 hover:text-red-800 font-semibold text-xs md:text-sm js-delete-button" data-remove-button="${matchingProduct.upc}">Remove</button>
                        </div>
                    </div>
                    <div class="w-full md:w-auto mt-4">
                        <label class="text-gray-600 text-xs md:text-sm">Shipping Options</label>
                        <div class="flex delivery-options flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-2">
                            ${deliveryOptionsHtml(matchingProduct, cartItems)}
                        </div>
                    </div>
                </div>
            </div>
        `;
  });

  jsCheckoutItem.innerHTML = jsCheckoutHtml;

  document.querySelectorAll(".js-delete-button").forEach((buttonRemove) => {
    buttonRemove.addEventListener("click", () => {
      const removeProductId = buttonRemove.dataset.removeButton;
      removeFromCart(removeProductId);

      const container = document.querySelector(`.js-cart-item-container-${removeProductId}`);
      container.remove();

      if (cartItems.length === 0) {
        jsCheckoutItem.innerHTML = `
                    <div class="relative px-5 py-6 bg-gradient-to-br from-gray-800 to-gray-600">
                        <div class="bg-white p-10 rounded-lg shadow-lg text-center">
                            <svg class="w-16 h-16 mx-auto mb-4 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707a1 1 0 10-1.414-1.414L10 10.586 7.707 8.293a1 1 0 00-1.414 1.414L8.586 12l-2.293 2.293a1 1 0 101.414 1.414L10 13.414l2.293 2.293a1 1 0 001.414-1.414L11.414 12l2.293-2.293z" clip-rule="evenodd"></path>
                            </svg>
                            <h1 class="text-2xl font-bold text-gray-800 mb-2">Your Cart is Empty</h1>
                            <p class="text-gray-600 mb-4">Looks like you haven't added anything to your cart yet.</p>
                            <a href="/index.html" class="inline-block px-6 py-2 text-sm font-medium leading-5 text-white transition-colors duration-200 transform bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700">Continue Shopping</a>
                        </div>
                    </div>
                `;
        reloadtodisplay.remove(reloadtodisplay);
      }
      let reloadtodisplay = window.location.reload();
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", (event) => {
      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;

      shippingFee = event.target.value; // Update the global shipping fee variable
      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary(); // Re-render to update the display
    });
  });
}

function deliveryOptionsHtml(matchingProduct, cartItems) {
  let html = "";
  deliveryOptions.forEach((deliveryOptionCollection) => {
    const toDay = dayjs();
    const deliveryDate = toDay.add(deliveryOptionCollection.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM D");

    const priceString = deliveryOptionCollection.shippingFee === 0 ? "FREE" : `$${centsToDollars(deliveryOptionCollection.shippingFee)}`;

    const cartItem = cartItems.find((el) => el.productId === matchingProduct.upc);
    const isChecked = cartItem ? deliveryOptionCollection.id === cartItem.deliveryOptionsId : false;

    html += `
            <div class="flex items-center space-x-2 js-delivery-option" data-product-id="${matchingProduct.upc}" data-delivery-option-id="${deliveryOptionCollection.id}">
                <input ${isChecked ? "checked" : ""}
                class="delivery-option-input" name="delivery-option-${matchingProduct.upc}"
                type="radio" value="${deliveryOptionCollection.shippingFee}">
                <label class="text-sm text-gray-700 flex flex-col">${priceString} Shipping <span class="text-[11px] text-gray-500">Arrives by <span>${dateString}</span>.</span></label>
            </div>
        `;
  });

  return html;
}

renderOrderSummary();
