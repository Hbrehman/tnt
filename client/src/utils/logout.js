import axios from "axios";
import { showAlert, hideAlert } from "./showAlert";
import { updateUserOnUI } from "./updateUserOnUI";

import { url } from "./config";

const logoutBtn = document.getElementById("logout-btn");
logoutBtn.addEventListener("click", async () => {
  try {
    const response = await axios.get(`${url}api/v1/users/logout`);
    if (response.status === 200) {
      localStorage.clear();
      updateUserOnUI();
      window.location.reload();
    }
  } catch (ex) {
    console.log(ex);
    showAlert("error", ex.response.message);
  }
});
