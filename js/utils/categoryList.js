import { products } from "../productsMain/products0to500.js";
import { dollarsToCents, centsToDollars } from "../utils/base.js";


let categoryArt = document.querySelector('.categoryArtProduct')



function getRandomNumbers(arrayLength, count) {
  
    const randomNumbers = new Set();
    while (randomNumbers.size < count) {
      const randomNumber = Math.floor(Math.random() * arrayLength);
      randomNumbers.add(randomNumber);
    }
  
    return Array.from(randomNumbers);
  }
function artloadCategory(){
    let art = products.filter((product) => {
        return product.category.some((el) => el.name === "Toys, Games & Drones" || el.name === "Xbox 360" || el.name === "Office & School Supplies");
      });
    
    let iPhoneCategoryHtml = "";
    art.forEach((iPhone) => {
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
                    class="bg-black w-full mt-0 text-white rounded-md py-1 text-sm font-bold duration-300 hover:bg-[rgb(50,97,121)] js-add-to-card"
                    
                    >Sold</button>
                    
                    <button
                    class="bg-transparent mt-2 capitalize text-center w-full text-black border-[0.5px] border-black rounded-sm py-[1px] text-sm font-extralight duration-300 hover:bg-[rgb(0,0,0)] hover:text-white js-view-now"
                    data-product-id="${iPhone.upc}"
                    >More Details</button>
    
                    </div>
                  </div>
                </div>    
        `;
    });
       
    categoryArt.innerHTML = iPhoneCategoryHtml;
}
artloadCategory()


  
document.querySelectorAll('.js-view-now').forEach((viewNowbtn)=>{
    viewNowbtn.addEventListener('click',()=>{
      const productId = viewNowbtn.dataset.productId;
      viewProduct(productId);
      })
  })
  
  function viewProduct(productId){
    products.forEach((clickedProduct)=>{
      if(productId === clickedProduct.upc){
        jsClickedProductViewer.classList.remove('hidden')
        jsClickedProductViewer.classList.add('block')
        let smimilarImages = products.filter((product) => {
          return product.category.some((el) => 
            el.name === `${clickedProduct.category[0].name}` || el.name === `${clickedProduct.category[1].name}`
          );
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
                    <img class="w-[80px] object-contain aspect-square" src="${smimilarImages[getRandomNumbers(arrayLength, count)[0]].image}" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" alt="">
                    <img class="w-[80px] object-contain aspect-square" src="${smimilarImages[getRandomNumbers(arrayLength, count)[1]].image}" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" alt="">
                    <img class="w-[80px] object-contain aspect-square" src="${smimilarImages[getRandomNumbers(arrayLength, count)[2]].image}" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" alt="">
                    <img class="w-[80px] object-contain aspect-square" src="${smimilarImages[getRandomNumbers(arrayLength, count)[3]].image}" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" alt="">
                    <img class="w-[80px] object-contain aspect-square" src="${smimilarImages[getRandomNumbers(arrayLength, count)[4]].image}" onerror="this.onerror=null; this.src='./assets/others/no-image-icon.png';" alt="">
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
                    <h1 class="font-extralight text-sm">- ${clickedProduct.category[0]?.name ?? 'Unknown'}</h1>
                    <h1 class="font-extralight text-sm">- ${clickedProduct.category[1]?.name ?? 'Unknown'}</h1>
                    <h1 class="font-extralight text-sm">- ${clickedProduct.category[2]?.name ?? 'Unknown'}</h1>
                    <h1 class="font-extralight text-sm">- ${clickedProduct.category[3]?.name ?? 'Unknown'}</h1>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `
      }
    })
  
    
    // Add event listener to the close button
    document.querySelector('.jscloseClickedproduct').addEventListener('click', () => {
     jsClickedProductViewer.classList.add('hidden');
     jsClickedProductViewer.classList.remove('block');
    });
  }