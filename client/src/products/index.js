import { url } from "./../utils/config";
import { staticAssetsUrl } from "./../utils/config";

import axios from "axios";
// axios.defaults.withCredentials = true;

// import "js-cookie";
import "bootstrap";
import $ from "jquery";
import "../scss/main.scss";

import { showAlert } from "../utils/showAlert";
import "../utils/register";
import "../utils/login";
import "../utils/logout";
import "../utils/passwordForgot";
import { resetPassword } from "../utils/passwordReset";
// import "../utils/showContactModal";
import "../utils/addToCart";

import { updateUserOnUI } from "../utils/updateUserOnUI";
updateUserOnUI();
import { checkLoggedInUser } from "../utils/checkLoggedInUser";

const tiles = document.getElementById("tiles");
const taps = document.getElementById("taps");
const sanitaryWare = document.getElementById("sanitaryWare");

window.addEventListener("load", async () => {
  try {
    const response = await axios.get(`${url}api/v1/products`);

    let result = response.data.data.doc.reverse();
    console.log(result);

    let tilePro = [];
    let tapsPro = [];
    let sanitaryWarePro = [];

    for (let i = 0; i < result.length; i++) {
      if (result[i].category === "tile") tilePro.push(result[i]);
      else if (result[i].category === "taps") tapsPro.push(result[i]);
      else if (result[i].category === "sanitaryWare")
        sanitaryWarePro.push(result[i]);
    }

    tilePro = createChunksOfArr(tilePro);
    tapsPro = createChunksOfArr(tapsPro);
    sanitaryWarePro = createChunksOfArr(sanitaryWarePro);

    tilePro.forEach((el) => {
      displayProducts(tiles, el);
    });

    tapsPro.forEach((el) => {
      displayProducts(taps, el);
    });

    sanitaryWarePro.forEach((el) => {
      displayProducts(sanitaryWare, el);
    });
  } catch (ex) {
    console.log(ex);
    console.log(ex.response.data);
  }
});

export function displayProducts(element, data) {
  element.innerHtml = "";
  var markup = '<div class="row my-2">';
  data.forEach((el) => {
    markup += `<div class="col-sm-6 d-flex justify-content-center col-md-4 my-3">
    <div class="card" style="width: 16rem;">
      <img src="${staticAssetsUrl}/img/products/${
      el.imageCover
    }" class="card-img-top" alt="..." />
      <div class="card-body">
        <h6 class="productType mb-1">${el.type}</h6>
        <h5 class="card-title mb-1 mt-3">${el.name}</h5>
      </div>
      
         <div class="d-flex align-items-center">
         <span id="pro-price"> ${el.price} RS</span>
         <button id="add-to-cart"  data-el='${JSON.stringify(
           el
         )}' class=" standard-btn btn ml-auto">Add to cart</button>
       </div>

      
    </div>
    </div>`;
  });

  //   <div id="rating-stars" class="my-2">
  //   <span class="lnr lnr-star"></span>
  //   <span class="lnr lnr-star"></span>
  //   <span class="lnr lnr-star"></span>
  //   <span class="lnr lnr-star"></span>
  //   <span class="lnr lnr-star text-dark"></span>
  // </div>

  //   <div class="d-flex align-items-center">
  //   <span id="pro-price">RS ${el.price}</span>
  // </div>

  // <button id="add-to-cart"  data-el='${JSON.stringify(
  //   el
  // )}' class=" standard-btn btn ml-auto mb-1">Buy this item</button>

  markup += "</div>";
  element.insertAdjacentHTML("beforeend", markup);
}
// docs.length
export function createChunksOfArr(docs) {
  let productChunk = [];
  let chunkSize = 3;
  for (var i = 0; i < 6; i += chunkSize) {
    productChunk.push(docs.slice(i, i + chunkSize));
  }
  return productChunk;
}

// Close user model when user clicks on cross btn
document.querySelector(".close-registerModal").addEventListener("click", () => {
  $("#registerModal").modal("hide");
  $(".modal-backdrop").remove();
});

// Password Reset algo
window.addEventListener("load", () => {
  const token = getParameterByName("passwordResetToken");
  if (token && token.length >= 64) {
    resetPassword(token);
  }
  const userId = getParameterByName("user");
  if (userId) {
    checkLoggedInUser(userId);
  }
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}
