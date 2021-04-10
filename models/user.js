const dbModel = require("../utilities/connection");

let userModel = {};

userModel.addtoCart = async (prod) => {
  /* /cart(Post) */
  let model = await dbModel.getCartConnection();
  let getCart = await model.findOne({ userid: prod.userid });
  if (!getCart) {
    let obj = {};
    obj.userid = prod.userid;
    delete prod.userid;
    obj.cartItem = [prod];
    let addCart = await model.create(obj);
    if (addCart) {
      let count = await model.findOne(
        { userid: obj.userid },
        { cartItem: 1, _id: 0 }
      );
      if (count) return count.cartItem;
      else {
        let err = new Error();
        err.status = 500;
        err.message = "Sorry!Server is busy.Please try adding to cart later";
        throw err;
      }
    } else {
      let err = new Error();
      err.status = 500;
      err.message = "Sorry!Server is busy.Please try adding to cart later";
      throw err;
    }
  } else {
    let findprod = await model.findOne({
      userid: prod.userid,
      "cartItem._id": prod._id,
    });
    if (findprod) {
      let incremntquan = await model.updateOne(
        { userid: prod.userid, "cartItem._id": prod._id },
        { $inc: { "cartItem.$.quantity": +1 } }
      );
      if (incremntquan.nModified > 0) {
        let count = await model.findOne(
          { userid: prod.userid },
          { cartItem: 1, _id: 0 }
        );
        if (count) return count.cartItem;
        else {
          let err = new Error();
          err.status = 500;
          err.message = "Sorry!Server is busy.Please try adding to cart later";
          throw err;
        }
      }
    } else {
      let id = prod.userid;
      delete prod.userid;
      let pushitem = await model.updateOne(
        { userid: id },
        { $push: { cartItem: prod } }
      );
      if (pushitem.nModified > 0) {
        let count = await model.findOne(
          { userid: id },
          { cartItem: 1, _id: 0 }
        );
        if (count) return count.cartItem;
        else {
          let err = new Error();
          err.status = 500;
          err.message = "Sorry!Server is busy.Please try adding to cart later";
          throw err;
        }
      } else {
        let err = new Error();
        err.status = 500;
        err.message = "Sorry!Server is busy.Please try adding to cart later";
        throw err;
      }
    }
  }
};
userModel.cartQuan = async (prod) => {
  let model = await dbModel.getCartConnection();
  let updateQuan = await model.updateOne(
    { userid: prod.userid, "cartItem._id": prod._id },
    { $set: { "cartItem.$.quantity": prod.quantity } }
  );
  if (updateQuan.nModified == 0) {
    let err = new Error();
    err.status = 500;
    err.message = "Sorry!Server is busy.Please try to update quantity later";
    throw err;
  } else {
    let cartData = await model.findOne(
      { userid: prod.userid, "cartItem._id": prod._id },
      { cartItem: 1, _id: 0 }
    );
    return cartData.cartItem;
  }
};
userModel.getfromCart = async (userid) => {
  let model = await dbModel.getCartConnection();
  let getCart = await model.findOne(
    { userid: userid },
    { cartItem: 1, _id: 0 }
  );
  if (getCart) return getCart.cartItem;
  else return [];
};
userModel.cartDelete = async (obj) => {
  let model = await dbModel.getCartConnection();
  let getCart = await model.updateOne(
    { userid: obj.userid },
    { $pull: { cartItem: { _id: obj._id } } }
  );
  if (getCart.nModified > 0) {
    let getCartDetail = await model.findOne(
      { userid: obj.userid },
      { cartItem: 1, _id: 0 }
    );
    return getCartDetail.cartItem;
  } else {
    let err = new Error();
    err.status = 501;
    err.message = "Sorry!Server is busy.Please try to remove later";
    throw err;
  }
};
userModel.getcartCount = async (userid) => {
  let model = await dbModel.getCartConnection();
  let cartCount = await model.findOne(
    { userid: userid },
    { cartItem: 1, _id: 0 }
  );
  if (!cartCount) {
    let obj = {};
    obj.userid = userid;
    obj.cartItem = [];
    let addCart = await model.create(obj);
    return 0;
  }
  return cartCount.cartItem.length;
};
userModel.getcartEmpty = async (userid) => {
  console.log(userid);
  let model = await dbModel.getCartConnection();
  let cartCount = await model.findOne(
    { userid: userid },
    { cartItem: 1, _id: 0 }
  );
  if (cartCount.cartItem.length > 0) {
    let emptycart = await model.deleteMany({ userid: userid });
    if (emptycart.deletedCount > 0) return cartCount.cartItem;
    else {
      let err = new Error();
      err.status = 501;
      err.message = "Error in removing from cart";
      throw err;
    }
  } else {
    let err = new Error();
    err.status = 501;
    err.message = "No Item in cart found";
    throw err;
  }
};

module.exports = userModel;
