import axios from "axios";
axios.defaults.withCredentials = true;

import "bootstrap";
import $ from "jquery";
import "../scss/main.scss";
import { showAlert } from "../utils/showAlert";
import "../utils/register";
import "../utils/login";
import "../utils/logout";
import "../utils/passwordForgot";
import "../utils/showContactModal";

// import "../utils/addToCart";

import { updateUserOnUI } from "../utils/updateUserOnUI";
updateUserOnUI();
import { checkLoggedInUser } from "../utils/checkLoggedInUser";
checkLoggedInUser();

import { url, staticAssetsUrl } from "./../utils/config";

const wallTiles = document.getElementById("wallTiles");
const floorTiles = document.getElementById("floorTiles");
const bathTiles = document.getElementById("bathTiles");
const kitchenTiles = document.getElementById("kitchenTiles");

window.addEventListener("load", async () => {
  try {
    const response = await axios.get(`${url}api/v1/products`);

    let result = response.data.data.doc;
    console.log(result);

    let floorTileArr = [];
    let wallTileArr = [];
    let kitchenTileArr = [];
    let bathTileArr = [];

    for (let i = 0; i < result.length; i++) {
      if (result[i].type === "floor tile") floorTileArr.push(result[i]);
      else if (result[i].type === "wall tile") wallTileArr.push(result[i]);
      else if (result[i].type === "kitchen tile")
        kitchenTileArr.push(result[i]);
      else if (result[i].type === "bath tile") bathTileArr.push(result[i]);
    }

    floorTileArr = createChunksOfArr(floorTileArr);
    wallTileArr = createChunksOfArr(wallTileArr);
    kitchenTileArr = createChunksOfArr(kitchenTileArr);
    bathTileArr = createChunksOfArr(bathTileArr);

    floorTileArr.forEach((el) => {
      displayProducts(wallTiles, el);
    });

    wallTileArr.forEach((el) => {
      displayProducts(floorTiles, el);
    });

    kitchenTileArr.forEach((el) => {
      displayProducts(kitchenTiles, el);
    });
    bathTileArr.forEach((el) => {
      displayProducts(bathTiles, el);
    });
  } catch (ex) {
    console.log(ex);
    console.log(ex.response.data);
    showAlert("error", ex.response.data.message);
  }
});

export function createChunksOfArr(docs) {
  let productChunk = [];
  let chunkSize = 3;
  for (var i = 0; i < docs.length; i += chunkSize) {
    productChunk.push(docs.slice(i, i + chunkSize));
  }
  return productChunk;
}

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
      <button id="add-to-cart"  data-el='${JSON.stringify(
        el
      )}' class=" standard-btn btn ml-auto mb-1">Buy this item</button>
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
  //   <button id="add-to-cart"  data-el='${JSON.stringify(
  //     el
  //   )}' class=" standard-btn btn ml-auto">Add to cart</button>
  // </div>
  markup += "</div>";
  element.insertAdjacentHTML("beforeend", markup);
}

// Close user model when user clicks on cross btn
document.querySelector(".close-registerModal").addEventListener("click", () => {
  $("#registerModal").modal("hide");
  $(".modal-backdrop").remove();
});
