export function mobilBar() {
    let mobilBtn = document.getElementById("mobilBtn");
    let mobilNav = document.getElementById("mobilNav");
    let expandClass = document.querySelectorAll(".expand");
    let submenu = document.querySelectorAll(".submenu");
    let mobilbar = document.querySelector(".mobil-bar");
    let sub;
    let expandElem;
    let exDown = false;
    let subDown = false;
    const subMenuExpand = (e) => {
        sub = e.parentElement.children[1];
        submenu.forEach((sbb) => {
            if (sbb.classList.contains("sub-active")) {
                sbb.classList.remove("sub-active");
                sbb.parentElement.children[2].innerHTML = '+';
            }
        });
        if (!subDown) {
            sub.classList += " sub-active";
            e.innerHTML = '-';
            subDown = true;
            expandElem = e;
        }
        else {
            if (sub.classList.contains("sub-active"))
                sub.classList.remove("sub-active");
            else if( expandElem != e){
                sub.classList += " sub-active";
                e.innerHTML = '-';
            }
            e.innerHTML = '+';
            subDown = false;
        }

    }

    expandClass.forEach((event) => {
        event.addEventListener('click', () => { subMenuExpand(event) });
    });


    var expand = () => {
        if (exDown) {
            mobilNav.style.display = "none";
            exDown = false;
            mobilBtn.innerHTML = "<span></span><span></span><span></span>";
            mobilbar.style.padding="4px 0 0";
        }
        else {
            mobilNav.style.display = "block";
            exDown = true;
            mobilBtn.innerHTML = "X";
            mobilbar.style.padding="4px 0 15px";
        }
    }

    mobilBtn.addEventListener("click", expand);

}