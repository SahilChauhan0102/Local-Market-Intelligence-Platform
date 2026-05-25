import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import dns from 'dns';

dns.setServers(['8.8.8.8']);
dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('MONGODB_URI not found in .env.local');
  process.exit(1);
}

const generateReviews = (marketName: string, positive: string, negative: string) => [
  {
    id: 1,
    author: 'Neha Verma',
    avatar: 'NV',
    rating: 5,
    date: '2 weeks ago',
    text: `Amazing place! ${positive} You have to bargain to get the best deals, but the collection is unmatched.`,
  },
  {
    id: 2,
    author: 'Rahul Sharma',
    avatar: 'RS',
    rating: 4,
    date: '1 month ago',
    text: `Great variety but ${negative}. Better to come on a weekday morning to avoid the rush.`,
  },
  {
    id: 3,
    author: 'Priya Gupta',
    avatar: 'PG',
    rating: 3,
    date: '2 months ago',
    text: `Good market but parking is a nightmare. ${positive} though. Take the metro!`,
  }
];

const NEW_DELHI_MARKETS = [
  // ── KHAN MARKET ─────────────────────────────────────────────────────────────
  {
    slug: 'khan-market-delhi',
    name: 'Khan Market',
    tagline: "Delhi's most expensive address — boutiques, books, and gourmet dining in a Partition-era market",
    city: 'Delhi',
    category: ['Luxury', 'Books', 'Food & Dining', 'Boutiques'],
    famousFor: ['Premium Boutiques', 'Bahrisons Bookstore', 'Gourmet Cafes', 'Diplomatic Community'],
    priceRange: '₹₹₹',
    bestTimeToVisit: 'Open daily except Sunday (Closed on Sunday)',
    location: 'Khan Market, New Delhi — between Lodhi Colony and India Gate',
    directions: {
      nearestMetro: 'Khan Market — Violet Line',
      metroWalkTime: '5 min walk',
      autoRickshaw: true,
      tips: 'Parking is extremely scarce. The Metro is your best option. Most shops open by 11 AM.',
    },
    crowd: { morning: 'Low', afternoon: 'Medium', evening: 'High' },
    experience: { behaviour: 'Friendly', bargaining: false, familyFriendly: true, parking: 'Limited' },
    foodNearby: [
      { name: 'Khan Chacha', rating: 4.7, type: 'Mughlai / Kebabs' },
      { name: 'The Big Chill Café', rating: 4.6, type: 'Cafe / Italian' },
      { name: 'Cafe Turtle', rating: 4.4, type: 'Cafe / Books' },
    ],
    nearbyPlaces: ['Lodhi Garden', 'India Gate', 'Humayun Tomb'],
    images: ['/images/markets/dilli-haat-1.jpg'],
    featured: true,
    rating: 4.7,
    reviewCount: 6800,
    story: {
      established: '1951',
      famousShops: ['Bahrisons Booksellers (est. 1953)', 'The Big Chill Café', 'Khan Chacha'],
      funFacts: [
        'Khan Market consistently ranks as the most expensive retail real estate in India and among the top 20 globally.',
        'It was established in 1951 to rehabilitate traders displaced from Rawalpindi (now Pakistan) after Partition.',
        'Named after Khan Abdul Jabbar Khan, a Pashtun politician from British India.',
        'Bahrisons Booksellers, established in 1953, has hosted book launches by India\'s presidents and prime ministers.',
      ],
      body: 'Khan Market is one of the most deceptive addresses in India. Its real estate value per square foot rivals Bond Street in London, yet it maintains the intimate scale of a neighbourhood market. Established in 1951 to provide livelihoods for Partition-era refugees from Rawalpindi, it has transformed over seven decades into the preferred shopping and dining destination of Delhi\'s political class, diplomatic community, and intellectual elite. The market\'s bookshops — particularly the legendary Bahrisons — have witnessed the autographs of presidents and prime ministers. Its restaurants serve some of Delhi\'s most refined cuisine. And yet, alongside a ₹600 cup of coffee from a European-style café, you\'ll find a ₹20 chai from a vendor who has been there longer than anyone can remember.',
    },
    reviews: generateReviews('Khan Market', 'The bookshops and cafes here are world-class.', 'everything is very expensive and parking is impossible'),
  },

  // ── CONNAUGHT PLACE ──────────────────────────────────────────────────────────
  {
    slug: 'connaught-place-delhi',
    name: 'Connaught Place',
    tagline: "Delhi's grand Georgian marketplace — the city's living room since 1933",
    city: 'Delhi',
    category: ['Shopping', 'Food & Dining', 'Luxury', 'Heritage'],
    famousFor: ['Premium Brands', 'Historic Cafes', 'Street Performers', 'Central Park'],
    priceRange: '₹₹',
    bestTimeToVisit: 'Open daily (evenings are best)',
    location: 'Connaught Place (Rajiv Chowk), Central Delhi',
    directions: {
      nearestMetro: 'Rajiv Chowk — Yellow & Blue Lines',
      metroWalkTime: '2 min walk',
      autoRickshaw: false,
      tips: 'Use the Metro — Rajiv Chowk is the busiest station in India. Driving here is very frustrating. Watch out for touts.',
    },
    crowd: { morning: 'Low', afternoon: 'High', evening: 'High' },
    experience: { behaviour: 'Average', bargaining: false, familyFriendly: true, parking: 'Limited' },
    foodNearby: [
      { name: 'Wengers Bakery', rating: 4.5, type: 'Bakery / Café (est. 1926)' },
      { name: 'United Coffee House', rating: 4.4, type: 'Continental / Heritage Café' },
      { name: 'Kwality Restaurant', rating: 4.2, type: 'Multi-cuisine / Heritage' },
    ],
    nearbyPlaces: ['Palika Bazaar', 'Janpath Market', 'India Gate', 'Rashtrapati Bhavan'],
    images: ['/images/markets/dilli-haat-1.jpg'],
    featured: true,
    rating: 4.5,
    reviewCount: 18500,
    story: {
      established: '1933',
      famousShops: ['Wengers (bakery, est. 1926)', 'The Oxford Bookstore', 'Brand flagship stores around Inner Circle'],
      funFacts: [
        'Connaught Place was designed by British architect Robert Tor Russell and named after Prince Arthur, Duke of Connaught.',
        'The underground Palika Bazaar sits directly beneath its central park — making CP Delhi\'s only market with two layers.',
        'It is one of the few places in Delhi with a genuinely walkable, pedestrian-friendly circular layout.',
        'Post-independence, it was renamed "Rajiv Chowk" but locals still call it CP.',
      ],
      body: 'Connaught Place was designed in the 1930s as the commercial crown of British New Delhi — a grand Georgian-style colonnade arranged in concentric circles around a manicured central park. Nearly a century later, it remains Delhi\'s most cosmopolitan marketplace. The white colonnades now house everything from luxury brands and international chains to historic bakeries that predate Independence. Wengers, the legendary bakery, has been baking pastries on these corridors since 1926 — before Connaught Place was even finished. The Palika Bazaar thrums in the underworld beneath your feet, the Metro station below is the busiest in all of India, and above ground, the streets fill every evening with students, office workers, tourists, and street performers. CP is not just a market — it is Delhi\'s living room.',
    },
    reviews: generateReviews('Connaught Place', 'The heritage architecture and variety of shops and restaurants is unbeatable.', 'touts and beggars can be a nuisance around the outer circle'),
  },

  // ── GAFFAR MARKET ────────────────────────────────────────────────────────────
  {
    slug: 'gaffar-market-delhi',
    name: 'Gaffar Market',
    tagline: "Karol Bagh's electrifying grey-market for gadgets, mobiles, and electronics at unbeatable prices",
    city: 'Delhi',
    category: ['Electronics', 'Mobile Phones', 'Gadgets'],
    famousFor: ['Mobile Phones', 'Smartwatches', 'Earphones', 'Laptop Accessories', 'Refurbished Gadgets'],
    priceRange: '₹',
    bestTimeToVisit: 'Open daily except Sunday (Closed on Sunday)',
    location: 'Gaffar Market, Karol Bagh, Central Delhi',
    directions: {
      nearestMetro: 'Karol Bagh — Blue Line',
      metroWalkTime: '10 min walk',
      autoRickshaw: true,
      tips: 'Know your product specs before visiting. Always test gadgets before paying. Bargain hard — first prices are inflated.',
    },
    crowd: { morning: 'Medium', afternoon: 'High', evening: 'High' },
    experience: { behaviour: 'Average', bargaining: true, familyFriendly: false, parking: 'None' },
    foodNearby: [
      { name: 'Roshan Di Kulfi', rating: 4.7, type: 'Desserts / Kulfi' },
      { name: 'Prem Di Hatti', rating: 4.4, type: 'Chhole Bhature' },
    ],
    nearbyPlaces: ['Karol Bagh Market', 'Ajmal Khan Road'],
    images: ['/images/markets/chandni-chowk-1.jpg'],
    featured: false,
    rating: 4.2,
    reviewCount: 5100,
    story: {
      established: '1980s',
      famousShops: ['Mobile accessory lanes', 'Second-hand phone dealers', 'Smartwatch and earphone stalls'],
      funFacts: [
        'Gaffar Market is one of the largest grey-market electronics hubs in Asia.',
        'It is unofficially known as "the market where everything has a twin" — authentic and replicas sold side by side.',
        'Before online shopping, Gaffar was the only place in Delhi you could find the latest international gadgets.',
        'The market operates across multiple floors, each specializing in different electronics categories.',
      ],
      body: 'Gaffar Market in Karol Bagh is Delhi\'s most audacious electronics market — a sprawling, multi-storey labyrinth where knowing your products is your only protection. What began as a modest secondhand electronics lane in the 1980s has evolved into a complex spanning multiple levels. Before Flipkart and Amazon disrupted everything, Gaffar Market was where Delhi came for the newest gadgets — often months before official launch. The market has adapted to the e-commerce era by doubling down on what algorithms can\'t offer: the ability to touch, test, haggle, and walk away with something in hand. Come with cash, come with knowledge, and keep your receipts.',
    },
    reviews: generateReviews('Gaffar Market', 'Got an amazing deal on earphones — half the price of online stores.', 'you need to be very careful about fakes and always test before buying'),
  },

  // ── BHAGIRATHI PALACE ────────────────────────────────────────────────────────
  {
    slug: 'bhagirathi-palace-delhi',
    name: 'Bhagirathi Palace (Batti Market)',
    tagline: "Asia's largest wholesale electrical market — powering every building in North India since 1947",
    city: 'Delhi',
    category: ['Wholesale', 'Electronics', 'Hardware'],
    famousFor: ['Electrical Fittings', 'Wiring & Cables', 'LED Lights', 'Fans & Switches', 'Generator Parts'],
    priceRange: '₹',
    bestTimeToVisit: 'Weekday Mornings (Closed on Sunday)',
    location: 'Chandni Chowk, Old Delhi (adjacent to Fatehpuri Masjid)',
    directions: {
      nearestMetro: 'Chandni Chowk — Yellow Line',
      metroWalkTime: '10 min walk',
      nearestRailway: 'Old Delhi Railway Station',
      railwayDistance: '1 km',
      autoRickshaw: false,
      tips: 'Know your exact specifications before visiting. Vendors deal in bulk and technical jargon. Come with a licensed electrician if unsure.',
    },
    crowd: { morning: 'High', afternoon: 'High', evening: 'Low' },
    experience: { behaviour: 'Average', bargaining: true, familyFriendly: false, parking: 'None' },
    foodNearby: [
      { name: 'Giani\'s di Hatti', rating: 4.6, type: 'Desserts / Rabri Falooda' },
    ],
    nearbyPlaces: ['Khari Baoli', 'Fatehpuri Masjid', 'Chandni Chowk'],
    images: ['/images/markets/chandni-chowk-2.jpg'],
    featured: false,
    rating: 4.4,
    reviewCount: 3200,
    story: {
      established: '1947',
      famousShops: ['Electrical fittings wholesale lanes', 'LED and lighting suppliers', 'Generator and cable dealers'],
      funFacts: [
        'Bhagirathi Palace is the largest wholesale market for electrical goods in Asia.',
        'It was established immediately after Partition by traders who migrated from Lahore and Rawalpindi.',
        'The market handles an estimated ₹3,000 crore in annual electrical goods trade.',
        'Almost every building constructed in North India in the last 50 years has electrical components sourced from here.',
      ],
      body: 'Bhagirathi Palace — locally known as Batti Market — is where Delhi\'s electrical universe begins. Established in 1947 by traders fleeing Partition violence in Lahore and Rawalpindi, this market in Chandni Chowk has grown into the largest wholesale electrical goods market in Asia. The warren of lanes is a sensory overload: thousands of lightbulbs hang like constellations, cables coil in every diameter and colour, and the air smells of hot metal and insulation. If a building was constructed anywhere in North India in the last half-century, its wiring, switches, fans, and lights almost certainly passed through Bhagirathi Palace\'s supply chain.',
    },
    reviews: generateReviews('Bhagirathi Palace', 'Got all my renovation electrical supplies here at 40% less than retail.', 'it is only for those who know what they need — very confusing for beginners'),
  },

  // ── SUNDER NAGAR MARKET ──────────────────────────────────────────────────────
  {
    slug: 'sunder-nagar-market-delhi',
    name: 'Sunder Nagar Market',
    tagline: "Delhi's quiet antiques haven — curios, silver, and art from across the subcontinent",
    city: 'Delhi',
    category: ['Antiques', 'Art', 'Luxury', 'Boutiques'],
    famousFor: ['Antique Silver', 'Old Coins', 'Curios', 'Tribal Jewelry', 'Vintage Art'],
    priceRange: '₹₹₹',
    bestTimeToVisit: 'Open daily except Sunday (Closed on Sunday)',
    location: 'Sunder Nagar, Near Khan Market, New Delhi',
    directions: {
      nearestMetro: 'Khan Market — Violet Line',
      metroWalkTime: '10 min walk',
      autoRickshaw: true,
      tips: 'Authentication is key — bring an expert if buying expensive antiques. Prices are negotiable but subtly.',
    },
    crowd: { morning: 'Low', afternoon: 'Low', evening: 'Low' },
    experience: { behaviour: 'Friendly', bargaining: true, familyFriendly: true, parking: 'Limited' },
    foodNearby: [
      { name: 'The Garden Café', rating: 4.3, type: 'Café / Continental' },
    ],
    nearbyPlaces: ['Khan Market', 'Humayun Tomb', 'Lodhi Garden'],
    images: ['/images/markets/lajpat-1.jpg'],
    featured: false,
    rating: 4.5,
    reviewCount: 1800,
    story: {
      established: '1950s',
      famousShops: ['Silver antique dealers', 'Old coin collectors', 'Miniature painting galleries'],
      funFacts: [
        'Sunder Nagar Market is the most prestigious antiques market in Delhi, attracting international collectors.',
        'Many artifacts here are sourced from old Rajput and Mughal collections via estate sales.',
        'The market is a favourite hunting ground for foreign diplomats and expats buying Indian heritage objects.',
        'Some coin dealers here have pieces dating back to the Maurya Empire (321 BCE).',
      ],
      body: 'Sunder Nagar Market operates at a completely different frequency from the rest of Delhi\'s bazaars. There are no shouting vendors, no raucous bargaining, no crowds pressing against you. Instead, there are hushed shops with carefully curated collections of antique silver, old Indian currency, tribal jewelry, vintage bronzes, and rare miniature paintings. The market has for decades been the preferred destination for diplomats, serious collectors, and interior designers seeking authentic Indian heritage objects. Walk slowly here — the real treasures are in the dusty corners of glass cases, not on the front shelves.',
    },
    reviews: generateReviews('Sunder Nagar Market', 'Found a stunning antique silver piece at a fair price.', 'you really need to know antiques or you might overpay'),
  },

  // ── AMAR COLONY MARKET ───────────────────────────────────────────────────────
  {
    slug: 'amar-colony-market-delhi',
    name: 'Amar Colony Market',
    tagline: 'South Delhi\'s buzzing fashion market for ethnic wear, footwear, and street food',
    city: 'Delhi',
    category: ['Fashion', 'Ethnic Wear', 'Footwear', 'Street Food'],
    famousFor: ['Ethnic Kurtis', 'Juttis & Footwear', 'Street Food', 'Affordable Fashion'],
    priceRange: '₹₹',
    bestTimeToVisit: 'Open daily except Tuesday (Closed on Tuesday)',
    location: 'Amar Colony, Lajpat Nagar, South Delhi',
    directions: {
      nearestMetro: 'Lajpat Nagar — Violet Line',
      metroWalkTime: '10 min walk',
      autoRickshaw: true,
      tips: 'Visit on weekday evenings for a pleasant, less crowded experience. The momos here are legendary.',
    },
    crowd: { morning: 'Low', afternoon: 'Medium', evening: 'High' },
    experience: { behaviour: 'Friendly', bargaining: true, familyFriendly: true, parking: 'Limited' },
    foodNearby: [
      { name: 'Momo Lane', rating: 4.6, type: 'Momos / Street Food' },
      { name: 'Giani Ice Cream', rating: 4.5, type: 'Desserts / Ice Cream' },
    ],
    nearbyPlaces: ['Lajpat Nagar Central Market', 'Dilli Haat INA'],
    images: ['/images/markets/sarojini-1.jpg'],
    featured: false,
    rating: 4.3,
    reviewCount: 3400,
    story: {
      established: '1970s',
      famousShops: ['Jutti shops near main lane', 'Block print kurti stalls', 'Evening momo carts'],
      funFacts: [
        'Amar Colony is considered by South Delhi residents to be the more "local" and less touristy alternative to Sarojini Nagar.',
        'The market has one of the best jutti (traditional Indian footwear) collections in Delhi.',
        'Its momo stalls have been ranked among the top 5 momo spots in Delhi by multiple food guides.',
        'Evening shopping here is a social ritual for Lajpat Nagar and South Delhi residents.',
      ],
      body: 'Amar Colony Market sits in the comfortable middle ground between Sarojini Nagar\'s export-surplus chaos and the upscale boutiques of Khan Market. This is where South Delhi actually shops — ethnic kurtis, Rajasthani juttis, festival accessories, and everyday fashion at prices that don\'t require an excuse. The market has a pleasantly local feel: regular aunties bargaining with shopkeepers they\'ve known for years, college students hunting for Indo-Western fusion outfits, and the unforgettable momo lane where steamer trays pile high from 5 PM onwards. Amar Colony is uncomplicated, lively, and exactly the kind of market that makes Delhi feel like home.',
    },
    reviews: generateReviews('Amar Colony Market', 'The best juttis in all of Delhi at amazing prices.', 'it gets extremely packed in the evening and weekends'),
  },

  // ── INA MARKET ───────────────────────────────────────────────────────────────
  {
    slug: 'ina-market-delhi',
    name: 'INA Market',
    tagline: "South Delhi's beloved food & produce market — imported goods, fresh meats, and global ingredients",
    city: 'Delhi',
    category: ['Food & Produce', 'Imports', 'Grocery'],
    famousFor: ['Imported Foods', 'Fresh Meats', 'Exotic Vegetables', 'Organic Produce', 'Spices'],
    priceRange: '₹₹',
    bestTimeToVisit: 'Open daily (Morning best for fresh produce)',
    location: 'INA Colony, South Delhi — opposite Dilli Haat',
    directions: {
      nearestMetro: 'INA — Yellow Line',
      metroWalkTime: '2 min walk',
      autoRickshaw: true,
      tips: 'Go in the morning (before 10 AM) for the freshest produce. The fish and meat sections are at the back. Carry bags.',
    },
    crowd: { morning: 'High', afternoon: 'Medium', evening: 'Medium' },
    experience: { behaviour: 'Average', bargaining: true, familyFriendly: true, parking: 'Limited' },
    foodNearby: [
      { name: 'Dilli Haat Food Court', rating: 4.3, type: 'Regional Indian Cuisines' },
      { name: 'South Indian Stalls', rating: 4.4, type: 'Dosas / Idli' },
    ],
    nearbyPlaces: ['Dilli Haat INA', 'AIIMS', 'Safdarjung Hospital'],
    images: ['/images/markets/dilli-haat-1.jpg'],
    featured: false,
    rating: 4.4,
    reviewCount: 4100,
    story: {
      established: '1960s',
      famousShops: ['Imported goods section', 'Fish and meat market', 'Organic vegetable vendors'],
      funFacts: [
        'INA Market is Delhi\'s primary source for imported and specialty food products.',
        'It serves the diplomatic community of Chanakyapuri, which relies on it for international ingredients.',
        'The fish section here receives fresh catches daily from Bombay and Kolkata ports.',
        'It is one of the few Delhi markets where you can consistently find ingredients for Korean, Thai, and Middle Eastern cooking.',
      ],
      body: 'INA Market is the pantry of South Delhi — the place that has quietly kept the city\'s kitchens stocked for over sixty years. Situated directly across from Dilli Haat, it operates on an entirely different principle: while Dilli Haat celebrates craftsmanship, INA celebrates ingredients. The market has long been the first port of call for Delhi\'s diplomatic community in nearby Chanakyapuri, which requires imported condiments, specialty cheeses, and international cooking ingredients. Alongside the imported goods section, the fresh produce vendors carry seasonal vegetables from across India, the fish market receives daily deliveries from the coasts, and the spice shops maintain a remarkable variety that would impress even the most demanding home chef. INA is unglamorous, functional, and indispensable.',
    },
    reviews: generateReviews('INA Market', 'Best place in Delhi for imported ingredients and fresh seafood.', 'the meat section can have strong smells — not for the faint-hearted'),
  },

  // ── GHAFFAR MARKET / TIBETAN MARKET MAJNU KA TILLA ──────────────────────────
  {
    slug: 'majnu-ka-tilla-delhi',
    name: 'Majnu Ka Tilla (Tibetan Colony)',
    tagline: "A piece of Tibet in Delhi — authentic momos, thukpa, and Tibetan crafts since 1960",
    city: 'Delhi',
    category: ['Food & Dining', 'Ethnic Crafts', 'Cultural'],
    famousFor: ['Authentic Momos', 'Thukpa Noodle Soup', 'Tibetan Handicrafts', 'Thangka Paintings', 'Budget Travel'],
    priceRange: '₹',
    bestTimeToVisit: 'Open daily (Best in evenings)',
    location: 'Majnu Ka Tilla, Civil Lines, North Delhi',
    directions: {
      nearestMetro: 'Vidhan Sabha — Red Line',
      metroWalkTime: '20 min walk or 10 min auto',
      autoRickshaw: true,
      tips: 'Walk through the interior lanes for the most authentic experience. Avoid weekends if you dislike crowds.',
    },
    crowd: { morning: 'Low', afternoon: 'Medium', evening: 'High' },
    experience: { behaviour: 'Friendly', bargaining: true, familyFriendly: true, parking: 'Limited' },
    foodNearby: [
      { name: 'Dolma House', rating: 4.7, type: 'Tibetan / Momos & Thukpa' },
      { name: 'Woeser Bakery', rating: 4.5, type: 'Tibetan Bakery / Café' },
    ],
    nearbyPlaces: ['Civil Lines', 'ISBT Kashmere Gate', 'Coronation Park'],
    images: ['/images/markets/chandni-chowk-1.jpg'],
    featured: false,
    rating: 4.5,
    reviewCount: 7200,
    story: {
      established: '1960',
      famousShops: ['Dolma House Restaurant', 'Woeser Bakery', 'Thangka painting shops'],
      funFacts: [
        'Majnu Ka Tilla is home to Delhi\'s oldest Tibetan refugee settlement, established in 1960.',
        'The colony is named after a Sufi saint whose shrine stands at its entrance.',
        'It is one of the only places in India where you can eat authentic Tibetan cuisine cooked by Tibetan families.',
        'The annual Tibetan New Year (Losar) celebrations here attract visitors from across Delhi.',
      ],
      body: 'Majnu Ka Tilla is Delhi\'s most extraordinary pocket of cultural transplantation. Named after a revered Sufi saint, this riverside settlement became home to Tibetan refugees after 1959, when the Dalai Lama fled Tibet following the Chinese invasion. The refugees who arrived here built a community so vibrant and cohesive that sixty years later, Majnu Ka Tilla remains genuinely, authentically Tibetan. The narrow alleys are lined with restaurants serving real Tibetan food — not the mall-version momos that have spread across Delhi, but hand-folded dumplings filled with yak meat or mixed vegetables, served with fiery chilli sauce and accompanied by butter tea. Thangka paintings glow from shop windows, prayer flags flutter overhead, and the peaceful atmosphere of a monastic community permeates even the busy evening market.',
    },
    reviews: generateReviews('Majnu Ka Tilla', 'The most authentic momos and thukpa you will find outside Tibet.', 'the lanes can be confusing and parking outside is difficult'),
  },

  // ── PITAMPURA MARKET ─────────────────────────────────────────────────────────
  {
    slug: 'pitampura-market-delhi',
    name: 'Pitampura Market',
    tagline: "North-West Delhi's go-to for everyday shopping, electronics, and street food",
    city: 'Delhi',
    category: ['Fashion', 'Electronics', 'Grocery', 'Street Food'],
    famousFor: ['Budget Fashion', 'Electronics', 'Street Food', 'Daily Grocery'],
    priceRange: '₹',
    bestTimeToVisit: 'Open daily except Wednesday (Closed on Wednesday)',
    location: 'Pitampura, North-West Delhi',
    directions: {
      nearestMetro: 'Pitampura — Red Line',
      metroWalkTime: '5 min walk',
      autoRickshaw: true,
      tips: 'The Red Line metro makes this market extremely accessible from Rohini and Punjabi Bagh.',
    },
    crowd: { morning: 'Low', afternoon: 'Medium', evening: 'High' },
    experience: { behaviour: 'Friendly', bargaining: true, familyFriendly: true, parking: 'Available' },
    foodNearby: [
      { name: 'Evergreen Dhaba', rating: 4.3, type: 'North Indian / Thali' },
      { name: 'Pani Puri Corner', rating: 4.5, type: 'Street Food' },
    ],
    nearbyPlaces: ['Rohini', 'Shalimar Bagh', 'Netaji Subhash Place'],
    images: ['/images/markets/sarojini-1.jpg'],
    featured: false,
    rating: 4.1,
    reviewCount: 2900,
    story: {
      established: '1980s',
      famousShops: ['Electronics row', 'Budget clothing stalls', 'Evening chaat gully'],
      funFacts: [
        'Pitampura Market serves one of Delhi\'s densest residential clusters — Rohini, one of Asia\'s largest housing colonies, is nearby.',
        'The Red Line metro station directly at the market makes it one of the most metro-accessible neighbourhood markets.',
        'The market caters heavily to the middle-class families of North-West Delhi who prefer it over CP for everyday needs.',
        'Its electronics section is a local alternative to Nehru Place for basic gadget needs.',
      ],
      body: 'Pitampura Market is the dependable backbone of North-West Delhi\'s daily life. Serving the dense residential belt of Rohini, Shalimar Bagh, and Punjabi Bagh, it is the kind of market that functions without fanfare but couldn\'t be more essential. The market\'s character is resolutely practical — good electronics at fair prices, everyday fashion that doesn\'t aspire to trend-setting, reliable grocery shops, and the kind of chaatwalas who have been perfecting their panipuri water recipe for two decades. Evening here has a neighbourly warmth: families out for their daily stroll, students grabbing a quick snack, and shopkeepers who know their regulars by name. Pitampura is not a destination market — it is a community institution.',
    },
    reviews: generateReviews('Pitampura Market', 'Great everyday market with everything you need at honest prices.', 'it gets very crowded on evenings and weekends near the Metro exit'),
  },

  // ── LAXMI NAGAR MARKET ───────────────────────────────────────────────────────
  {
    slug: 'laxmi-nagar-market-delhi',
    name: 'Laxmi Nagar Market',
    tagline: "East Delhi's bustling trade hub — books, stationery, fashion, and food under one roof",
    city: 'Delhi',
    category: ['Books', 'Fashion', 'Electronics', 'Street Food'],
    famousFor: ['Competitive Exam Books', 'Budget Fashion', 'Street Food', 'Stationery'],
    priceRange: '₹',
    bestTimeToVisit: 'Open daily (Weekday mornings best)',
    location: 'Laxmi Nagar, East Delhi',
    directions: {
      nearestMetro: 'Laxmi Nagar — Blue Line',
      metroWalkTime: '3 min walk',
      autoRickshaw: true,
      tips: 'The Blue Line metro drops you right at the market. Perfect for students from East Delhi and UP.',
    },
    crowd: { morning: 'High', afternoon: 'High', evening: 'High' },
    experience: { behaviour: 'Average', bargaining: true, familyFriendly: true, parking: 'None' },
    foodNearby: [
      { name: 'Brijwasi Sweets', rating: 4.5, type: 'Sweets / Mithai' },
      { name: 'Aggarwal Chaat Corner', rating: 4.4, type: 'Street Food / Chaat' },
    ],
    nearbyPlaces: ['Nirman Vihar', 'Preet Vihar', 'East Delhi Hub'],
    images: ['/images/markets/chandni-chowk-2.jpg'],
    featured: false,
    rating: 4.2,
    reviewCount: 5600,
    story: {
      established: '1970s',
      famousShops: ['Arihant Publications (competitive exam books)', 'Uniform and stationery shops', 'Electronics row'],
      funFacts: [
        'Laxmi Nagar is one of India\'s leading markets for competitive examination books — serving IAS, CA, and engineering aspirants.',
        'The market is the commercial heart of East Delhi, serving Noida and Ghaziabad commuters who use the Blue Line.',
        'It was one of the first East Delhi markets to be directly served by a Metro station.',
        'The CA exam prep book market here is so specialized that it attracts students from across NCR.',
      ],
      body: 'Laxmi Nagar Market sits at the crossroads of East Delhi and the aspirations of millions of young Indians. The Blue Line Metro station deposits thousands of commuters and students here daily, and the market has evolved to serve both their everyday needs and their ambitions. The bookshops specializing in CA, IAS, and engineering entrance exam preparation are a signature feature — entire floors dedicated to the specific question banks, solved papers, and study guides that students from Uttar Pradesh, Bihar, and Uttarakhand rely on. Alongside this academic character runs a completely practical marketplace: budget fashion, affordable electronics, reliable grocery stores, and some of the best street food in East Delhi. Laxmi Nagar is a market with an identity — purposeful, energetic, and deeply connected to its community.',
    },
    reviews: generateReviews('Laxmi Nagar Market', 'Best place in Delhi for competitive exam books at the lowest prices.', 'it is extremely crowded all the time with no breathing space'),
  },

  // ── KIRTI NAGAR FURNITURE MARKET ─────────────────────────────────────────────
  {
    slug: 'kirti-nagar-furniture-market-delhi',
    name: 'Kirti Nagar Furniture Market',
    tagline: "India's largest furniture market — from raw wood to designer interiors, all under one address",
    city: 'Delhi',
    category: ['Furniture', 'Home Decor', 'Wholesale', 'Interior Design'],
    famousFor: ['Custom Furniture', 'Wholesale Wood', 'Interior Fittings', 'Designer Sofas', 'Modular Kitchens'],
    priceRange: '₹₹',
    bestTimeToVisit: 'Open daily except Monday (Closed on Monday)',
    location: 'Kirti Nagar, West Delhi',
    directions: {
      nearestMetro: 'Kirti Nagar — Green Line',
      metroWalkTime: '5 min walk',
      autoRickshaw: true,
      tips: 'Get a custom quote from at least 3 shops before committing. Bring dimensions for custom orders. Delivery can be negotiated.',
    },
    crowd: { morning: 'Medium', afternoon: 'High', evening: 'Medium' },
    experience: { behaviour: 'Friendly', bargaining: true, familyFriendly: true, parking: 'Available' },
    foodNearby: [
      { name: 'Shiv Shakti Dhaba', rating: 4.2, type: 'North Indian / Dhaba' },
    ],
    nearbyPlaces: ['Punjabi Bagh', 'Rajouri Garden', 'Tagore Garden'],
    images: ['/images/markets/lajpat-1.jpg'],
    featured: false,
    rating: 4.4,
    reviewCount: 4700,
    story: {
      established: '1960s',
      famousShops: ['Godrej furniture dealers', 'Custom wood workshop clusters', 'Modular kitchen showrooms'],
      funFacts: [
        'Kirti Nagar is India\'s largest furniture market, with over 3,000 shops in a single concentrated zone.',
        'Custom furniture ordered here typically costs 40-60% less than equivalent showroom-brand products.',
        'The market supplies furniture to hotels, hospitals, corporate offices, and homes across North India.',
        'Interior designers across Delhi maintain long-standing relationships with specific Kirti Nagar craftsmen.',
      ],
      body: 'Kirti Nagar Furniture Market is where Delhi rebuilds its homes. With over 3,000 shops spread across a dense commercial cluster, it is India\'s largest furniture market — a title it has held for decades. The market operates on a simple principle that has made it legendary: whatever you can imagine for your home, a craftsman here can build it. Custom sofas designed to your exact dimensions, dining tables in whatever wood and finish you choose, modular kitchen units built on-site — all at prices that make branded showrooms look absurd by comparison. Interior designers from across India quietly maintain their Kirti Nagar contacts, sourcing bespoke pieces here for premium projects. The sawdust in the air, the whine of carpentry tools, and the smell of varnish are the sensory signatures of a market that works with its hands.',
    },
    reviews: generateReviews('Kirti Nagar Furniture Market', 'Got a custom sofa set made at 50% of the showroom price — excellent quality.', 'delivery scheduling can be unreliable and requires follow-up'),
  },

  // ── GANDHI NAGAR TEXTILE MARKET ──────────────────────────────────────────────
  {
    slug: 'gandhi-nagar-textile-market-delhi',
    name: 'Gandhi Nagar Textile Market',
    tagline: "Delhi's own textile wholesale capital — the largest ready-made garment market in Asia",
    city: 'Delhi',
    category: ['Wholesale', 'Textiles', 'Fashion', 'Garments'],
    famousFor: ['Wholesale Garments', 'Ready-made Clothes', 'Fabrics', 'Festival Wear', 'Export Surplus'],
    priceRange: '₹',
    bestTimeToVisit: 'Weekday Mornings (Closed on Sunday)',
    location: 'Gandhi Nagar, East Delhi',
    directions: {
      nearestMetro: 'Gandhi Nagar — Blue Line',
      metroWalkTime: '8 min walk',
      autoRickshaw: true,
      tips: 'Buy in bulk for the best prices. Retailers and small shop owners find this market most useful. Carry cash.',
    },
    crowd: { morning: 'High', afternoon: 'High', evening: 'Medium' },
    experience: { behaviour: 'Average', bargaining: true, familyFriendly: false, parking: 'Limited' },
    foodNearby: [
      { name: 'Lala Ji Chole Bhature', rating: 4.5, type: 'Street Food / Breakfast' },
    ],
    nearbyPlaces: ['Laxmi Nagar', 'Nirman Vihar', 'Shahdara'],
    images: ['/images/markets/chandni-chowk-1.jpg'],
    featured: false,
    rating: 4.3,
    reviewCount: 3800,
    story: {
      established: '1960s',
      famousShops: ['Wholesale cloth traders', 'Ready-made garment exporters', 'Sari specialists'],
      funFacts: [
        'Gandhi Nagar is claimed to be the largest ready-made garment market in Asia.',
        'It supplies clothing to retailers across UP, Uttarakhand, Bihar, Jharkhand, and even Nepal.',
        'The market operates on an almost entirely cash economy with a complex system of trusted credit among wholesale traders.',
        'A single warehouse here can hold more fabric than a hundred retail shops combined.',
      ],
      body: 'Gandhi Nagar Market in Delhi is the textile wholesale capital of East Delhi. What began as a modest cloth market in the 1960s has expanded into a labyrinthine complex of warehouses, multi-storey shops, and loading docks that runs continuously during festival season. The market supplies fabric, sarees, and ready-made garments to thousands of retailers across UP, Bihar, and beyond. Walking through Gandhi Nagar is disorienting for the uninitiated — the sheer volume of fabric bolts stacked floor to ceiling, the speed at which transactions happen, and the specific vocabulary of the trade create a world unto itself.',
    },
    reviews: generateReviews('Gandhi Nagar Textile Market', 'Best wholesale garment prices in all of Delhi NCR — perfect for small business owners.', 'very confusing layout and not recommended for retail individual shoppers'),
  },

  // ── NAND NAGRI MARKET ─────────────────────────────────────────────────────────
  {
    slug: 'south-extension-market-delhi',
    name: 'South Extension Market',
    tagline: "South Delhi's premium fashion avenue — branded stores, jewellery, and curated dining",
    city: 'Delhi',
    category: ['Fashion', 'Luxury', 'Jewellery', 'Food & Dining'],
    famousFor: ['Branded Showrooms', 'Designer Jewellery', 'Premium Clothing', 'Fine Dining'],
    priceRange: '₹₹₹',
    bestTimeToVisit: 'Open daily except Tuesday (Closed on Tuesday)',
    location: 'South Extension Part I & II, South Delhi',
    directions: {
      nearestMetro: 'South Extension — Pink Line',
      metroWalkTime: '5 min walk',
      autoRickshaw: true,
      tips: 'Part I and Part II are separated by a road — both are worth visiting. Part II has more premium brands.',
    },
    crowd: { morning: 'Low', afternoon: 'Medium', evening: 'High' },
    experience: { behaviour: 'Friendly', bargaining: false, familyFriendly: true, parking: 'Limited' },
    foodNearby: [
      { name: 'Bengali Sweets', rating: 4.6, type: 'Sweets / Mishti Doi' },
      { name: 'Nathu\'s Sweets', rating: 4.5, type: 'Sweets / Chaat' },
    ],
    nearbyPlaces: ['Lajpat Nagar', 'Defence Colony', 'Dilli Haat'],
    images: ['/images/markets/lajpat-1.jpg'],
    featured: true,
    rating: 4.5,
    reviewCount: 5200,
    story: {
      established: '1960s',
      famousShops: ['Madura Fashion', 'PC Jeweller', 'Nathu\'s Sweets', 'Bombay Dyeing outlets'],
      funFacts: [
        'South Extension Part II has some of the highest commercial real estate rates in South Delhi.',
        'The market was one of the first in Delhi to attract international fashion brand flagships.',
        'Nathu\'s Sweets here has been a landmark Bengali sweet shop for over 50 years.',
        'The Pink Line Metro station has dramatically increased footfall in the last few years.',
      ],
      body: 'South Extension Market is South Delhi\'s fashion flagship — a two-part commercial strip that has been synonymous with premium retail since the 1960s. Part I leans toward jewellery and traditional wear, while Part II hosts international brand showrooms, premium apparel, and a dining scene that ranges from heritage sweet shops to modern cafes. The market has always attracted Delhi\'s upper-middle class for serious shopping: wedding jewellery, occasion wear, and branded everyday fashion. The arrival of the Pink Line Metro has brought in a younger, more diverse crowd, and the market has responded with new café formats and a more vibrant evening culture. South Extension remains, at its core, a market that believes shopping should feel like an occasion.',
    },
    reviews: generateReviews('South Extension Market', 'Best branded shopping experience in South Delhi — great variety.', 'prices are high and parking is a constant struggle'),
  },
];

async function run() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI as string);
  console.log('Connected!');

  const ReviewSchema = new mongoose.Schema({
    id: Number, author: String, avatar: String, rating: Number, date: String, text: String
  }, { _id: false });

  const MarketSchema = new mongoose.Schema({
    slug: { type: String, unique: true },
    name: String, tagline: String, city: String, category: [String], famousFor: [String],
    priceRange: String, bestTimeToVisit: String, location: String, directions: Object,
    crowd: Object, experience: Object, foodNearby: Array, nearbyPlaces: [String],
    images: [String], featured: Boolean, rating: Number, reviewCount: Number, story: Object,
    reviews: [ReviewSchema],
  });

  const Market = mongoose.models.Market || mongoose.model('Market', MarketSchema);

  let added = 0;
  let skipped = 0;

  for (const market of NEW_DELHI_MARKETS) {
    const existing = await Market.findOne({ slug: market.slug });
    if (existing) {
      console.log(`  → Already exists: ${market.name}`);
      skipped++;
    } else {
      await Market.create(market);
      console.log(`  ✅ Added: ${market.name}`);
      added++;
    }
  }

  console.log(`\nDone! Added: ${added} | Skipped (already exist): ${skipped}`);
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
