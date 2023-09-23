export function scrollUp() {
    let upId = document.getElementById("scrollUp");
    upId.addEventListener('click',scrollClear);

    function scrollClear(){
        window.scroll(0 , 0);
    }

    const scrol = ()=>{
        if(window.scrollY < 300){
            upId.style.visibility = "hidden";
        }
        else{
            upId.style.visibility = "visible";
        }
    }
    window.onscroll = scrol;

}