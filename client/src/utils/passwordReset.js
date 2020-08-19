import { url } from "./../utils/config";
import axios from "axios";
import $ from "jquery";
import { showAlert } from "../utils/showAlert";

export const resetPassword = (token) => {
  $("#passwordResetModal").modal("show");

  document
    .getElementById("BtnUpdatePassword")
    .addEventListener("click", async () => {
      const password = document.getElementById("passwordReset").value;
      const passwordConfirm = document.getElementById("passwordConfirmReset")
        .value;
      if (password.length < 6 || passwordConfirm.length < 6) {
        showAlert("error", "Password Should be At least six characters long");
      } else if (password != passwordConfirm) {
        showAlert("error", "Password and confirm Password should be same");
      } else {
        try {
          const response = await axios.post(
            `${url}api/v1/users/resetPassword/${token}`,
            { password, passwordConfirm }
          );

          if (response.data.status === "success") {
            showAlert("success", "Password Updated Successfully");
            $("#passwordResetModal").modal("hide");
            $(".modal-backdrop").remove();
            // window.document.location.reload();
          }
        } catch (ex) {
          console.log(ex);
          console.log(ex.response);
        }
      }
    });
};
