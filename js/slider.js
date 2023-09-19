let slidersOutter;
let sliderItem;
let imageLeng;
let perView;
let totalScroll = 0;
let autoScroll = 0;
let prev;
let next;
let isControl = false;
let isSliders = false;
let interval;
let autoPlay;
let isDown = false;
let walk = 0;
let widthMov;
let startX;
let currentWalk;
let wheelX = 0;
let noDown = false;
let walkI = 0;
let abc = {
    loop: false,
    autoPlay: false,
    interval: 3000
};


const varaibleDec = () => {
    if (document.getElementsByClassName("sliders").length > 0) {
        // totalScroll = perView;
        slidersOutter = document.querySelector('.sliders-outter');
        sliderItem = document.querySelectorAll('.slider-item');
        imageLeng = sliderItem.length;
        perView = getComputedStyle(slidersOutter).getPropertyValue("--per-view");
        slidersOutter.style.gridAutoColumns = `calc((${slidersOutter.offsetWidth}px - (3px * ${perView - 1})) / ${perView})`;
        isSliders = true;
        currentWalk = slidersOutter.offsetLeft;
        widthMov = sliderWidth();
        sliderScroll(widthMov);
    }
    if (document.getElementsByClassName("slider-control").length > 0) {
        prev = document.getElementById('prev');
        next = document.getElementById('next');
        isControl = true;
    }
}


const slidersResize = () => {
    perView = getComputedStyle(slidersOutter).getPropertyValue("--per-view");
    slidersOutter.style.gridAutoColumns = `calc((${slidersOutter.offsetWidth}px - (3px * ${perView - 1})) / ${perView})`;
    clearInterval(autoScroll);
    slidersOutter.style.transition = "all 0s";
    slidersOutter.style.left = `-${totalScroll * sliderWidth()}px`;
    autoScroll = setInterval(autoSlider, interval);
}

const autoSlider = () => {
    if (abc.autoPlay) {
        totalScroll++;
        if (totalScroll >= imageLeng + 1) {
            clearScroll();
            autoScroll = setInterval(autoSlider, interval);
            return;
        }

        sliderScroll(sliderWidth());
    }
}

const sliderWidth = () => {
    const widthSlider = parseFloat(slidersOutter.style.gridAutoColumns.replace("calc(", ' ').replace("px)", ' ')) + 3;
    return widthSlider;
}

const prevSlider = () => {
    clearInterval(autoScroll);
    if (totalScroll < 0) {
        clearInterval(autoScroll);
        totalScroll = parseInt(parseInt(slidersOutter.children.length) / 2);
        slidersOutter.style.transition = "0s";
        slidersOutter.style.left = `-${totalScroll * sliderWidth()}px`;
        setTimeout(prevClick, 10);
        currentWalk = slidersOutter.offsetLeft;
        return;
    }
    sliderScroll(sliderWidth());
    currentWalk = slidersOutter.offsetLeft;
}


const nextSlider = () => {
    clearInterval(autoScroll);
    if (totalScroll >= slidersOutter.children.length - perView + 1) {
        clearScroll();
        setTimeout(nextClick, 10);
        return;
    }
    sliderScroll(sliderWidth());
}

const loop = () => {
    for (let i = 0; i < imageLeng; i++) {
        for (let j = 0; j < 2; j++)
            slidersOutter.insertAdjacentHTML('beforeend', sliderItem[i].outerHTML);
    }
}

const sliderScroll = (widdthSlider) => {
    slidersOutter.style.left = `-${totalScroll * widdthSlider}px`;
    slidersOutter.style.transition = "all 0.3s";
    currentWalk = slidersOutter.offsetLeft;
    wheelX = currentWalk;
    // console.log(currentWalk);
}

const clearScroll = () => {
    clearInterval(autoScroll);
    totalScroll = 0;
    slidersOutter.style.transition = "all 0s";
    slidersOutter.style.left = '0px';
}

const prevClick = () => {
    totalScroll--;
    prevSlider();
    autoScroll = setInterval(autoSlider, interval);
}
const nextClick = () => {
    totalScroll++;
    nextSlider();
    autoScroll = setInterval(autoSlider, interval);
}

function parametrDeclar(obj) {
    Object.entries(obj).forEach(([key, value]) => {
        if (value !== undefined) {
            abc[key] = value;
        }
    });
    interval = abc.interval;
    autoPlay = abc.autoPlay;
}

function sliderMove(walkI) {
    let step = parseInt(Math.round(Math.abs(walkI / widthMov)));
    if (noDown == true && parseInt(widthMov) / 10 < walkI) {
        totalScroll += step;
        nextSlider();
    }
    else if (noDown == true && parseInt(widthMov) / 3 < -walkI) {
        totalScroll -= step;
        prevSlider();
    }
    else {
        sliderScroll(sliderWidth());
    }
    wheelX = currentWalk;
    console.log(wheelX);
    // if (currentWalk < (perView - slidersOutter.children.length) * widthMov && currentWalk!=0) {
    //     currentWalk = 0;
    //     slidersOutter.style.left = `${currentWalk}px`;
    // }
    // console.log((perView - slidersOutter.children.length) * widthMov + " " + currentWalk);
}
const initPage = (obj) => {
    varaibleDec();
    if (isSliders) {
        parametrDeclar(obj);
        loop();
        autoScroll = setInterval(autoSlider, interval);
        window.onresize = () => { slidersResize() };
        sliderAddEvent();
        if (isControl) {
            prev.addEventListener('click', prevClick);
            next.addEventListener('click', nextClick);
        }
    }
    // console.log(slidersOutter.children.length);

}

window.onload = () => {
    varaibleDec();
};




function sliderAddEvent() {
    slidersOutter.addEventListener('mousedown', (e) => {
        isDown = true;
        noDown = false;
        // slidersOutter.style.left = `${currentWalk}px`;
        startX = e.pageX - slidersOutter.offsetLeft;
        walkI = currentWalk;
        if(totalScroll<=0)sliderMove(walkI);
    });
    slidersOutter.addEventListener('mouseleave', () => {
        isDown = false;
        noDown = true;
        walkI=0;
        sliderMove(walkI);
    });
    slidersOutter.addEventListener('mouseup', () => {
        isDown = false;
        noDown = true;
        walkI = walkI - currentWalk;
        sliderMove(walkI);
        console.log("walkI: " + walkI);
    });
    slidersOutter.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        noDown = false;
        e.preventDefault();
        slidersOutter.style.transition = "all 0s";
        const x = e.pageX - slidersOutter.offsetLeft;
        let walk = (x - startX); //scroll-fast
        currentWalk += walk;
        slidersOutter.style.left = `${currentWalk}px`;
    });
}