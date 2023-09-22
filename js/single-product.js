const decrease = document.getElementById("decrease");
const increase = document.getElementById("increase");
const orderCount = document.getElementById("orderCount");

console.log(decrease);
console.log(increase);
console.log(orderCount);

//Increase or decrease order count
decrease.addEventListener("click", () => {
  if (parseInt(orderCount.textContent) > 1) {
    orderCount.textContent = parseInt(orderCount.textContent) - 1;
    console.log(orderCount.textContent);
  }
});

increase.addEventListener("click", () => {
  orderCount.textContent = parseInt(orderCount.textContent) + 1;
});

const mainImage = document.getElementById("main-img");
const mainImageDefault = document.getElementById("main-img-default");
const smallImgages = document.querySelectorAll("#small-img");

// Show selected image
Array.from(smallImgages).forEach((item) => {
  item.addEventListener("click", (e) => {
    mainImageDefault.src = e.target.src;
    mainImage.style.backgroundImage = "url(" + e.target.src + ")";

    smallImgages.forEach((img) => {
      img.style.opacity = 1;
    });

    e.target.style.opacity = 0.6;
  });
});
