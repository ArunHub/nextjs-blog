const withSass = require("@zeit/next-sass");
// import withSass from "@zeit/next-sass";
module.exports = {
  // Webpack 5 is enabled by default
  // You can still use webpack 4 while upgrading to the latest version of Next.js by adding the "webpack5: false" flag
  webpack5: false,
  withSass: withSass(),
};
