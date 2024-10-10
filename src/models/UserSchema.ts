import mongoose, { mongo } from "mongoose";
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  uniqueID: String,
  googleId: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    required: [true, "Please provide the name"],
  },
  image: String,
  createdAt: Date,
  updatedAt: Date,
  salt: String,
  hash: String,
  Wishlist: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  Cart: [
    {
      id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  Orders: [
    {
      type: Schema.Types.ObjectId,
      ref: "Order",
    },
  ],
  Reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  Address: {
    type: [
      {
        type: {
          AddressLine1: String,
          AddressLine2: String,
          City: String,
          State: String,
          Pincode: Number,
        },
      },
    ],
    default: []
  },
  Phone: Number,
  Email: {
    type: String,
    required: [true, "Please provide the email"],
    unique: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  gender: String,
  role: {
    type: String,
    default: "user",
    Enumerator: ["user", "staff", "admin"],
  },
});


export default mongoose.models.User ||  mongoose.model("User", UserSchema);
