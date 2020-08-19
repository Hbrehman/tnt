import { showAlert } from "../utils/showAlert";
const prodParents = document.querySelectorAll(".prodParent");
const cartQty = document.getElementById("cart-qty");
const cartTotalPrice = document.getElementById("price");
const cart = document.querySelector("#cart-info");
import { Cart } from "./cartAlgo";

if (cart) {
  cart.addEventListener("click", () => {
    window.location = "shoppingCart.html";
  });
}

cartQty.textContent = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart")).totalQty
  : 0;
cartTotalPrice.textContent = JSON.parse(localStorage.getItem("cart"))
  ? JSON.parse(localStorage.getItem("cart")).totalPrice
  : 0;

prodParents.forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.id === "add-to-cart") {
      const product = JSON.parse(
        e.target.attributes.getNamedItem("data-el").value
      );

      const oldCart = JSON.parse(localStorage.getItem("cart"));

      const cart = new Cart(oldCart ? oldCart : {});
      cart.add(product, product._id);
      localStorage.setItem("cart", JSON.stringify(cart));
      cartQty.textContent = cart.totalQty;
      cartTotalPrice.textContent = cart.totalPrice;
      showAlert("success", `${product.name} added to the Cart.`);
    }
  });
});
