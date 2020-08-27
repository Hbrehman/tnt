import axios from "axios";

import "bootstrap";
import { url } from "./config";
import $ from "jquery";
import "../scss/main.scss";
import { showAlert } from "./showAlert";
import "./register";
import "./login";
import "./logout";
import "./passwordForgot";
import { updateUserOnUI } from "./updateUserOnUI";
updateUserOnUI();

import "../utils/addToCart";

import { checkLoggedInUser } from "../utils/checkLoggedInUser";
import { staticAssetsUrl } from "./config";

console.log("this is products detail page");


const prodImages = document.querySelectorAll('.prod-images');
const coverImage = document.querySelector('#product-coverImg > img' );


prodImages.forEach(cur => {
    cur.addEventListener('click', ()=> {
        const clicked = cur.getAttribute('src');
        const coverSrc = coverImage.getAttribute('src');
        cur.setAttribute('src', coverSrc);
        coverImage.setAttribute('src', clicked);
    });
})

window.addEventListener('load', (e)=> {
    let prodDetail = localStorage.getItem('prod-detail');
    prodDetail = JSON.parse(prodDetail);
    console.log(prodDetail);
    prodImages.forEach((cur, i)=> {
        cur.setAttribute("src", `${staticAssetsUrl}/img/products/${prodDetail.images[i]}`);
    })

coverImage.setAttribute('src', `${staticAssetsUrl}/img/products/${prodDetail.imageCover}`)
    const markup = `<h5 class="display-5" id="prod-title">${prodDetail.name}</h5>
              <span id="prod-price"> Rs ${prodDetail.price} per meter </span>
              <div id="prod-details">
                  <div id="key">
                      <h6>Company :</h6>
                  </div>
                  <div id="value" ><span>${prodDetail.company} </span></div>
              </div>
              <div id="prod-details">
                  <div id="key">
                      <h6>Summary :</h6>
                  </div>
                  <div id="value" ><span>${prodDetail.summary} </span></div>
              </div>
              <div id="prod-details">
                  <div id="key">
                      <h6>Description :</h6>
                  </div>
                  <div id="value" ><span>${prodDetail.description} </span></div>
              </div>

              <button id="add-to-cart" class="btn" data-el='${JSON.stringify(
           prodDetail
         )}' >Add to Cart</button>`;

              document.getElementById('prod-info').insertAdjacentHTML('afterbegin', markup);
})

