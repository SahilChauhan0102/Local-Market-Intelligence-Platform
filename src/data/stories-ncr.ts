import type { MarketStory } from '@/types/market';

const stories: Record<string, MarketStory> = {
  'sector-18-noida-market': {
    established: '1990s',
    famousShops: [
      'Atta Market Expansion — the bridge between traditional and modern',
      'Kapoors Balle Balle — famous North Indian dining',
      'Street Food Lane — legendary momos and shawarma',
    ],
    funFacts: [
      'Sector 18 commands some of the highest commercial rentals in the NCR.',
      'It was one of the first open-air mall-style markets in Noida.',
      'The market connects directly to the Great India Place mall.',
    ],
    body: `Sector 18 Market is the commercial nucleus of Noida, representing the city's transition from an industrial suburb to a modern metropolis. Developed in the 1990s, this sprawling grid of streets was designed to be the ultimate shopping and entertainment destination for Noida's growing middle class. Unlike the organic chaos of Old Delhi or the colonial symmetry of Connaught Place, Sector 18 is unapologetically modern — a maze of glass facades, neon signs, and multi-storey retail outlets.\n\nThe market's layout is practical but dense. It is famously easy to get lost among the similar-looking blocks, but that's part of the experience. The central lanes are dominated by fashion boutiques, electronics showrooms, and banking institutions. However, it's the food scene that truly defines Sector 18. From fine dining restaurants that have served families for two decades to the legendary street food stalls selling momos, shawarmas, and rolls, the area caters to every budget and craving.\n\nWhat makes Sector 18 unique is how it serves as a bridge. It sits right next to the traditional Atta Market and the mammoth DLF Mall of India, effectively connecting the old-world bazaar experience with ultra-modern mall culture. On weekends, the energy here is electric, with young professionals, students, and families converging to shop, eat, and socialize in Noida's favorite playground.`,
  },

  'atta-market-noida': {
    established: '1970s',
    famousShops: [
      'Noida Cloth House — traditional and contemporary fabrics',
      'Atta Street Food Corner — famous chaat and golgappe',
      'Budget Footwear Lane — endless varieties of shoes and sandals',
    ],
    funFacts: [
      'Atta Market predates the modern development of Noida by several decades.',
      'It is named after the Atta village which originally occupied the area.',
      'The market is known as Noida\'s answer to Sarojini Nagar.',
    ],
    body: `Long before Noida became a city of glass towers and expressways, there was Atta Village. And from this village grew Atta Market, the most traditional, chaotic, and vibrant shopping destination in the region. Often compared to Delhi's Sarojini Nagar or Lajpat Nagar, Atta Market is where the real, everyday shopping of Noida happens, far away from the polished air-conditioning of the nearby malls.\n\nEstablished formally in the 1970s as Noida began its initial development, Atta Market has retained its raw, bazaar-like atmosphere. The narrow lanes are perpetually packed with shoppers navigating through a maze of stalls selling clothes, accessories, utensils, and footwear. Bargaining is not just accepted here; it is the fundamental language of commerce. A skilled negotiator can walk away with an entire wardrobe for a fraction of what it would cost across the street in Sector 18.\n\nThe market is particularly famous for its ethnic wear and bridal accessories. During the wedding and festival seasons, the lanes are festooned with lights and the crowds swell to epic proportions. The street food scene is equally compelling, with vendors serving up spicy chaat, crispy aloo tikki, and sweet jalebis to exhausted shoppers. Atta Market survives and thrives because it offers authenticity, affordability, and an energy that modern retail spaces simply cannot replicate.`,
  },

  'cyber-hub-gurugram': {
    established: '2013',
    famousShops: [
      'The Wine Company — pioneer of the Cyber Hub dining experience',
      'Farzi Cafe — modern Indian cuisine that started a trend',
      'Smaaash — entertainment and virtual reality gaming',
    ],
    funFacts: [
      'Cyber Hub was India\'s first integrated food and entertainment destination of its kind.',
      'It spans over 2 lakh square feet and features an open-air amphitheatre.',
      'The complex connects directly to the Rapid Metro system.',
    ],
    body: `DLF Cyber Hub is not a traditional market; it is the ultimate modern manifestation of urban leisure. Opened in 2013, it completely redefined what a commercial complex could be in the NCR. Nestled amidst the towering corporate offices of Cyber City, this sprawling, open-air promenade was designed primarily as a food and entertainment destination, catering to the thousands of corporate executives working in the vicinity.\n\nUnlike traditional bazaars built around retail, Cyber Hub is built around experience. The architecture is striking, with wide, pedestrian-only walkways, futuristic metallic canopies, and an amphitheatre that regularly hosts live bands, stand-up comedy, and cultural events. It feels less like a market and more like a highly curated urban plaza. The dining options are staggering, ranging from casual cafes and bakeries to high-end microbreweries and fine dining restaurants representing global cuisines.\n\nWhile retail takes a backseat to food, the stores here are premium, focusing on lifestyle, gifting, and niche brands. The energy shifts dramatically throughout the day: quiet coffee meetings in the morning, a massive lunch rush of office-goers, and a vibrant, neon-lit party atmosphere by night. Cyber Hub is Gurugram's crown jewel of lifestyle destinations, perfectly reflecting the city's corporate, fast-paced, and cosmopolitan identity.`,
  },

  'sadar-bazaar-gurugram': {
    established: '1950s',
    famousShops: [
      'Sita Ram Diwan Chand — famous for traditional chole bhature',
      'Gurugram Cloth Emporium — decades-old fabric retailer',
      'Old Jewelry Lane — traditional goldsmiths and silversmiths',
    ],
    funFacts: [
      'This is Gurugram\'s oldest commercial market, predating its corporate boom.',
      'The market is divided into specialized lanes for clothes, utensils, and hardware.',
      'Despite the malls, it remains the primary destination for wholesale wedding shopping.',
    ],
    body: `Before Gurugram became "The Millennium City," it was a quiet, dusty town in Haryana, and Sadar Bazaar was its beating commercial heart. Established in the 1950s, this historic market stands in stark contrast to the glass skyscrapers of Cyber City. Sadar Bazaar is traditional, loud, crowded, and utterly indispensable to the local population. It is where old Gurgaon comes to shop.\n\nThe market operates on the classic Indian bazaar model, divided into specialized galis (lanes). There is a lane for steel utensils, a lane for wedding clothes, a lane for wholesale hardware, and a lane dedicated entirely to traditional jewelry. Navigating Sadar Bazaar requires patience and strong elbows, as the narrow streets are shared by pedestrians, rickshaws, and stray cattle. However, the reward for braving the chaos is unparalleled variety and unbeatable wholesale prices.\n\nSadar Bazaar comes into its own during the festive and wedding seasons. Families who have lived in Gurgaon for generations still prefer buying their bridal trousseau, jewelry, and household goods here rather than in the new malls. The market is also home to some of the city's oldest and most beloved street food vendors, serving up jalebis, kachoris, and chaat whose recipes haven't changed in fifty years. It is a vibrant reminder of the city's roots.`,
  },

  'vaishali-market-ghaziabad': {
    established: '1990s',
    famousShops: [
      'Shopprix Mall — the anchor of the market area',
      'Vaishali Food Strip — diverse local and fast-food eateries',
      'Electronic Paradise — trusted local appliance retailer',
    ],
    funFacts: [
      'Vaishali Market grew rapidly following the extension of the Delhi Metro.',
      'It is one of the most neatly planned residential markets in Ghaziabad.',
      'The market is a popular evening hangout spot for students from nearby institutes.',
    ],
    body: `Vaishali Market represents the planned, organized face of Ghaziabad's retail landscape. As the Vaishali township developed in the 1990s and early 2000s, designed to accommodate the spillover population from Delhi, it needed a commercial center that offered convenience without the chaos of older markets. The result is a sprawling, structured market that perfectly balances daily utility with leisurely shopping.\n\nThe market is characterized by wide roads and designated commercial blocks, making it far more navigable than traditional bazaars. It is a classic neighborhood market scaled up, featuring everything from fresh grocery stores and pharmacies to fashion boutiques and electronics showrooms. The presence of smaller malls, like Shopprix, adds a modern retail dimension to the area, providing air-conditioned comfort and branded stores alongside local vendors.\n\nThe food scene in Vaishali Market is a major draw. It caters to a diverse, cosmopolitan crowd, offering everything from classic North Indian dhabas and South Indian tiffin centers to modern cafes and international fast-food chains. In the evenings, the market transforms into a lively social hub. Families come out for strolls, students from nearby colleges gather at the food stalls, and the area hums with a comfortable, community-focused energy that makes it one of Ghaziabad's most pleasant commercial spaces.`,
  },

  'sector-15-market-faridabad': {
    established: '1980s',
    famousShops: [
      'Sector 15 Sweets — legendary local mithai shop',
      'Fashion Avenue — trendy clothing for all ages',
      'Book Centre — one of the oldest bookstores in Faridabad',
    ],
    funFacts: [
      'Sector 15 is considered the premier shopping and dining destination in Faridabad.',
      'The market is known for its wide, tree-lined pedestrian walkways.',
      'It hosts a vibrant weekend flea market for local artisans.',
    ],
    body: `Sector 15 Market is the undisputed commercial and social hub of Faridabad. Established in the 1980s as the city expanded its residential sectors, it was designed to be a premium shopping destination, and it has successfully maintained that reputation for decades. Known for its wide, tree-lined avenues and well-organized layout, Sector 15 offers a shopping experience that is both relaxed and comprehensive.\n\nThe market is a magnet for the city's upper-middle class. It features a strong mix of high-street fashion brands, independent boutiques, upscale grocery stores, and specialty shops. Unlike the crowded lanes of older markets, Sector 15 encourages leisurely browsing. The pedestrian pathways are well-maintained, and there is a distinct lack of the aggressive hawking found elsewhere, making it a favorite for family outings.\n\nGastronomy is a significant part of Sector 15's appeal. It boasts some of Faridabad's finest restaurants, popular cafes, and legendary sweet shops that draw customers from across the NCR. During the evenings, especially on weekends, the market is buzzing with activity. The cafes are packed with young people, while families enjoy dinners at multi-cuisine restaurants. Sector 15 Market perfectly encapsulates the modern, affluent, and relaxed side of Faridabad's urban life.`,
  }
};

export default stories;
