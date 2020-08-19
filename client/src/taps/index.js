import axios from "axios";
axios.defaults.withCredentials = true;

import $ from "jquery";
import "bootstrap";
import "../scss/main.scss";
import { showAlert } from "../utils/showAlert";
import { Cart } from "../utils/cartAlgo";
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

const basinMixers = document.getElementById("basinMixer");
const bathroomSets = document.getElementById("bathroomSet");
const faucets = document.getElementById("faucetSec");
const accessorySets = document.getElementById("accessorySet");
const showers = document.getElementById("shower");

window.addEventListener("load", async () => {
  try {
    const response = await axios.get(`${url}api/v1/products`);

    let result = response.data.data.doc;
    console.log(result);

    let basinMixerArr = [];
    let bathroomSetArr = [];
    let faucetArr = [];
    let accessorySetArr = [];
    let showerArr = [];

    for (let i = 0; i < result.length; i++) {
      if (result[i].type === "basin mixer") basinMixerArr.push(result[i]);
      else if (result[i].type === "bathroom set")
        bathroomSetArr.push(result[i]);
      else if (result[i].type === "faucet") faucetArr.push(result[i]);
      else if (result[i].type === "accessory set")
        accessorySetArr.push(result[i]);
      else if (result[i].type === "shower") showerArr.push(result[i]);
    }
    basinMixerArr = createChunksOfArr(basinMixerArr);
    bathroomSetArr = createChunksOfArr(bathroomSetArr);
    faucetArr = createChunksOfArr(faucetArr);
    accessorySetArr = createChunksOfArr(accessorySetArr);
    showerArr = createChunksOfArr(showerArr);

    basinMixerArr.forEach((el) => {
      displayProducts(basinMixers, el);
    });

    bathroomSetArr.forEach((el) => {
      console.log(el);
      displayProducts(bathroomSets, el);
    });

    faucetArr.forEach((el) => {
      console.log(el);
      displayProducts(faucets, el);
    });
    accessorySetArr.forEach((el) => {
      displayProducts(accessorySets, el);
    });
    showerArr.forEach((el) => {
      displayProducts(showers, el);
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
