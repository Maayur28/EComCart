const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const url = process.env.URL;
const options = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const cartprodSchema = mongoose.Schema({
  _id: { type: Number, required: [true, "_id is required"] },
  name: { type: String, required: [true, "Name is required"] },
  description: { type: String, required: [true, "Description is required"] },
  rating: { type: Number, required: [true, "Rating is required"] },
  idealFor: {
    type: String,
    enum: {
      values: ["men", "women", "kids"],
      message: "Ideal for either Men,Women or Kids",
    },
  },
  category: {
    type: String,
    enum: {
      values: ["Sports", "Casual", "Formal"],
      message: "Category should be either Sports,Casual or Formal",
    },
  },
  size:{type:String,required:[true,"Size is required"]},
  price: { type: Number, required: [true, "Price is required"] },
  color: { type: String, required: [true, "Color is required"] },
  image: { type: String, required: [true, "Image is required"] },
  discount: { type: Number },
  quantity: { type: Number, default:1 },
  shippingCharges: { type: Number },
});
const cartSchema=mongoose.Schema({
  userid:{type:String,required:[true,"userid is required"]},
  cartItem:[cartprodSchema]
})


let connection = {};
connection.getCartConnection = async () => {
  try {
    let dbConnection = await mongoose.connect(url, options);
    let model = dbConnection.model("Cart", cartSchema,"cart");
    return model;
  } catch (error) {
    let err = new Error("Could not establish connection with cart database");
    err.status = 500;
    throw err;
  }
};
module.exports = connection;
