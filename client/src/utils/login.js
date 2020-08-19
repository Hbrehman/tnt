const BtnLoginUser = document.getElementById("BtnLoginUser");
const userPasswordLogin = document.getElementById("userPasswordLogin");
const userEmailLogin = document.getElementById("userEmailLogin");

import $ from "jquery";
import axios from "axios";
import { url } from "./config";
import { showAlert, hideAlert } from "./showAlert";
import { updateUserOnUI } from "./../utils/updateUserOnUI";

// Handle user login
BtnLoginUser.addEventListener("click", () => {
  const userData = getLoginInputData();
  if (validateLoginInput()) {
    loginUser(userData);
  }
});

// Get users input for registration
function getLoginInputData() {
  const email = userEmailLogin.value;
  const password = userPasswordLogin.value;
  return { email, password };
}

// Validation of login input

function validateLoginInput() {
  if (userEmailLogin.value.length < 1) {
    showAlert("error", "Please provide your Email");
  } else if (userPasswordLogin.value.length < 1) {
    showAlert("error", "Please provide your Password");
  } else {
    return true;
  }
}

// Loggin in users
async function loginUser(userData) {
  try {
    const response = await axios.post(`${url}api/v1/users/login`, userData);
    if (response.status === 200) {
      const user = JSON.stringify(response.data.data.user);
      localStorage.setItem("loggedInUser", user);
      $("#loginModal").modal("hide");
      $(".modal-backdrop").remove();
      window.location.reload();
      showAlert("success", "You are successfully logged In.");
      if (user) updateUserOnUI();
    }
  } catch (ex) {
    console.log(ex.response);
    console.log(ex);
    showAlert("error", ex.response.data.message);
  }
}

// redirect user when they click sing up link on login modal
signUpLink.addEventListener("click", () => {
  $("#loginModal").modal("hide");
  window.setTimeout(() => {
    $("#registerModal").modal("show");
  }, 300);
});
