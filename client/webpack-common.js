const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: "./src/products/index.js",
    shoppingCart: "./src/shoppingCart/index.js",
    tiles: "./src/tiles/index.js",
    taps: "./src/taps/index.js",
    sanitaryWare: "./src/sanitaryWare/index.js",
    about: "./src/utils/about.js",
    contact: "./src/utils/contact.js",
    outlets: "./src/utils/outlets.js",
    profile: "./src/utils/profile.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: true,
      chunks: ["index"],
      filename: "index.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/shoppingCart.html",
      inject: true,
      chunks: ["shoppingCart"],
      filename: "shoppingCart.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/tiles.html",
      inject: true,
      chunks: ["tiles"],
      filename: "tiles.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/taps.html",
      inject: true,
      chunks: ["taps"],
      filename: "taps.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/sanitaryWare.html",
      inject: true,
      chunks: ["sanitaryWare"],
      filename: "sanitaryWare.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/about.html",
      inject: true,
      chunks: ["about"],
      filename: "about.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/contact.html",
      inject: true,
      chunks: ["contact"],
      filename: "contact.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/outlets.html",
      inject: true,
      chunks: ["outlets"],
      filename: "outlets.html",
    }),
    new HtmlWebpackPlugin({
      template: "./src/profile.html",
      inject: true,
      chunks: ["profile"],
      filename: "profile.html",
    }),
  ],
};
