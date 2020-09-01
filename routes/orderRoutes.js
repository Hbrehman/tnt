const express = require("express");
const orderController = require("./../controllers/orderController");
const authController = require("./../controllers/authController");
const router = express.Router();

router.post(
  "/checkout-session",
  authController.protect,
  orderController.getCheckoutSession
);

router.get("/", orderController.getOrders);
module.exports = router;
