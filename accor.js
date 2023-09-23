function accordionFunc() {
  const opener = document.querySelectorAll(".accordion-opener");

  opener.forEach((item) => {
    item.addEventListener("click", (e) => {
      const accord = item.parentElement.querySelector(".checkout-login");

      opener.forEach((x) => {
        x.parentElement
          .querySelector(".checkout-login")
          .classList.remove("accor-opened");
        x.getElementsByTagName("input")[0].checked = false;
      });

      accord.classList.toggle("accor-opened");
      item.getElementsByTagName("input")[0].checked = true;
    });
  });
}
accordionFunc();
