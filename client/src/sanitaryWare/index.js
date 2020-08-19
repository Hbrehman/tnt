import axios from "axios";
axios.defaults.withCredentials = true;

import $ from "jquery";
import "bootstrap";
import "../scss/main.scss";
import { showAlert } from "../utils/showAlert";

import "../utils/register";
import "../utils/login";
import "../utils/logout";
import "../utils/passwordForgot";
// import "../utils/addToCart";
import { updateUserOnUI } from "../utils/updateUserOnUI";
updateUserOnUI();
import { checkLoggedInUser } from "../utils/checkLoggedInUser";
checkLoggedInUser();

import { url } from "./../utils/config";
import { staticAssetsUrl } from "./../utils/config";

const indianSeats = document.getElementById("indianSeat");
const commodes = document.getElementById("commode");
const basins = document.getElementById("basin");
const sinks = document.getElementById("sink");

window.addEventListener("load", async () => {
  try {
    const response = await axios.get(`${url}api/v1/products`);

    let result = response.data.data.doc;
    console.log(result);

    let indianSeatArr = [];
    let commodeArr = [];
    let basinArr = [];
    let sinkArr = [];

    for (let i = 0; i < result.length; i++) {
      if (result[i].type === "indian seat") indianSeatArr.push(result[i]);
      else if (result[i].type === "commode") commodeArr.push(result[i]);
      else if (result[i].type === "basin") basinArr.push(result[i]);
      else if (result[i].type === "sink") sinkArr.push(result[i]);
    }
    indianSeatArr = createChunksOfArr(indianSeatArr);
    commodeArr = createChunksOfArr(commodeArr);
    basinArr = createChunksOfArr(basinArr);
    sinkArr = createChunksOfArr(sinkArr);

    indianSeatArr.forEach((el) => {
      displayProducts(indianSeats, el);
    });

    commodeArr.forEach((el) => {
      console.log(el);
      displayProducts(commodes, el);
    });

    basinArr.forEach((el) => {
      console.log(el);
      displayProducts(basins, el);
    });
    sinkArr.forEach((el) => {
      displayProducts(sinks, el);
    });
  } catch (ex) {
    console.log(ex);
    console.log(ex.response.data);
    showAlert(ex.response.data);
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
      <img src="${staticAssetsUrl}/img/products/${el.imageCover}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h6 class="productType mb-1">${el.type}</h6>
        <h5 class="card-title mb-1 mt-3">${el.name}</h5>
        <div id="rating-stars" class="my-2">
            <span class="lnr lnr-star"></span>
            <span class="lnr lnr-star"></span>
            <span class="lnr lnr-star"></span>
            <span class="lnr lnr-star"></span>
            <span class="lnr lnr-star text-dark"></span>
        </div>

        
      </div>
    </div>
    </div>`;
  });

  //   <div class="d-flex align-items-center">
  //   <span id="pro-price"> ${el.price} RS</span>
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
