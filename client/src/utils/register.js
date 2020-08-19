const BtnRegisterUser = document.getElementById("BtnRegisterUser");
const userName = document.getElementById("RegUserName");
const userEmail = document.getElementById("RegUserEmail");
const userPassword = document.getElementById("RegUserPassword");
const userPasswordCnfrm = document.getElementById("RegUserPasswordCnfrm");

import $ from "jquery";
import { url } from "./config";

import axios from "axios";
import { showAlert, hideAlert } from "./showAlert";
// Handle user Registration
BtnRegisterUser.addEventListener("click", () => {
  const userData = getRegInputData();
  if (validateRegInput(userData)) {
    registerUser(userData);
  }
});

async function registerUser(userData) {
  try {
    const response = await axios.post(`${url}api/v1/users/signup`, userData);
    if (response.status === 200) {
      showAlert("success", "Please check your Email");
      $("#registerModal").modal("hide");
      $(".modal-backdrop").remove();
    }
  } catch (ex) {
    console.log(ex);
    console.log(ex.response.data);
    showAlert("error", ex.response.data.message);
  }
}

// Get users input for registration
function getRegInputData() {
  const name = userName.value;
  const email = userEmail.value;
  const password = userPassword.value;
  const passwordConfirm = userPasswordCnfrm.value;
  return { name, email, password, passwordConfirm };
}

function validateRegInput() {
  if (userName.value.length < 1) {
    showAlert("error", "User Name is a required Field.");
  } else if (userEmail.value.length < 1) {
    showAlert("error", "User Email is a required Field.");
  } else if (userPassword.value.length < 1) {
    showAlert("error", "User Password is a required Field.");
  } else if (userPasswordCnfrm.value.length < 1) {
    showAlert("error", "Password confirm is a required Field.");
  } else if (userPasswordCnfrm.value !== userPassword.value) {
    showAlert("error", "Password & Password confirm should be same");
  } else {
    return true;
  }
}
