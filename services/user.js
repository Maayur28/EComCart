const validator = require("../utilities/validate");
const model = require("../models/user");

let userService = {};

userService.addtoCart = async(product) => {
  if(validator.addtoCart(product))
  return await model.addtoCart(product);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "Item not found,Please check the item and try again";
    throw err;
  }
};
userService.cartQuan = async(product) => {
  if(validator.cartQuan(product))
  return await model.cartQuan(product);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "Item not found,Please check the item and try again";
    throw err;
  }
};
userService.getfromCart = async(userid) => {
  if(validator.getfromCart(userid))
  return await model.getfromCart(userid);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "Item not found,Please check the item and try again";
    throw err;
  }
};
userService.cartDelete = async(obj) => {
  if(validator.cartDelete(obj))
  return await model.cartDelete(obj);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "Item not found,Please check the item and try again";
    throw err;
  }
};
userService.getcartCount = async(userid) => {
  if(validator.getfromCart(userid))
  return await model.getcartCount(userid);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "Item not found,Please check the item and try again";
    throw err;
  }
};
userService.getcartEmpty = async(userid) => {
  if(validator.getfromCart(userid))
  return await model.getcartEmpty(userid);
  else
  {
    let err = new Error();
    err.status = 400;
    err.message = "Item not found,Please check the item and try again";
    throw err;
  }

};
module.exports = userService;
