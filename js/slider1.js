let slidersOutter = document.querySelector('.sliders-outter');
let perView = 3;

const slidersResize = () => {
    perView = parseInt(getComputedStyle(slidersOutter).getPropertyValue("--per-view"));
    slidersOutter.style.gridAutoColumns = `calc((${slidersOutter.offsetWidth}px - (3px * ${perView - 1})) / ${perView})`;
    slidersOutter.style.transition = "all 0s";
    swiper = new Swiper(".mySwiper", {
        slidesPerView: perView
    });
}

const initPage = () => {
    window.onresize = slidersResize;
    slidersResize();
}

window.onload = initPage;