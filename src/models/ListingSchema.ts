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
  commonPrice: {
    type: Number,
    // required: function () {
    //   return this.variantsLabels.length === 0;
    // },
  },
  commonDiscount: {
    type: Number,
    // required: function () {
    //   return this.variantsLabels.length === 0;
    // },
  },
  commonQuantity: {
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
  variants: [
    {
      label: {
        type: String,
        // Dynamically validate `enum` values
        // validate: {
        //   validator: function (value) {
        //     return this.variantsLabels.some((label) => label.variantName === value);
        //   },
        //   message: (props) => `${props.value} is not a valid variant label`,
        // },
      },
      value: String,
      images: [String],
      price: {
        type: Number,
        // required: function () {
        //   return this.variationPriceVary;
        // },
      },
      quantity: {
        type: Number,
        // required: function () {
        //   return this.variationQuantityVary;
        // },
      },
      SKU: {
        type: String,
        // required: function () {
        //   return this.variationSKUVary;
        // },
      },
      discount: {
        type: Number,
        // required: function () {
        //   return this.variationDiscountVary;
        // },
      },
    },
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
