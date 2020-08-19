// Algorithm to handle Alerts
export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) {
    el.classList.remove("fadeInDown");
    el.classList.add("fadeOutUp");
    window.setTimeout(() => {
      el.parentElement.removeChild(el);
    }, 5);
  }
};
export const showAlert = (type, message) => {
  hideAlert();
  const markup = `<div class="alert alert--${type} animated">${message}</div>`;
  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  const el = document.querySelector(".alert");
  el.classList.add("fadeInDown");
  window.setTimeout(hideAlert, 5000);
};
