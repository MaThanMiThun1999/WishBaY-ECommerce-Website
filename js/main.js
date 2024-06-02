import { products } from "./productsMain/products0to500.js";
import { cartItems, addToCart } from "./productsMain/cartItems.js";
import { dollarsToCents, centsToDollars } from "./utils/base.js";

let jsProducsItem = document.querySelector(".jsProducsItem");
let jstodaysDeal = document.querySelector(".todaysDeal");
let jsproductComputersTablets = document.querySelector(".productComputersTablets");
let jsproductRefrigerators = document.querySelector(".productRefrigerators");
let jsproductPersonalCare = document.querySelector(".productPersonalCare");
let jsproductGaming = document.querySelector(".productGaming");
let jsCartCount = document.querySelector(".js-cart-count");
let loadMoreButton = document.querySelector(".load-more-button");
let itemsContainer = document.querySelector(".itemsContainer");
let jsClickedProductViewer = document.querySelector(".clicked-products");

// start

let firstload = 0;
let nextload = 20;
let isLoading = false; // Flag to track loading state

function loadItems() {
  if (isLoading) return; // If already loading, ignore additional clicks

  isLoading = true; // Set loading state to true
  loadMoreButton.disabled = true; // Disable button to prevent multiple clicks
  loadMoreButton.innerHTML = `<img class="w-5 h-5 mr-2 animate-spin" src="https://www.svgrepo.com/show/169757/loading-process.svg" alt="Loading icon"> Loading...`; // Show loading animation

  // Delay loading items for 2000ms
  setTimeout(() => {
    let endload = Math.min(firstload + nextload, products.length);
    for (let i = firstload; i < endload; i++) {
      let product = products[i];
      let productHtml = `
      <div class="product rounded-xl border-[1px] border-[rgb(220, 229, 233)] hover:scale-105 duration-200">
      <img class="rounded-[10px_10px_0px_0px] min-h-[114.125px] md:max-h-[255px] md:h-[255px] max-xl:w-full aspect-square object-contain overflow-hidden" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" src="${
        product.image
      }" alt="">
      <div class="px-2">
        <h1 class="font-bold md:text-base text-xs truncate mt-3 md:mt-5 mb-1">${product.name}</h1>
        <div class="flex items-center space-x-1 pb-1">
          <img class="md:w-20 w-14" src="./assets/ratingImages/rating-${product.rating * 10}.png" alt="" srcset="">
          <span class="text-gray-700 mt-[2px] text-sm font-medium">
            ${product.rating}
          </span>
        </div>
        <h5 class="pb-2 font-bold">$ ${centsToDollars(dollarsToCents(product.price)).toFixed(2)}</h5>
        <div class="pb-2">
          <button class="bg-black w-full text-white rounded-md py-1 text-sm font-bold duration-300 hover:bg-[rgb(190,54,1)]">
          Sold
          </button>

        </div>
      </div>
    </div>
      `;
      itemsContainer.innerHTML += productHtml;
    }

    firstload = endload;

    if (firstload >= products.length) {
      loadMoreButton.style.display = "none";
    }

    isLoading = false;
    loadMoreButton.disabled = false;
    loadMoreButton.innerHTML = "Load More";
  }, 2000);
}

loadMoreButton.addEventListener("click", () => {
  loadItems();
});

// Initial load
loadItems();

let iPhone = products.filter((product) => {
  return product.category.filter((el) => el.name === "iPhone Accessories").length > 0;
});

let iPhoneCategoryHtml = "";
iPhone.forEach((iPhone) => {
  iPhoneCategoryHtml += `
   
            <div class="rounded-xl border-[1px] border-[rgb(220, 229, 233)] hover:scale-105 duration-200">
              <img class="rounded-[10px_10px_0px_0px] min-h-[114.125px] md:max-h-[255px] md:h-[255px] max-xl:w-full aspect-square object-contain overflow-hidden" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" src="${
                iPhone.image
              }" alt="">
              <div class="px-2">
                <h1 class="font-bold md:text-base text-xs truncate mt-3 md:mt-5 mb-1">${iPhone.name}</h1>
                <div class="flex items-center space-x-1 pb-1">
                <img class="md:w-20 w-14" src="./assets/ratingImages/rating-${iPhone.rating * 10}.png" alt="" srcset="">
                  <span class="text-gray-700 mt-[2px] text-sm font-medium">
                    ${iPhone.rating}
                  </span>
                </div>
                <h5 class="pb-2 font-bold">$ ${centsToDollars(dollarsToCents(iPhone.price)).toFixed(2)}</h5>
                <div class="pb-2">
                <button
                class="bg-primary-blue w-full mt-0 text-white rounded-md py-1 text-sm font-bold duration-300 hover:bg-[rgb(50,97,121)] js-add-to-card"
                data-product-id="${iPhone.upc}"
                >Add to Cart</button>
                
                <button
                class="bg-transparent mt-2 capitalize text-center w-full text-black border-[0.5px] border-black rounded-sm py-[1px] text-sm font-extralight duration-300 hover:bg-[rgb(0,0,0)] hover:text-white js-view-now"
                data-product-id="${iPhone.upc}"
                >More Details</button>

                </div>
              </div>
            </div>    
    `;
});

jsProducsItem.innerHTML = iPhoneCategoryHtml;

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// start

function getRandomNumbers(arrayLength, count) {
  const randomNumbers = new Set();
  while (randomNumbers.size < count) {
    const randomNumber = Math.floor(Math.random() * arrayLength);
    randomNumbers.add(randomNumber);
  }

  return Array.from(randomNumbers);
}

// Function to get random products
function getRandomProducts(products, count) {
  const productsCopy = [...products];
  shuffleArray(productsCopy);
  return productsCopy.slice(0, count);
}

// Generate 20 random products
const randomProducts = getRandomProducts(products, 20);

let todaysDealsHtml = "";
randomProducts.forEach((randomProduct) => {
  todaysDealsHtml += `
   
            <div class="rounded-xl border-[1px] border-[rgb(220, 229, 233)] hover:scale-105 duration-200">
              <img class="rounded-[10px_10px_0px_0px] min-h-[114.125px] md:max-h-[255px] md:h-[255px] max-xl:w-full aspect-square object-contain overflow-hidden" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" src="${
                randomProduct.image
              }" alt="">
              <div class="px-2">
                <h1 class="font-bold md:text-base text-xs truncate mt-3 md:mt-5 mb-1">${randomProduct.name}</h1>
                <div class="flex items-center space-x-1 pb-1">
                <img class="md:w-20 w-14" src="./assets/ratingImages/rating-${randomProduct.rating * 10}.png" alt="" srcset="">
                  <span class="text-gray-700 mt-[2px] text-sm font-medium">
                    ${randomProduct.rating}
                  </span>
                </div>
                <h5 class="pb-2 font-bold">$ ${centsToDollars(dollarsToCents(randomProduct.price)).toFixed(2)}</h5>
                <div class="pb-2">
                  <button
                    class="bg-primary-blue w-full text-white rounded-md py-1 text-sm font-bold duration-300 hover:bg-[rgb(50,97,121)] js-add-to-card"
                    data-product-id="${randomProduct.upc}"
                    >Addto Cart</button>

                    <button
                class="bg-transparent mt-2 capitalize text-center w-full text-black border-[0.5px] border-black rounded-sm py-[1px] text-sm font-extralight duration-300 hover:bg-[rgb(0,0,0)] hover:text-white js-view-now"
                data-product-id="${randomProduct.upc}"
                >More Details</button>
                </div>
              </div>
            </div>
          
    `;
});

jstodaysDeal.innerHTML = todaysDealsHtml;

let ComputersAndTablets = products.filter((product) => {
  return product.category.filter((el) => el.name === "Computers & Tablets").length > 0;
});

let ComputersAndTabletsHtml = "";
ComputersAndTablets.forEach((ComputersAndTablets) => {
  ComputersAndTabletsHtml += `
   
            <div class="rounded-xl border-[1px] border-[rgb(220, 229, 233)] hover:scale-105 duration-200">
              <img class="rounded-[10px_10px_0px_0px] min-h-[114.125px] md:max-h-[255px] md:h-[255px] max-xl:w-full aspect-square object-contain overflow-hidden" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" src="${
                ComputersAndTablets.image
              }" alt="">
              <div class="px-2">
                <h1 class="font-bold md:text-base text-xs truncate mt-3 md:mt-5 mb-1">${ComputersAndTablets.name}</h1>
                <div class="flex items-center space-x-1 pb-1">
                <img class="md:w-20 w-14" src="./assets/ratingImages/rating-${ComputersAndTablets.rating * 10}.png" alt="" srcset="">
                  <span class="text-gray-700 mt-[2px] text-sm font-medium">
                    ${ComputersAndTablets.rating}
                  </span>
                </div>
                <h5 class="pb-2 font-bold">$ ${centsToDollars(dollarsToCents(ComputersAndTablets.price)).toFixed(2)}</h5>
                <div class="pb-2">
                  <button
                    class="bg-primary-blue w-full text-white rounded-md py-1 text-sm font-bold duration-300 hover:bg-[rgb(50,97,121)] js-add-to-card"
                    data-product-id="${ComputersAndTablets.upc}"
                    >Addto Cart</button>

                    <button
                class="bg-transparent mt-2 capitalize text-center w-full text-black border-[0.5px] border-black rounded-sm py-[1px] text-sm font-extralight duration-300 hover:bg-[rgb(0,0,0)] hover:text-white js-view-now"
                data-product-id="${ComputersAndTablets.upc}"
                >More Details</button>
                </div>
              </div>
            </div>
          
    `;
});

jsproductComputersTablets.innerHTML = ComputersAndTabletsHtml;

let personalCare = products.filter((product) => {
  return product.category.some((el) => el.name === "Personal Care & Beauty" || el.name === "Small Kitchen Appliances");
});

let personalCareHtml = "";
personalCare.forEach((personalCare) => {
  personalCareHtml += `
   
            <div class="rounded-xl border-[1px] border-[rgb(220, 229, 233)] hover:scale-105 duration-200">
              <img class="rounded-[10px_10px_0px_0px] min-h-[114.125px] md:max-h-[255px] md:h-[255px] max-xl:w-full aspect-square object-contain overflow-hidden" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" src="${
                personalCare.image
              }" alt="">
              <div class="px-2">
                <h1 class="font-bold md:text-base text-xs truncate mt-3 md:mt-5 mb-1">${personalCare.name}</h1>
                <div class="flex items-center space-x-1 pb-1">
                <img class="md:w-20 w-14" src="./assets/ratingImages/rating-${personalCare.rating * 10}.png" alt="" srcset="">
                  <span class="text-gray-700 mt-[2px] text-sm font-medium">
                    ${personalCare.rating}
                  </span>
                </div>
                <h5 class="pb-2 font-bold">$ ${centsToDollars(dollarsToCents(personalCare.price)).toFixed(2)}</h5>
                <div class="pb-2">
                  <button
                    class="bg-primary-blue w-full text-white rounded-md py-1 text-sm font-bold duration-300 hover:bg-[rgb(50,97,121)] js-add-to-card"
                    data-product-id="${personalCare.upc}"
                    >Addto Cart</button>

                    <button
                class="bg-transparent mt-2 capitalize text-center w-full text-black border-[0.5px] border-black rounded-sm py-[1px] text-sm font-extralight duration-300 hover:bg-[rgb(0,0,0)] hover:text-white js-view-now"
                data-product-id="${personalCare.upc}"
                >More Details</button>
                </div>
              </div>
            </div>
          
    `;
});

jsproductPersonalCare.innerHTML = personalCareHtml;

let refrigerators = products.filter((product) => {
  return product.category.filter((el) => el.name === "All Refrigerators").length > 0;
});

let refrigeratorsHtml = "";
refrigerators.forEach((refrigerators) => {
  refrigeratorsHtml += `
   
            <div class="rounded-xl border-[1px] border-[rgb(220, 229, 233)] hover:scale-105 duration-200">
              <img class="rounded-[10px_10px_0px_0px] min-h-[114.125px] md:max-h-[255px] md:h-[255px] max-xl:w-full aspect-square object-contain overflow-hidden" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" src="${
                refrigerators.image
              }" alt="">
              <div class="px-2">
                <h1 class="font-bold md:text-base text-xs truncate mt-3 md:mt-5 mb-1">${refrigerators.name}</h1>
                <div class="flex items-center space-x-1 pb-1">
                <img class="md:w-20 w-14" src="./assets/ratingImages/rating-${refrigerators.rating * 10}.png" alt="" srcset="">
                  <span class="text-gray-700 mt-[2px] text-sm font-medium">
                    ${refrigerators.rating}
                  </span>
                </div>
                <h5 class="pb-2 font-bold">$ ${centsToDollars(dollarsToCents(refrigerators.price)).toFixed(2)}</h5>
                <div class="pb-2">
                  <button
                    class="bg-primary-blue w-full text-white rounded-md py-1 text-sm font-bold duration-300 hover:bg-[rgb(50,97,121)] js-add-to-card"
                    data-product-id="${refrigerators.upc}"
                    >Addto Cart</button>

                    <button
                class="bg-transparent mt-2 capitalize text-center w-full text-black border-[0.5px] border-black rounded-sm py-[1px] text-sm font-extralight duration-300 hover:bg-[rgb(0,0,0)] hover:text-white js-view-now"
                data-product-id="${refrigerators.upc}"
                >More Details</button>
                </div>
              </div>
            </div>
          
    `;
});

jsproductRefrigerators.innerHTML = refrigeratorsHtml;

let GamingProductList = products.filter((product) => {
  return product.type === "Game";
});

let GamingProductListHtml = "";
GamingProductList.forEach((Gaming) => {
  GamingProductListHtml += `
   
            <div class="rounded-xl border-[1px] border-[rgb(220, 229, 233)] hover:scale-105 duration-200">
              <img class="rounded-[10px_10px_0px_0px] min-h-[114.125px] md:max-h-[255px] md:h-[255px] max-xl:w-full aspect-square object-contain overflow-hidden" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" src="${
                Gaming.image
              }" alt="">
              <div class="px-2">
                <h1 class="font-bold md:text-base text-xs truncate mt-3 md:mt-5 mb-1">${Gaming.name}</h1>
                <div class="flex items-center space-x-1 pb-1">
                <img class="md:w-20 w-14" src="./assets/ratingImages/rating-${Gaming.rating * 10}.png" alt="" srcset="">
                  <span class="text-gray-700 mt-[2px] text-sm font-medium">
                    ${Gaming.rating}
                  </span>
                </div>
                <h5 class="pb-2 font-bold">$ ${centsToDollars(dollarsToCents(Gaming.price)).toFixed(2)}</h5>
                <div class="pb-2">
                <button
                class="bg-primary-blue w-full mt-0 text-white rounded-md py-1 text-sm font-bold duration-300 hover:bg-[rgb(50,97,121)] js-add-to-card"
                data-product-id="${Gaming.upc}"
                >Add to Cart</button>
                
                <button
                class="bg-transparent mt-2 capitalize text-center w-full text-black border-[0.5px] border-black rounded-sm py-[1px] text-sm font-extralight duration-300 hover:bg-[rgb(0,0,0)] hover:text-white js-view-now"
                data-product-id="${Gaming.upc}"
                >More Details</button>

                </div>
              </div>
            </div>    
    `;
});

jsproductGaming.innerHTML = GamingProductListHtml;

// end
function updateCartQuantity() {
  let cartQuantity = 0;
  cartItems.forEach((item) => {
    cartQuantity += item.quantity;
  });

  jsCartCount.textContent = cartQuantity;
}

document.querySelectorAll(".js-add-to-card").forEach((button) => {
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    addToCart(productId);
    updateCartQuantity();
  });
});

document.querySelectorAll(".js-view-now").forEach((viewNowbtn) => {
  viewNowbtn.addEventListener("click", () => {
    const productId = viewNowbtn.dataset.productId;
    viewProduct(productId);
  });
});

function viewProduct(productId) {
  products.forEach((clickedProduct) => {
    if (productId === clickedProduct.upc) {
      jsClickedProductViewer.classList.remove("hidden");
      jsClickedProductViewer.classList.add("block");
      let smimilarImages = products.filter((product) => {
        return product.category.some((el) => el.name === `${clickedProduct.category[0].name}` || el.name === `${clickedProduct.category[1].name}`);
      });
      const arrayLength = smimilarImages.length;
      const count = 5;

      jsClickedProductViewer.innerHTML = `
      <div class="fixed inset-0 bg-gray-600 bg-opacity-70 flex items-center justify-center z-[1000]">
          <div class="bg-white p-3 rounded-md shadow-lg md:w-[90%] h-[90%] md:h-auto w-[95%]">
            <div class="flex items-center mb-2 justify-between">
              <button class="text-lg font-bold border-b-2 border-primary-blue py-1">Overview</button>
              <button class="font-extrabold jscloseClickedproduct">X</button>
            </div>
            <div class="md:w-[10%] w-[20%] px-1 float-left">
                <div class="overflow-y-scroll py-2 space-y-2 md:overflow-y-hidden">
                  <img class="w-[80px] object-contain aspect-square" src="${
                    smimilarImages[getRandomNumbers(arrayLength, count)[0]].image
                  }" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" alt="">
                  <img class="w-[80px] object-contain aspect-square" src="${
                    smimilarImages[getRandomNumbers(arrayLength, count)[1]].image
                  }" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" alt="">
                  <img class="w-[80px] object-contain aspect-square" src="${
                    smimilarImages[getRandomNumbers(arrayLength, count)[2]].image
                  }" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" alt="">
                  <img class="w-[80px] object-contain aspect-square" src="${
                    smimilarImages[getRandomNumbers(arrayLength, count)[3]].image
                  }" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" alt="">
                  <img class="w-[80px] object-contain aspect-square" src="${
                    smimilarImages[getRandomNumbers(arrayLength, count)[4]].image
                  }" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" alt="">
                </div>
            </div>
            
            <div class="md:w-[90%] w-[80%] flex shadow-md md:shadow-none flex-row max-sm:flex-col mx-auto float-right h-[90%] overflow-y-scroll md:overflow-y-hidden">
              <div class="md:w-[45%] w-full border-2 shadow-md">
                <img class="w-full h-full object-contain aspect-square" src="${clickedProduct.image}" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" alt="">
              </div>
              <div class="md:w-[35%] w-full mx-auto">
                <div class="bg-white p-5 border-[1px] border-[#7E9AA6]/20">
                  <div>
                  <h1 class="font-bold">${clickedProduct.name}</h1>
                  <div class="flex items-center space-x-1 py-1">
                  <img class="md:w-20 w-14" src="./assets/ratingImages/rating-${clickedProduct.rating * 10}.png" alt="" srcset="">
                    <span class="text-gray-700 text-sm font-medium">
                      ${clickedProduct.rating} Item ratings
                    </span>
                  </div>
                  <h5 class="pb-2 text-2xl border-b-[1px] font-bold">₹ ${clickedProduct.price}</h5>
                  </div>
                  <div>
                    <div class="bg-[#2EAA77] relative py-2 mt-2 text-center">
                      <h6 class="md:text-sm px-1 text-xs text-white">Get 15% off your first purchase with code:</h6>
                      <div class="mt-2">
                        <h1 class="text-white font-medium text-[15px] uppercase underline p-[3px] border-[1px] border-dashed inline">first15</h1>
                      </div>
                      <div class="w-3 h-3 absolute left-1/2 -bottom-[0.6rem] -translate-x-1/2 bg-[#2EAA77] rotate-45"></div>
                    </div>
                    <div class="bg-[#F0F5F7] text-center py-2">
                      <h1 class="text-[#7E9AA6] text-2xl font-bold cursor-pointer">Buy now</h1>
                    </div>
                  </div>
                  <div class="mt-1">
                  <h1 class="font-medium">Description:</h1>
                  <h1 class="font-thin text-xs">${clickedProduct.description}</h1>
                  </div>
                  <div class="mt-1">
                  <h1 class="font-medium">Manufacturer:</h1>
                  <h1 class="font-thin text-xs">${clickedProduct.manufacturer}</h1>
                  </div>
                  <div class="mt-1">
                  <h1 class="font-medium">Category:</h1>
                  <div>
                  <h1 class="font-extralight text-sm">- ${clickedProduct.category[0]?.name ?? "Unknown"}</h1>
                  <h1 class="font-extralight text-sm">- ${clickedProduct.category[1]?.name ?? "Unknown"}</h1>
                  <h1 class="font-extralight text-sm">- ${clickedProduct.category[2]?.name ?? "Unknown"}</h1>
                  <h1 class="font-extralight text-sm">- ${clickedProduct.category[3]?.name ?? "Unknown"}</h1>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  });

  // Add event listener to the close button
  document.querySelector(".jscloseClickedproduct").addEventListener("click", () => {
    jsClickedProductViewer.classList.add("hidden");
    jsClickedProductViewer.classList.remove("block");
  });
}
