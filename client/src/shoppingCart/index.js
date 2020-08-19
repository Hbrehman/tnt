import axios from "axios";
axios.defaults.withCredentials = true;

import "bootstrap";
import $ from "jquery";
import "../scss/main.scss";
import { showAlert } from "../utils/showAlert";
import { Cart } from "../utils/cartAlgo";
import "../utils/register";
import "../utils/login";
import "../utils/logout";
import { placeOrder } from "../utils/stripe";
import "../utils/passwordForgot";
import { updateUserOnUI } from "../utils/updateUserOnUI";
updateUserOnUI();

import { url, staticAssetsUrl } from "./../utils/config";

const cartQty = document.getElementById("cart-qty");
const cartTotalPrice = document.getElementById("price");
const cartMarkup = document.querySelector(".cart");
const tableParent = document.getElementById("table-parent");
const tableBody = document.getElementById("table-body");
const tableFooter = document.getElementById("table-foot");

function updateCartOnUI(cart) {
  cartQty.textContent = cart.totalQty;
  cartTotalPrice.textContent = cart.totalPrice;
}

if (tableBody) {
  tableBody.addEventListener("click", function (e) {
    if (e.target.id === "reduceByOne") {
      const cart = new Cart(JSON.parse(localStorage.getItem("cart")));
      const prodId = e.target.attributes.getNamedItem("data-id").value;
      cart.reduceByOne(prodId);
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartList(cart);
    }
    if (e.target.id === "removeItem") {
      const cart = new Cart(JSON.parse(localStorage.getItem("cart")));
      const prodId = e.target.attributes.getNamedItem("data-id").value;

      cart.removeItem(prodId);
      localStorage.setItem("cart", JSON.stringify(cart));
      // const td = e.target.p/veChild(td);
      updateCartList(cart);
    }
  });
}

window.addEventListener("load", () => {
  const cart = new Cart(JSON.parse(localStorage.getItem("cart")) || {});
  updateCartList(cart);
});

// algo to update shopping cart list
function updateCartList(cart) {
  let user = updateUserOnUI();
  updateCartOnUI(cart);
  const itemsArry = cart.genereteArray();
  // console.log(itemsArry);
  if (itemsArry.length === 0) {
    tableParent.innerHTML = "";
    const markup = '<h3 class="m-5">Your Cart is Empty</h3>';
    tableParent.insertAdjacentHTML("beforeend", markup);
  } else {
    tableBody.innerHTML = "";
    //   render all cart elements on UI
    itemsArry.forEach((el) => {
      const markup = `<tr>
    <th scope="row " class=" d-none d-md-block">
      <img src="${staticAssetsUrl}/img/products/${el.item.imageCover}" width="64" height="64" alt="" />
    </th>
    <td>${el.item.name}</td>
    <td  class="d-none d-md-block">${el.item.type}</td>
    <td>${el.qty}</td>
    <td>${el.price}</td>
    <td><button class="standard-btn mr-4 btn" id="reduceByOne" data-id="${el.item._id}">Reduce By 1</button><button class="standard-btn btn" id="removeItem" data-id="${el.item._id}">Remove</button></td>
    
  </tr>
  `;
      tableBody.insertAdjacentHTML("beforeend", markup);
    });
    tableFooter.innerHTML = "";
    const markup = `<tr>
    <th colspan="3" style="text-align: end; vertical-align: middle;">Total Price: &nbsp; &nbsp;&nbsp;  Rs.  ${
      cart.totalPrice
    }</th>
    <th  style="text-align: center;"> 
    
    
    ${
      user
        ? '<button id="checkoutBtn" class="btn standard-btn">Checkout</button>'
        : '<button id="BtnTriggerLogin" class="btn standard-btn">Login To Checkout</button>'
    }
    
    
    </th>
  </tr>`;

    tableFooter.insertAdjacentHTML("beforeend", markup);
  }
}

if (tableFooter) {
  tableFooter.addEventListener("click", async (e) => {
    if (e.target.id === "checkoutBtn") {
      const cart = new Cart(JSON.parse(localStorage.getItem("cart")));
      placeOrder(cart.genereteArray(), cart);
    }

    if (e.target.id === "BtnTriggerLogin") {
      $("#loginModal").modal("show");
    }
  });
}

// Close user model when user clicks on cross btn
document.querySelector(".close-registerModal").addEventListener("click", () => {
  $("#registerModal").modal("hide");
  $(".modal-backdrop").remove();
});
