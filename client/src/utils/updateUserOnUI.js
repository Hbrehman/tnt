import { url } from "./config";
const username = document.querySelector(".username");
const userPic = document.getElementById("userPic");
const userInfo = document.getElementById("userInfo");
import $ from "jquery";

export function updateUserOnUI() {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (user) {
    $("#userProfile img").attr("src", `${url}img/users/${user.photo}`);
    username.textContent = user.name;
    userPic.removeAttribute("hidden");
    userInfo.removeAttribute("hidden");
    welcomeMsg.setAttribute("hidden", true);
    return true;
  } else {
    userPic.setAttribute("hidden", true);
    userInfo.setAttribute("hidden", true);
    welcomeMsg.removeAttribute("hidden");
    return false;
  }
}
