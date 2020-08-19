import axios from "axios";
import { showAlert } from "../utils/showAlert";

import { url } from "./config";

const userEmailLogin = document.getElementById("userEmailLogin");
const LinklostPass = document.getElementById("lostPass");
// Password reset functionality
LinklostPass.addEventListener("click", async () => {
  const email = userEmailLogin.value;
  if (!email) {
    return showAlert("error", "Please Provide your Email Address");
  }

  try {
    const response = await axios.post(`${url}api/v1/users/forgotPassword`, {
      email,
    });

    showAlert("success", response.data.message);
  } catch (ex) {
    conosle.log(ex);
    console.log(ex.response.data.message);
    showAlert("error", ex.response.data.message);
  }
});
