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

const username = document.getElementById("name");
const emailEl = document.getElementById("email");
const saveSettingsBtn = document.getElementById("save-settings");
const updatePasswordBtn = document.getElementById("updatePassword");
const currentPass = document.getElementById("currentPassword");
const newPass = document.getElementById("newPassword");
const confirmPass = document.getElementById("confirmPassword");

// Get values from localstorageS and update them on user interface
let user = localStorage.getItem("loggedInUser");
user = JSON.parse(user);
username.value = user.name;
emailEl.value = user.email;
const userId = user._id;

// console.log(user);

saveSettingsBtn.addEventListener("click", async () => {
  const form = new FormData();
  form.append("name", username.value);
  form.append("email", emailEl.value);
  form.append("photo", document.querySelector("#photo").files[0]);
  console.log(username.value, emailEl.value);
  try {
    // const response = await axios.patch(`${url}api/v1/users/updateMe`, form);
    const response = await axios.put(
      `${url}api/v1/users/updateUser/${userId}`,
      form
    );

    console.log(response.data);
    if (response.data.status === "success") {
      localStorage.setItem("loggedInUser", JSON.stringify(response.data.data));
      updateUserOnUI();
      showAlert("success", "Values have been updated successfully");
    }
  } catch (ex) {
    console.log(ex);
    console.log(ex.response);
    showAlert("error", ex.response.message);
  }
});

updatePassword.addEventListener("click", async () => {
  const currentPassword = currentPass.value;
  const newPassword = newPass.value;
  const confirmPassword = confirmPass.value;
  if (validatePassword(currentPassword, newPassword, confirmPassword)) {
    console.log("seems ok");
    try {
      const response = await axios.post(`${url}api/v1/users/updatePassword`, {
        passwordCurrent: currentPassword,
        password: newPassword,
        passwordConfirm: confirmPassword,
      });
      if (response.data.status === "success") {
        showAlert("success", "Password updated successfully");
        currentPass.value = "";
        newPass.value = "";
        confirmPass.value = "";
      }
    } catch (ex) {
      console.log(ex);
      console.log(ex.data);
      showAlert("error", ex.data.message);
    }
  }
});

function validatePassword(currentPassword, newPassword, confirmPassword) {
  if (currentPassword.length < 8) {
    showAlert("error", "Your current password is not correct");
  } else if (currentPassword === newPassword) {
    showAlert("error", "New Password cannot be the old Password.");
  } else if (newPassword.length < 8) {
    showAlert("error", "New Password must be at least 8 characters long.");
  } else if (confirmPassword.length < 8) {
    showAlert("error", "Confirm Password must be at least 8 characters long.");
  } else if (newPassword !== confirmPassword) {
    showAlert("error", "New Password and confirm password must be same");
  } else {
    return true;
  }
}
