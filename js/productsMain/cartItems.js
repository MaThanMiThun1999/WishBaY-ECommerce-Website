export let cartItems = JSON.parse(localStorage.getItem("cartItems"));

if (!cartItems) {
  cartItems = [
    {
      productId: "810532022421",
      quantity: 2,
      deliveryOptionsId: "1",
    },
    {
      productId: "681620763294",
      quantity: 1,
      deliveryOptionsId: "2",
    },
  ];
}

function saveToStorage() {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
}

export function addToCart(productId) {
  let matchingItem;
  cartItems.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += 1;
  } else {
    cartItems.push({
      productId: productId,
      quantity: 1,
      deliveryOptionsId: "1",
    });
  }
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cartItems.forEach((cart) => {
    if (cart.productId !== productId) {
      newCart.push(cart);
    }
  });
  cartItems = newCart;
  saveToStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;
  cartItems.forEach((item) => {
    if (productId === item.productId) {
      matchingItem = item;
    }
  });
  matchingItem.deliveryOptionsId = deliveryOptionId;
  saveToStorage();
}
