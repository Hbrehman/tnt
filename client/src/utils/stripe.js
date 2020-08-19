import "./stripe_code";
var stripe = Stripe("pk_test_oyIATBf9VIl6aNp235AcGSnM005VZP7Lrn");
import axios from "axios";
import { showAlert } from "../utils/showAlert";

import { url } from "./config";

export const placeOrder = async (cartArray, cart) => {
  const lineItems = [];

  cartArray.forEach((el) => {
    console.log(el.item.imageCover);
    const obj = {};
    obj.name = el.item.name;
    obj.description = el.item.description;
    obj.images = [`${url}img/products/${el.item.imageCover}`];
    obj.amount = el.item.price * 100;
    (obj.currency = "usd"), (obj.quantity = el.qty);
    lineItems.push(obj);
  });

  try {
    const session = await axios.post(`${url}api/v1/orders/checkout-session`, {
      cart,
      lineItems,
    });

    console.log(session);

    // Create checkout form and charge credit card
    stripe.redirectToCheckout({
      sessionId: session.data.checkout.id,
    });
    const EmptyCart = JSON.stringify({ items: "" });
    localStorage.setItem("cart", JSON.stringify(EmptyCart));
  } catch (ex) {
    console.log(ex);
    console.log(ex.response);
    showAlert("error", ex.response.data.message);
  }
};
