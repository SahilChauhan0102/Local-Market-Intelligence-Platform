import connectToDatabase from './mongodb';
import MarketModel, { IMarketDocument } from '../models/Market';
import type { Market, City } from '@/types/market';

/**
 * Helper to convert a Mongoose document to a plain JS object
 * matching our Market interface.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function serializeMarket(doc: any): Market {
  // If it's a Mongoose document, convert to JSON
  const obj = typeof doc.toJSON === 'function' ? doc.toJSON() : { ...doc };
  
  // Ensure string ID
  obj.id = obj.id || obj._id?.toString();
  
  // Remove MongoDB specific fields
  delete obj._id;
  delete obj.__v;
  delete obj.createdAt;
  delete obj.updatedAt;
  
  return obj as unknown as Market;
}

export async function getAllMarkets(): Promise<Market[]> {
  await connectToDatabase();
  const markets = await MarketModel.find({}).lean() as IMarketDocument[];
  return markets.map(serializeMarket);
}

export async function getMarketBySlug(slug: string): Promise<Market | null> {
  await connectToDatabase();
  const market = await MarketModel.findOne({ slug }).lean() as IMarketDocument | null;
  if (!market) return null;
  return serializeMarket(market);
}

export async function getFeaturedMarkets(): Promise<Market[]> {
  await connectToDatabase();
  const markets = await MarketModel.find({ featured: true }).lean() as IMarketDocument[];
  return markets.map(serializeMarket);
}

export async function getMarketsByCity(city: City): Promise<Market[]> {
  await connectToDatabase();
  const markets = await MarketModel.find({ city }).lean() as IMarketDocument[];
  return markets.map(serializeMarket);
}

export async function getMarketsByCategory(category: string): Promise<Market[]> {
  await connectToDatabase();
  // MongoDB regex search or simple array search. Mongoose handles arrays natively:
  // find({ category: category }) matches if the array contains the category.
  const markets = await MarketModel.find({ 
    category: { $regex: new RegExp(`^${category}$`, 'i') } 
  }).lean() as IMarketDocument[];
  return markets.map(serializeMarket);
}



export async function getAllCategories(): Promise<string[]> {
  await connectToDatabase();
  const categories = await MarketModel.distinct('category');
  return categories.sort();
}

export async function getAllCities(): Promise<City[]> {
  await connectToDatabase();
  const cities = await MarketModel.distinct('city');
  return cities.sort() as City[];
}

export async function getAllSlugs(): Promise<string[]> {
  await connectToDatabase();
  const slugs = await MarketModel.distinct('slug');
  return slugs;
}
