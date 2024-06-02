document.addEventListener("DOMContentLoaded", function () {
  const carouselInner = document.querySelector("[data-carousel-inner]");
  const items = carouselInner.querySelectorAll("[data-carousel-item]");
  let currentIndex = 0;

  function showItem(index) {
    items.forEach((item, i) => {
      item.classList.toggle("translate-x-full", i !== index);
    });
  }

  function nextItem() {
    currentIndex = (currentIndex + 1) % items.length;
    showItem(currentIndex);
  }

  showItem(currentIndex);
  setInterval(nextItem, 3000);
});

export function dollarsToCents(dollars) {
  return Math.round(dollars * 100);
}

export function centsToDollars(cents) {
  return cents / 100;
}
