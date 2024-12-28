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
  color:String,
  length:Number,
  width:Number,
  videoLink:String,
  sku:String,
  images: [String],
  primaryImage: String,
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
    required: [true, "Price for India should be provided"],
  },
  priceEverywhereElse: {
    type: Number,
    required: [true, "Price for countries other than India should be provided"],
  },
  indiaDiscount: {
    type: Number,
    default: 0,
  },
  everywhereElseDiscount: {
    type: Number,
    default: 0,
  },
  variationPriceVary: {
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
  variantsLabels: [String],
  variantInfo: [
    {
      images: Boolean,
      skus: Boolean,
      prices: Boolean,
      quantity: Boolean,
      label: String,
      variants: [{
        value: String,
        image: String,
        priceIndia: Number,
        priceEverywhereElse: Number,
        quantity: Number,
        sku: String,
      }],
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
  returnable: {
    type: Boolean,
    default: false,
  },
  occasion: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  featuredCategory: {
    type: String,
    default: '',
  },
});

ListingSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Listing || mongoose.model('Listing', ListingSchema);
