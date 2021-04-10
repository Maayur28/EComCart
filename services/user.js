const validator = require("../utilities/validate");
const model = require("../models/user");

let userService = {};

userService.addtoCart = async(product) => {
  return await model.addtoCart(product);
};
userService.cartQuan = async(product) => {
  return await model.cartQuan(product);
};
userService.getfromCart = async(userid) => {
  return await model.getfromCart(userid);
};
userService.cartDelete = async(obj) => {
  return await model.cartDelete(obj);
};
userService.getcartCount = async(userid) => {
  return await model.getcartCount(userid);
};
userService.getcartEmpty = async(userid) => {
  return await model.getcartEmpty(userid);
};
module.exports = userService;
