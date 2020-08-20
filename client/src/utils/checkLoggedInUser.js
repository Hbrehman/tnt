const userProfile = document.getElementById("userProfile");
const userImg = document.querySelector("#userProfile img");
const username = document.querySelector(".username");
import { staticAssetsUrl } from "./config";

import { url } from "./config";

import axios from "axios";
import $ from "jquery";
import { showAlert, hideAlert } from "./showAlert";

export async function checkLoggedInUser(userId) {
  // if (document.cookie && document.cookie.split("%")[2]) {
  //   const userId = document.cookie.split("%")[2].slice(2);
  if (userId) {
    const user = await findUser(userId);
    if (user) {
      updateUserOnUI(user);
      return user;
    }
  }
}
// }

async function findUser(userId) {
  try {
    const response = await axios.get(`${url}api/v1/users/getMe`);
    console.log(response);
    const user = JSON.stringify(response.data.data);
    localStorage.setItem("loggedInUser", user);
    return response.data.data;
  } catch (ex) {
    // console.log(ex);
    // showAlert("error", ex.response);
  }
}

function updateUserOnUI(user) {
  $("#userProfile img").attr(
    "src",
    `${staticAssetsUrl}img/users/${user.photo}`
  );
  username.textContent = user.name;
  document.getElementById("userPic").removeAttribute("hidden");
  document.getElementById("userInfo").removeAttribute("hidden");
  welcomeMsg.setAttribute("hidden", true);
}
