import mongoose, { Schema, Document, Model } from 'mongoose';
import { Market as IMarket } from '@/types/market';

// Mongoose document extends the interface and mongoose Document
export interface IMarketDocument extends Omit<IMarket, 'id'>, Document {}

const ReviewSchema = new Schema({
  id: { type: Number, required: true },
  author: { type: String, required: true },
  avatar: { type: String, required: true },
  rating: { type: Number, required: true },
  date: { type: String, required: true },
  text: { type: String, required: true },
}, { _id: false });

const MarketStorySchema = new Schema({
  established: { type: String },
  famousShops: [{ type: String }],
  funFacts: [{ type: String }],
  body: { type: String, required: true },
}, { _id: false });

const MarketSchema = new Schema<IMarketDocument>({
  slug: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  city: { type: String, required: true },
  category: [{ type: String }],
  famousFor: [{ type: String }],
  priceRange: { type: String, required: true },
  bestTimeToVisit: { type: String, required: true },
  location: { type: String, required: true },
  directions: {
    nearestMetro: { type: String },
    metroWalkTime: { type: String },
    nearestRailway: { type: String },
    railwayDistance: { type: String },
    nearestBusStop: { type: String },
    busRoutes: [{ type: String }],
    autoRickshaw: { type: Boolean, required: true },
    tips: { type: String },
  },
  crowd: {
    morning: { type: String, required: true },
    afternoon: { type: String, required: true },
    evening: { type: String, required: true },
  },
  experience: {
    behaviour: { type: String, required: true },
    bargaining: { type: Boolean, required: true },
    familyFriendly: { type: Boolean, required: true },
    parking: { type: String, required: true },
  },
  foodNearby: [{
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    type: { type: String },
  }],
  nearbyPlaces: [{ type: String }],
  images: [{ type: String }],
  featured: { type: Boolean, required: true, default: false },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  story: { type: MarketStorySchema },
  reviews: { type: [ReviewSchema], default: [] },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create virtual id from _id
MarketSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

// Ensure Model is not redefined during hot reloads
const Market: Model<IMarketDocument> = mongoose.models.Market || mongoose.model<IMarketDocument>('Market', MarketSchema);

export default Market;
