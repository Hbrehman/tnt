import axios from "axios";
axios.defaults.withCredentials = true;

import "bootstrap";
import $ from "jquery";
import "../scss/main.scss";
import { showAlert } from "./showAlert";
import "./register";
import "./login";
import "./logout";
import "./passwordForgot";
import { updateUserOnUI } from "./updateUserOnUI";
updateUserOnUI();
