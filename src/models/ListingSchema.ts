import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ListingSchema = new Schema({
  name: {
    unique: true,
    type: String,
    required: [true, "Name should be provided"],
  },
  description: {
    type: String,
    required: [true, "Description should be provided"],
  },
  
  images: {
    type: [String],
    required: [true, "At least one image should be provided"],
  },

  primaryImage:{
    type:String,
    required:[true,"Primary Image should be provided"]
  },
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
    required: [true, "At least one tag should be provided"],
  },
  material: {
    type: [String],
    required: [true, "Material should be provided"],
  },
  priceIndia: {
    type: Number,
    // required: function () {
    //   return this.variantsLabels.length === 0;
    // },
  },
  priceEverywhereElse: {
    type: Number,
    // required: function () {
    //   return this.variantsLabels.length === 0;
    // },
  },
  
  Discount: {
    type: Number,
    // required: function () {
    //   return this.variantsLabels.length === 0;
    // },
  },
  
  variationPriceVary: {
    type: Boolean,
    default: false,
  },
  variationDiscountVary: {
    type: Boolean,
    default: false,
  },
  variationQuantityVary: {
    type: Boolean,
    default: false,
  },
  variationSKUVary: {
    type: Boolean,
    default: false,
  },
  variantsLabels: [
    {
      variantType: String,
      variantName: String,
    },
  ],
  variantInfo: [
    {

      type:{

      label:String,
      variants:[{
        type:{
          value:String,
          image:String,
          priceIndia:Number,
          priceEverywhereElse:Number,
          quantity:Number,
          SKU:String
        }
      }]
      
    }
  }
  ],
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  views: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  soldQuantity: {
    type: Number,
    default: 0,
  },
  draft: {
    type: Boolean,
    default: true,
  },
  listed: {
    type: Boolean,
    default: false,
  },
  returnable: {
    type: Boolean,
    default: false,
  },
  occassion:{
    type: [String],
  },
  category:{
    type:String,
  }
  
});

ListingSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// ListingSchema.pre("findOneAndUpdate", function (next) {
//   this._update.updatedAt = Date.now();
//   next();
// });

// ListingSchema.pre("updateMany", function (next) {
//   this._update.updatedAt = Date.now();
//   next();
// });

// ListingSchema.pre("updateOne", function (next) {
//   this._update.updatedAt = Date.now();
//   next();
// });

export default mongoose.models.Listing || mongoose.model('Listing', ListingSchema);
