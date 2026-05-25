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

// Rich story data for every market
const STORIES: Record<string, {
  established?: string;
  famousShops?: string[];
  funFacts?: string[];
  body: string;
}> = {
  // ── DELHI ──────────────────────────────────────────────────────────────────

  'chandni-chowk-delhi': {
    established: '1650 AD',
    famousShops: ['Ghantewala Halwai (est. 1790)', 'Kinari Bazaar lace traders', 'Ballimaran opticians'],
    funFacts: [
      'Designed by Princess Jahanara, daughter of Emperor Shah Jahan, in 1650.',
      'The original layout had a canal running through the centre — Chandni (moonlight) reflected off this water, giving the market its name.',
      'It once had a Silver Market (Chandni Chowk literally means "Moonlit Crossroads of Silver Dealers").',
      'Street food here predates many modern restaurants — Paranthe Wali Gali has been serving stuffed parathas since the late 1800s.',
    ],
    body: 'Chandni Chowk is more than a market — it is a living, breathing museum of 370+ years of Delhi\'s soul. Commissioned by Mughal Emperor Shah Jahan and designed by his beloved daughter Princess Jahanara Begum, the original bazaar was bisected by a canal that shimmered like silver under the moon, earning it its luminous name. Today, that canal is gone, replaced by a thunderous river of rickshaws, pilgrims, and traders — but the centuries-old flavour remains intact. You can lose an entire day wandering through Kinari Bazaar\'s gold lace alleyways, descending into the underground electronics chaos of Bhagirath Palace, or simply standing at Paranthe Wali Gali while a fourth-generation cook fries a stuffed paratha on the same iron griddle his great-grandfather used. This is the market that has survived the Mughal Empire, the British Raj, the Partition, and countless Delhi summers — and it still opens every morning like clockwork.',
  },

  'sarojini-nagar-market': {
    established: '1950s',
    famousShops: ['Block C export surplus stalls', 'Friday evening seasonal pop-ups'],
    funFacts: [
      'Most clothes here are genuine export surplus — overruns from garment factories supplying international brands.',
      'The market is named after poet-politician Sarojini Naidu, known as the "Nightingale of India".',
      'Prices drop significantly in the last two hours before closing as vendors clear stock.',
      'Influencers and fashion bloggers have turned Sarojini "hauls" into a genre of content on Indian social media.',
    ],
    body: 'If Delhi had a mood board, it would be Sarojini Nagar on a Tuesday morning. Born in the 1950s as a neighbourhood market, it accidentally became one of India\'s most famous fashion destinations when garment export factories began offloading their surplus stock here. A crop top that would cost ₹2,500 in a mall? You\'ll find the same label, same stitching, for ₹250 here — if you are willing to hunt for it. The market has a rhythm: dedicated locals arrive by 10 AM to cherry-pick the fresh stock, tourists follow with cameras by noon, and the real bargaining frenzy peaks around sunset. Every Monday it closes to "recharge," and on Tuesday mornings, an entirely new wave of export goods floods in. Sarojini isn\'t just shopping — it\'s a sport, a social event, and a Delhi rite of passage.',
  },

  'janpath-market-delhi': {
    established: '1960s',
    famousShops: ['Tibetan Market stalls', 'Government Cottage Emporium (nearby)'],
    funFacts: [
      'The market grew organically when Tibetan refugees began selling handcrafted goods here after 1959.',
      'Janpath means "Path of the People" in Sanskrit — a deliberate contrast to the elite Rajpath (now Kartavya Path) it runs parallel to.',
      'Many top fashion designers quietly shop here for ethnic fabric and textile inspiration.',
      'The junk jewelry sold here frequently shows up on Bollywood sets as prop accessories.',
    ],
    body: 'Walk a hundred metres from the grand ceremonial axis of Rajpath and you enter a completely different Delhi: Janpath, the People\'s Path. The market owes its distinctive Tibetan flavour to 1959, when thousands of refugees from Tibet settled in Delhi following the Chinese invasion. They set up small stalls selling silver jewellery, prayer flags, and thangka paintings — and those stalls never left. Today, Janpath is a layered universe: Tibetan handicrafts rub shoulders with Rajasthani block-print fabric, Kashmiri shawls compete with synthetic Bohemian fashion, and leather bags are stacked next to incense cones. It is the favourite hunting ground for diplomats, expats, and design students who know that the most interesting things in Delhi are rarely in malls.',
  },

  'lajpat-nagar-central-market': {
    established: '1950s',
    famousShops: ['Anokhi (ethnic wear)', 'Moolchand Mithaiwala', 'Fabrics lanes in Block C'],
    funFacts: [
      'Named after freedom fighter Lala Lajpat Rai, "the Lion of Punjab".',
      'The market became a hub for Sindhi refugees who settled here after Partition in 1947.',
      'Its lehenga and fabric shops supply materials to small designers and tailors across India.',
      'Street food here — especially the famous momos, kathi rolls, and Sindhi-style sweets — has a devoted following.',
    ],
    body: 'Lajpat Nagar Central Market carries a history that goes deeper than bargains. After the Partition of 1947, thousands of Sindhi and Punjabi refugees settled in the surrounding colony, bringing with them a trader spirit, bold textile aesthetics, and a love of community commerce. The market that emerged reflects this DNA. Central Market is best known for its extraordinary fabric shops — rolls of raw silk, Banarasi brocade, Lucknawi chikankari, and synthetic digital-print fabric all compete for your attention in the same alley. Brides from across NCR come here for their wedding trousseau shopping. But beyond fabric, Lajpat Nagar is a food lover\'s dream: momos steamed in front of you, Sindhi koki flatbread, and the legendary Thursday street hawker market that sets up from noon.',
  },

  'dilli-haat-ina': {
    established: '1994',
    famousShops: ['State Craft Emporiums (all 28 Indian states represented)', 'Spice Garden Food Court'],
    funFacts: [
      'Dilli Haat was conceptualized by craft designer Jaya Jaitly to give artisans a direct market, cutting out middlemen.',
      'Stalls are rotated among registered artisans, meaning you get genuinely different craftspeople every two weeks.',
      'It replicates the format of a traditional "haat" (weekly village fair) in a permanent, urban setting.',
      'The food court serves authentic regional cuisines — from Manipuri Eromba to Goan Prawn Curry — which are nearly impossible to find elsewhere in Delhi.',
    ],
    body: 'Dilli Haat is an experiment that became an institution. Conceived in 1994 by craft activist Jaya Jaitly and architect Pradeep Sachdeva, its radical idea was simple: give every state of India its own permanent stall, rotate the craftspeople to keep the merchandise fresh, and charge visitors a small entry fee so artisans could earn fair wages without a middleman. The result is extraordinary. Dilli Haat is the only place in Delhi where you can buy a Kutchi embroidered jacket, a Kondapalli wooden toy, Manipuri handloom, and Nagaland bamboo craft — all within 200 metres. Every few weeks, a new wave of artisans arrives, sometimes from villages that have never had any other urban marketplace. For travellers with limited time in Delhi, Dilli Haat is the closest thing to a curated tour of Indian craftsmanship.',
  },

  'palika-bazaar-delhi': {
    established: '1978',
    famousShops: ['Underground electronics lanes', 'Sunglasses row', 'Connaught Place surrounding shops'],
    funFacts: [
      'Palika Bazaar is one of India\'s first underground shopping complexes — built beneath Connaught Place.',
      'It was designed by architect Raj Rewal and won architectural awards at its inauguration.',
      'The market has its own distinct microclimate — always cool underground, a blessing in Delhi summers.',
      'In the 1980s and 90s, it was famous for selling the first VCRs, Walkmans, and early mobile phones in Delhi.',
    ],
    body: 'Palika Bazaar exists in a different dimension — literally underground. Opened in 1978, this subterranean market sits beneath the famous Connaught Place roundabout, and descending its steps feels like entering a different era entirely. The market has always had a reputation for cutting-edge electronics at competitive prices: first it was VCRs and cassette players, then CDs and DVDs, now it\'s phone accessories, gaming peripherals, and smart gadgets. The narrow corridors are lined with hundreds of small shops, each barely the size of a walk-in closet, staffed by vendors who have the extraordinary ability to find any product you describe in under ten minutes. For bargain hunters, Palika is a maze of deals; for the claustrophobic, it is a test of nerve. Either way, it is one of Delhi\'s most uniquely atmospheric markets.',
  },

  'karol-bagh-market': {
    established: '1940s',
    famousShops: ['Ganesh Das & Sons (jewelry)', 'Roshan Di Kulfi (iconic dessert)', 'Ajmal Khan Road bridal strip'],
    funFacts: [
      'Karol Bagh is named after "Karol" a type of tree that once grew abundantly in the area.',
      'After Partition, the market transformed as Punjabi traders brought with them bold tastes for gold, textiles, and rich sweets.',
      'It has one of the highest densities of bridal wear and gold jewelry shops in Asia.',
      'The market lane near the Metro station is famous for having some of the best kulfi in North India.',
    ],
    body: 'Karol Bagh doesn\'t do anything quietly. Its bridal strip along Ajmal Khan Road is a corridor of fantasy: mannequins draped in heavily embroidered lehengas loom over the footpath, jewelry shops glow from the ground to the third floor, and the air carries the heavy scent of new fabric and rose attar. This is the market where Delhi prepares its daughters for marriage, where mothers spend weeks deliberating over the exact shade of gold for a necklace. Beyond weddings, Karol Bagh is also a serious electronics market and a no-nonsense books-and-stationery hub. It sits at the intersection of old-Delhi ambition and new-Delhi aspiration, and has been doing so since Punjabi traders set up shop here in the 1940s, turning a quiet residential block into the commercial powerhouse it is today.',
  },

  'kamla-nagar-market-delhi': {
    established: '1960s',
    famousShops: ['Bhatnagar Stores (textbooks)', 'Famous Chinese food lane', 'Budget kurti stalls near Gate 3'],
    funFacts: [
      'Kamla Nagar is the primary market serving Delhi University\'s North Campus and its 300,000+ student population.',
      'The market has one of the densest concentrations of bookshops and stationery stores in Delhi.',
      'It hosts an informal "paper market" during exam season where students sell and buy second-hand notes.',
      'The food lane here is legendary for momos, Chinese takeaway, and budget thalis frequented by generations of DU alumni.',
    ],
    body: 'Kamla Nagar Market is perpetually young — because its customers are. Serving the sprawling North Campus of Delhi University since the 1960s, this market has been the backdrop of innumerable student friendships, heartbreaks, and late-night book hunts. There is a particular rhythm to Kamla Nagar that shifts with the academic calendar: in July, it overflows with freshers buying stationery and college T-shirts; in November, it\'s all exam guides and second-hand textbooks; in May, the ice cream carts multiply and the food stalls stretch longer than usual. The fashion is student-affordable and trend-forward, the bookshops are dense and knowledgeable, and the Chinese food lane has achieved the kind of local mythologizing that only student nostalgia can create. Every DU alumni carries a Kamla Nagar memory.',
  },

  'nehru-place-it-market': {
    established: '1982',
    famousShops: ['Mikado Systems', 'Bhagwati Computers', 'Software piracy era relics turned into legitimate shops'],
    funFacts: [
      'Nehru Place was Asia\'s largest IT market in the 1990s, predating many Asian technology hubs.',
      'It was the unofficial birthplace of India\'s PC revolution — the first affordable computers in India were sold here.',
      'The market still handles over ₹2,000 crore in annual trade despite e-commerce competition.',
      'It has an informal "repair culture" — you can get almost any gadget repaired here for a fraction of brand service cost.',
    ],
    body: 'Before Flipkart and Amazon, there was Nehru Place. Built in 1982 as a commercial complex, it accidentally became the nerve centre of India\'s technology revolution. In the 1980s, when a personal computer cost more than a car, Nehru Place was where grey-market imports were sourced, assembled, and sold at prices ordinary people could actually afford. By the 1990s, it was Asia\'s largest IT market. The open-air plaza would buzz daily with software being copied on floppies, pirate CDs stacked in plain sight, and hardware dealers performing miracles of compatibility. Today the market has cleaned up considerably: licenses are checked, software is legit, and sophisticated enterprise hardware is sold alongside consumer gadgets. But its real superpower remains unchanged — the extraordinary density of knowledge. You can diagnose a hardware problem by describing it to three vendors in five minutes.',
  },

  'khari-baoli': {
    established: '17th Century',
    famousShops: ['Mehar Chand & Sons', 'Roopak Stores', 'Patanjali bulk suppliers'],
    funFacts: [
      'It is the largest spice market in Asia.',
      'Named after a step-well (Baoli) that once existed at this spot.',
      'The air in the market contains such concentrated spice particles that many workers wear face masks.',
      'Cardamom, saffron, and black pepper sold here are exported globally from this single market.',
    ],
    body: 'Operating since the 17th century, Khari Baoli is Asia\'s largest wholesale spice market. The moment you step near, the pungent, overwhelming aroma of chilies, cardamom, and turmeric hits your senses. It\'s a photographer\'s paradise and a chef\'s heaven. While it\'s primarily wholesale, tourists can buy smaller packets of exotic spices, dry fruits, and rare herbs. The market is named after a step-well that once provided water to the old city — today, the only thing overflowing here is spice.',
  },

  'chawri-bazaar': {
    established: '1840',
    famousShops: ['Mittals Wedding Cards', 'Standard Cards', 'Brass wholesale lanes'],
    funFacts: [
      'It was the first wholesale market of Old Delhi.',
      'Historically, it was a promenade for the wealthy and Mughal nobility.',
      'Today it prints more Indian wedding cards than any other single location in the country.',
      'The brass and copper trade here supplies metalwork to craftspeople across Rajasthan and UP.',
    ],
    body: 'Established in 1840, Chawri Bazaar is a specialized wholesale market for brass, copper, and paper products. Today, it is most famous across North India as the ultimate destination for wedding invitations. Entire streets are lined with shops selling thousands of intricate card designs. The extremely narrow lanes are heavily congested, but the chaos is part of the Old Delhi charm. If your relatives received an elaborate wedding card from a Delhi family in the last century, there is a very good chance it passed through Chawri Bazaar.',
  },

  'sadar-bazaar': {
    established: '17th Century',
    famousShops: ['Toy wholesale cluster near Gate 1', 'Imitation jewelry lanes'],
    funFacts: [
      'Sadar Bazaar is the largest wholesale market of household items in India.',
      'Most plastic toys sold across North India are sourced wholesale from here.',
      'A single block can contain shops selling only one type of item — e.g., an entire lane of just padlocks.',
      'The market predates modern Delhi — it was a trading post even in the Mughal era.',
    ],
    body: 'Sadar Bazaar is the largest wholesale market of household items in Delhi. It\'s a chaotic, massive labyrinth where you can find everything from cheap plastic toys to artificial jewelry, stationery, and kitchenware at rock-bottom wholesale prices. It\'s heavily congested and strictly for serious bargain hunters looking to buy in larger quantities. The market operates on the principle of volume — the more you buy, the more the price drops, sometimes to levels that seem physically impossible.',
  },

  'rajouri-garden': {
    established: '1980s',
    famousShops: ['Pacific Mall (adjacent)', 'Atul Chaat Corner', 'Designer boutique lanes'],
    funFacts: [
      'Rajouri Garden is where West Delhi comes to be seen.',
      'The market\'s proximity to two Metro lines (Blue and Pink) has made it one of the most accessible upscale markets in Delhi.',
      'Its café culture became a template for what Delhi\'s neighbourhood markets could aspire to be.',
      'The aloo tikki here has been voted among the best in Delhi by multiple food blogs.',
    ],
    body: 'Rajouri Garden main market is the upscale fashion destination of West Delhi. Unlike the wholesale chaos of Old Delhi, Rajouri offers a mix of high-end independent boutiques, designer bridal wear, and major brand showrooms. The market is also famous for its vibrant café culture and street food stalls serving iconic aloo tikki and golgappas. Since the Metro station opened here — serving both Blue and Pink lines — the footfall has tripled, and the market has responded with a wave of new cafés, dessert shops, and Instagram-worthy storefronts.',
  },

  'ghazipur-phool-mandi': {
    body: 'Ghazipur Phool Mandi is an early riser\'s paradise. Starting at 3 AM, the market becomes a vibrant, chaotic explosion of colors and fragrances. Suppliers from all over India, and even abroad (Thailand, Holland), bring tons of roses, orchids, lilies, and marigolds here. By 9 AM, the best stock is sold out. It is the primary source of flowers for Delhi\'s weddings and temples. Watching a truckload of Rajasthani marigolds unload next to Dutch tulips in the dark before dawn is one of Delhi\'s most surreal and beautiful experiences.',
    funFacts: [
      'The market processes an estimated 200–300 tonnes of flowers daily during wedding season.',
      'Dutch tulips and Thai orchids are imported and sold wholesale here every season.',
      'Flower prices here fluctuate dramatically — a dozen roses can be ₹20 at 4 AM and ₹150 by 10 AM.',
      'On Diwali eve, the market operates around the clock to meet demand for marigold decorations.',
    ],
  },

  // ── NOIDA ──────────────────────────────────────────────────────────────────

  'sector-18-market-noida': {
    established: '1990s',
    famousShops: ['Spice World (restaurant)', 'Bhartiya Lok Kala Mandal stalls', 'Electronic city shops'],
    funFacts: [
      'Sector 18 is often called the "Connaught Place of Noida".',
      'It houses the highest density of multiplexes and restaurants in the entire NCR outside Delhi.',
      'The underground parking here was one of the first large-scale underground facilities in any Indian suburb.',
      'It draws shoppers from UP cities like Agra and Lucknow who come specifically to Noida for weekend outings.',
    ],
    body: 'When Noida was being planned in the late 1970s and 1980s, Sector 18 was designated as the city\'s primary commercial zone — and it has exceeded every expectation. Today it is the beating heart of Noida\'s social and commercial life. The market\'s grid of streets contains everything from luxury brand showrooms and electronics stores to street food carts and jewellery hubs. At evenings and weekends, families from across UP and East Delhi descend here for cinema, food, and shopping. It has the infrastructure of a planned city market combined with the organic energy of a market that actually matters to real people. The weekends here have a carnival quality — lit up, loud, and thoroughly alive.',
  },

  'atta-market-noida': {
    established: '1985',
    famousShops: ['Atta Market chaat corners', 'Fabric stores near Sector 27 boundary', 'Electronics row'],
    funFacts: [
      '"Atta" market gets its informal name from the fact that it was originally just a grain market ("atta" means flour/grain).',
      'It is one of the oldest continuously operating markets in Noida, predating most of the city\'s modern development.',
      'Despite being surrounded by high-rises, the market maintains an old-town character that locals fiercely protect.',
      'The street food here — especially the imli chaat and freshly ground spice mixes — has loyal customers who drive 20 km just for it.',
    ],
    body: 'Atta Market wears its age with pride. While the rest of Noida has been rebuilt in glass and concrete, Atta Market has stubbornly remained a neighbourhood institution. It was one of the city\'s first commercial hubs, established before Noida had its current shape, and its name — casually derived from the grain shops that once dominated — is a reminder of simpler times. Today, Atta is a practical, no-nonsense market: good fabric stores, reliable electronics, solid street food, and the kind of grocery shops where the owner has been serving the same families for thirty years. In the evenings, the chaat stalls light up and the entire market becomes a meeting point for Sector 27, 18, and 6 residents. It is the most Noida thing in Noida.',
  },

  'brahmaputra-market-noida': {
    established: '1990s',
    famousShops: ['Sector 29 restaurant row', 'Weekday morning vegetable market'],
    funFacts: [
      'Brahmaputra Market is the primary daily-needs hub for residents of Sectors 27, 28, 29, and 30.',
      'It has a morning avatar (groceries and vegetables) and an evening avatar (restaurants and socializing) — two different markets in one.',
      'The sector 29 restaurant row adjacent to the market has become one of NCR\'s most popular Friday-night dining destinations.',
      'Weekend brunch culture has exploded here in the last five years with multiple new cafes opening.',
    ],
    body: 'Brahmaputra Market leads a double life. In the mornings, it is a workhorse — fresh vegetables, dairy, groceries, and the daily provisions that keep the surrounding sectors running. By evening, it transforms into Noida\'s favourite hangout zone. The restaurant strip along Sector 29 — which bleeds organically from the market — is one of NCR\'s most beloved food destinations, serving everything from North Indian thalis to wood-fired pizzas. This morning-to-night duality makes Brahmaputra unlike any other Noida market. Come before 8 AM for the freshest produce; come after 7 PM for the most sociable dining experience in the city. The market doesn\'t just serve Noida — it holds it together.',
  },

  // ── GURGAON ────────────────────────────────────────────────────────────────

  'sadar-bazaar-gurgaon': {
    established: 'Pre-independence',
    famousShops: ['Cloth merchants of Old Gurgaon', 'Steel and hardware wholesale lanes'],
    funFacts: [
      'Sadar Bazaar Gurgaon predates the city itself — it was trading post before Gurgaon became a planned metropolis.',
      'The old market is surrounded by the historic core of Gurgaon, where the original villages of the region were located.',
      'Despite Gurgaon\'s image as a corporate city, this market maintains a deeply traditional character.',
      'It is the primary wholesale source for small businesses and retailers across old Gurgaon.',
    ],
    body: 'While global corporations have built their Indian headquarters in the gleaming towers of Cyber City, Sadar Bazaar Gurgaon quietly continues a commercial tradition that predates the entire modern city. This is old Gurgaon — the original settlement around which the current metropolis grew. The market\'s narrow lanes hold wholesale cloth merchants, steel suppliers, hardware dealers, and spice shops that have been family-run for generations. It is a reminder that before Gurgaon became "Millennium City," it was just a town with a market. Walking through Sadar Bazaar is like finding the soul of a city that has otherwise completely reinvented itself.',
  },

  'jacobpura-market-gurgaon': {
    established: '1980s',
    famousShops: ['Morning vegetable wholesale', 'Budget fashion stalls', 'Bicycle repair lane'],
    funFacts: [
      'Jacobpura is one of Gurgaon\'s most densely populated residential areas, and the market reflects this density.',
      'The market is named after the British-era "Jacob" — a reference to its colonial-period roots.',
      'It operates as an informal wholesale point for small grocery stores across old Gurgaon.',
      'The morning market here starts at 5 AM, making it one of the earliest-opening markets in NCR.',
    ],
    body: 'Jacobpura Market is the market Gurgaon\'s glossy guidebooks never mention, and that is precisely why it is worth visiting. This is where actual Gurgaon residents — not corporate employees in tower offices — do their real shopping. The streets are narrow, the shops are dense, and the prices are honest. A morning visit here, when vegetable vendors are arranging fresh produce from Mandi Haryana, reveals a city that exists completely separately from the Cyber City image. There is a real neighbourhood here, with relationships between shopkeepers and regulars built over decades. Jacobpura is not glamorous. It is genuine.',
  },

  'sector-14-market-gurgaon': {
    established: '1990s',
    famousShops: ['Branded showrooms row', 'The Kitchen restaurant strip', 'Electronics zone'],
    funFacts: [
      'Sector 14 Market is often described as Gurgaon\'s first "modern" market — built with wider roads and planned layout.',
      'It has witnessed three decades of Gurgaon\'s transformation from a small town to a global city.',
      'The market\'s rooftop restaurants have become popular among Gurgaon\'s young professional population.',
      'It is equidistant from three major residential sectors, making it perpetually busy throughout the day.',
    ],
    body: 'Sector 14 Market occupies a unique position in Gurgaon\'s history: it was built precisely at the moment when the city was beginning its transformation from a sleepy Haryana town into a corporate powerhouse. That moment is frozen in its architecture — wide, planned streets, organized shop fronts, and a layout that seems designed for the aspirational. Today, the market serves Gurgaon\'s mixed population of longtime residents and corporate transplants with equal confidence. Branded showrooms sit next to traditional sweet shops; rooftop restaurants overlook budget vegetable vendors. It is a market that has managed to be everything to everyone over thirty years of a city\'s tumultuous growth.',
  },

  // ── FARIDABAD ──────────────────────────────────────────────────────────────

  'old-faridabad-market': {
    established: 'Pre-independence',
    famousShops: ['Steel and industrial parts dealers', 'Traditional sweet shops', 'Cloth merchants of Purani Faridabad'],
    funFacts: [
      'Faridabad is one of the oldest cities in the NCR — it was founded in 1607 by Mughal Emperor Jahangir\'s treasurer.',
      'The old market was historically a trading post on the route between Delhi and Agra.',
      'Industrial Faridabad (one of India\'s most important manufacturing hubs) grew around this original commercial core.',
      'The market still supplies industrial parts and hardware to Faridabad\'s manufacturing belt.',
    ],
    body: 'Old Faridabad Market carries within it the memory of a city much older than its industrial reputation suggests. Founded in 1607 as a trading post by the treasurer of Mughal Emperor Jahangir, Faridabad was a stop on the ancient Delhi-Agra route. The market that grew around this crossroads has evolved over four centuries — from a Mughal-era caravanserai stop to a British colonial trading post to the industrial supply hub it is today. The heavy industrial character of Faridabad (a city of factories, machine tools, and manufacturing) has shaped this market in ways you can literally smell and hear: machinery parts, welding fumes, and the ring of metalwork are never far away. But amid the industrial grit, traditional cloth merchants and sweet shops hold their ground.',
  },

  'neelam-bata-market-faridabad': {
    established: '1980s',
    famousShops: ['Bata flagship store (gives market its name)', 'Neelam Cinema (now mall) corridor', 'Street food gully'],
    funFacts: [
      'The market takes its name from the famous Bata shoe company, which had a major factory and showroom in Faridabad.',
      'Bata\'s Faridabad factory was one of its earliest in India — the city was chosen for its proximity to Delhi and cheap industrial land.',
      'Neelam Bata is Faridabad\'s most recognizable commercial address, familiar to every city resident.',
      'The street food here — particularly the chaat and jalebi — is considered among the best in Haryana.',
    ],
    body: 'Neelam Bata Market is Faridabad\'s most famous commercial landmark, and its name tells the story of the city\'s industrial character. The "Bata" in the name refers to the Czech-founded shoe company that set up one of its first Indian factories in Faridabad, making the brand so synonymous with the city that an entire market took its name. Today, the market has grown far beyond shoes — it is Faridabad\'s premier shopping destination, with clothing stores, electronics, restaurants, and the kind of street food that locals are aggressively proud of. The jalebi and chaat vendors who operate near the old cinema complex have been serving their recipes across generations. Neelam Bata is where Faridabad comes to celebrate, shop, and socialise.',
  },

  // ── GHAZIABAD ──────────────────────────────────────────────────────────────

  'gandhi-nagar-market-ghaziabad': {
    established: '1960s',
    famousShops: ['Wholesale cloth traders', 'Ready-made garment exporters', 'Sari specialists'],
    funFacts: [
      'Gandhi Nagar is one of the largest wholesale textile markets in North India.',
      'It supplies fabric and garments to retailers across UP, Uttarakhand, Bihar, and even Nepal.',
      'The market operates on an almost entirely cash economy with a complex system of trusted credit among wholesale traders.',
      'A single warehouse here can hold more fabric than a hundred retail shops.',
    ],
    body: 'Gandhi Nagar Market in Ghaziabad is the textile wholesale capital of western Uttar Pradesh. What began as a modest cloth market in the 1960s has expanded into a labyrinthine complex of warehouses, multi-storey shops, and loading docks that runs 24 hours during festival season. The market supplies fabric, sarees, and ready-made garments to thousands of retailers across UP, Bihar, and beyond. Walking through Gandhi Nagar is disorienting for the uninitiated — the sheer volume of fabric bolts stacked floor to ceiling, the speed at which transactions happen, and the specific vocabulary of the trade (cuts, running metres, GSM, shedding) create a world unto itself. Retail shoppers are welcome but will find that the market really blooms when you know what you\'re looking for.',
  },

  'lal-kuan-market-ghaziabad': {
    established: '1950s',
    famousShops: ['Hardware wholesale lanes', 'Electrical fittings suppliers', 'Plumbing wholesale zone'],
    funFacts: [
      'Lal Kuan is the primary wholesale hardware market for the entire Ghaziabad-Meerut industrial corridor.',
      '"Lal Kuan" means "Red Well" — named after a historic well with red-brick construction that once stood here.',
      'It supplies building materials to construction projects across western UP.',
      'The market is busiest at 6–9 AM when contractors and construction supervisors arrive to source their day\'s materials.',
    ],
    body: 'Lal Kuan Market is where Ghaziabad builds itself. This wholesale hardware and construction materials market has been the supply backbone of the city\'s relentless expansion for over sixty years. Every high-rise in Ghaziabad, every road, every residential colony has, in some way, passed through the hands of a Lal Kuan trader. The market opens at dawn — contractors arrive early, consult with suppliers, negotiate, and load their trucks before the city\'s traffic makes movement impossible. Walking through Lal Kuan is a sensory experience: the smell of fresh metal, stacks of PVC pipes in every diameter, electrical conduits in coils, and ceramic tiles sampling rooms that would put some showrooms to shame. It is not glamorous, but it is essential.',
  },

  'navyug-market-ghaziabad': {
    established: '1970s',
    famousShops: ['Student book shops near Degree College', 'Seasonal fashion stalls', 'Evening food market'],
    funFacts: [
      'Navyug Market is Ghaziabad\'s most accessible daily shopping destination, serving multiple adjacent residential sectors.',
      '"Navyug" means "New Era" in Hindi — the market was named to reflect the optimism of newly independent India\'s urban planning.',
      'The market has a particularly strong student presence due to its proximity to several colleges.',
      'Its evening food scene, with chaats, rolls, and juices, is considered one of the best in old Ghaziabad.',
    ],
    body: 'Navyug Market — "New Era Market" — was built in an era of post-independence optimism, when India\'s planners were designing functional, accessible commercial spaces for the new urban citizen. The name may sound grand, but the market itself is resolutely practical: good bookshops, affordable clothing, reliable grocery stores, and an evening food culture that is the pride of the surrounding neighbourhoods. Students from nearby colleges have made it their own — afternoons here have an energy that is half academic, half social, wholly chaotic. The chaat and street food vendors who operate after 5 PM have perfected their recipes over decades, and the tamarind-heavy golgappas here have a devoted following that stretches across the city.',
  },

  // ── ADDITIONAL DELHI MARKETS ────────────────────────────────────────────────

  'gaffar-market-delhi': {
    established: '1980s',
    famousShops: ['Mobile accessory lanes', 'Second-hand phone dealers', 'Smartwatch and earphone stalls'],
    funFacts: [
      'Gaffar Market is one of the largest grey-market electronics hubs in Asia.',
      'It is unofficially known as "the market where everything has a twin" — authentic and replicas sold side by side.',
      'Before online shopping, Gaffar was the only place in Delhi you could find the latest international gadgets.',
      'The market operates in multiple underground floors, each specializing in different electronics categories.',
    ],
    body: 'Gaffar Market in Karol Bagh is Delhi\'s most audacious electronics market — a sprawling, multi-storey labyrinth where the line between original and copy is deliberately blurred, and knowing your products is your only protection. What began as a modest secondhand electronics lane in the 1980s has evolved into a complex that spans multiple levels, with each floor operating as an ecosystem for a specific category: one floor for mobile phones, another for gaming accessories, another for smartwatches and audio gear. Before Flipkart and Amazon disrupted everything, Gaffar Market was where Delhi came for the newest gadgets — often months before official launch. The market has adapted to the e-commerce era by doubling down on what algorithms can\'t offer: the ability to touch, test, haggle, and walk away with something in hand. Come with cash, come with knowledge, and keep your receipts.',
  },

  'khan-market-delhi': {
    established: '1951',
    famousShops: ['Bahrisons Booksellers (est. 1953)', 'The Big Chill Café', 'Khan Chacha (kebabs)'],
    funFacts: [
      'Khan Market consistently ranks as the most expensive retail real estate in India and among the top 20 globally.',
      'It was established in 1951 to rehabilitate traders displaced from Rawalpindi (now Pakistan) after Partition.',
      'Named after Khan Abdul Jabbar Khan, a Pashtun politician from British India.',
      'Bahrisons Booksellers, established here in 1953, has hosted some of India\'s most celebrated literary events.',
    ],
    body: 'Khan Market is one of the most deceptive addresses in India. Its real estate value per square foot rivals Bond Street in London, yet it maintains the intimate scale of a neighbourhood market. Established in 1951 to provide livelihoods for Partition-era refugees from Rawalpindi, it has transformed across seven decades into the preferred shopping and dining destination of Delhi\'s political class, diplomatic community, and intellectual elite. The market\'s bookshops — particularly the legendary Bahrisons — have witnessed the autographs of presidents and prime ministers. Its restaurants serve some of Delhi\'s most refined cuisine. And yet, alongside a ₹600 cup of coffee from a European-style café, you\'ll find a ₹20 chai from a vendor who has been there longer than anyone can remember. Khan Market contains multitudes, and it does so without effort.',
  },

  'connaught-place-delhi': {
    established: '1933',
    famousShops: ['Wengers (bakery, est. 1926)', 'The Oxford Bookstore', 'Brand flagship stores around Inner Circle'],
    funFacts: [
      'Connaught Place was designed by British architect RobertTor Russell and named after Prince Arthur, Duke of Connaught.',
      'The underground Palika Bazaar sits directly beneath its central park — making CP Delhi\'s only market with two layers.',
      'It is one of the few places in Delhi with a genuinely walkable, pedestrian-friendly circular layout.',
      'Post-independence, it was renamed "Rajiv Chowk" but locals still call it CP.',
    ],
    body: 'Connaught Place was designed in the 1930s as the commercial crown of British New Delhi — a grand Georgian-style colonnade arranged in concentric circles around a manicured central park. Nearly a century later, it remains Delhi\'s most cosmopolitan marketplace. The white colonnades now house everything from luxury brands and international chains to historic bakeries that predate Independence. Wengers, the legendary bakery, has been baking pastries on these corridors since 1926 — before Connaught Place was even finished. The Palika Bazaar thrums in the underworld beneath your feet, the Metro station below is the busiest in all of India, and above ground, the streets fill every evening with students, office workers, tourists, and street performers. CP is not just a market — it is Delhi\'s living room.',
  },

  'cyber-hub-gurugram': {
    established: '2013',
    famousShops: ['Farzi Café', 'Social (bar & restaurant)', 'Warehouse Café'],
    funFacts: [
      'Cyber Hub was developed by DLF and opened in 2013 as India\'s first "food and entertainment hub" within a corporate park.',
      'It serves over 50,000 visitors on a typical weekend evening.',
      'The outdoor promenade design was inspired by European pedestrian food streets.',
      'Cyber Hub hosts over 80 food and beverage outlets — one of the highest concentrations of premium dining in India.',
    ],
    body: 'Cyber Hub is the market that Gurgaon invented for itself — a city born in the corporate age, it needed a marketplace to match. Opened in 2013 as part of DLF Cyber City (India\'s largest commercial real estate hub), Cyber Hub is a gleaming open-air promenade lined with over 80 premium restaurants, bars, and cafes. On Friday and Saturday evenings, the Hub transforms into one of NCR\'s most energetic social scenes: thousands of young professionals overflow from office towers directly into its bars, live music spills from open terraces, and every cuisine from Korean barbecue to Lucknowi kebabs competes for attention. Cyber Hub is not a traditional market by any measure — there are no bargains here, no wholesale sections, no haggling. It is something India\'s rapidly urbanizing cities needed: a premium public social space that works.',
  },

  'bhagirathi-palace-delhi': {
    established: '1947',
    famousShops: ['Electrical fittings wholesale lanes', 'LED and lighting suppliers', 'Generator and cable dealers'],
    funFacts: [
      'Bhagirathi Palace is the largest wholesale market for electrical goods in Asia.',
      'It was established immediately after Partition by traders who migrated from Lahore and Rawalpindi.',
      'The market handles an estimated ₹3,000 crore in annual electrical goods trade.',
      'Almost every building constructed in North India in the last 50 years has electrical components sourced from here.',
    ],
    body: 'Bhagirathi Palace — locally known as Batti Market — is where Delhi\'s electrical universe begins. Established in 1947 by traders fleeing Partition violence in Lahore and Rawalpindi, this market in Chandni Chowk has grown into the largest wholesale electrical goods market in Asia. The warren of lanes is a sensory overload: thousands of lightbulbs hang like constellations, cables coil in every diameter and colour, transformer parts are stacked to the ceiling, and the air smells of hot metal and insulation. If a building was constructed anywhere in North India in the last half-century, its wiring, switches, fans, and lights almost certainly passed through Bhagirathi Palace\'s supply chain. Electricians, contractors, interior designers, and engineers make pilgrimages here for prices that no retailer can match. It is the market that powers everything.',
  },

  'vaishali-market-ghaziabad': {
    established: '2000s',
    famousShops: ['Vaishali Metro Market food stalls', 'Branded apparel zone', 'Electronics plaza'],
    funFacts: [
      'Vaishali was one of the first planned residential-commercial townships developed on the Delhi-UP border.',
      'The market serves one of Ghaziabad\'s most educated and affluent residential catchments.',
      'Its proximity to the Metro (Vaishali terminal station) made it a major commercial draw from the day the line opened.',
      'The area has seen a surge in café culture and co-working spaces in the last few years.',
    ],
    body: 'Vaishali Market sits at the very edge of Delhi\'s reach — a meticulously planned township on the UP border that has grown into one of Ghaziabad\'s most aspirational shopping destinations. The market anchors an upscale residential catchment of IT professionals, corporate employees, and new-age entrepreneurs who want the convenience of a township market with the sophistication of a Delhi shopping experience. The Metro connection at Vaishali\'s terminal station has been transformative: it brought the entire Delhi consumer base within reach and gave the market an influx of shoppers from across the Blue Line corridor. Today, Vaishali Market is a layered destination: branded clothing, reliable electronics, a café row that has developed its own weekend brunch culture, and street food vendors who have learned exactly what this particular neighbourhood wants.',
  },
};

async function run() {
  console.log('Connecting to MongoDB...');
  await mongoose.connect(MONGODB_URI as string);
  console.log('Connected!');

  const MarketSchema = new mongoose.Schema({
    slug: { type: String, unique: true },
    name: String, tagline: String, city: String, category: [String], famousFor: [String],
    priceRange: String, bestTimeToVisit: String, location: String, directions: Object,
    crowd: Object, experience: Object, foodNearby: Array, nearbyPlaces: [String],
    images: [String], featured: Boolean, rating: Number, reviewCount: Number, story: Object,
    reviews: Array,
  });
  const Market = mongoose.models.Market || mongoose.model('Market', MarketSchema);

  let updated = 0;
  let skipped = 0;
  let notFound = 0;

  for (const [slug, story] of Object.entries(STORIES)) {
    const market = await Market.findOne({ slug });
    if (!market) {
      console.log(`  ⚠ Not found in DB: ${slug}`);
      notFound++;
      continue;
    }
    if (market.story && market.story.body) {
      // Already has a story — enrich with fun facts and famous shops if missing
      let changed = false;
      if ((!market.story.funFacts || market.story.funFacts.length === 0) && story.funFacts) {
        market.story.funFacts = story.funFacts;
        changed = true;
      }
      if ((!market.story.famousShops || market.story.famousShops.length === 0) && story.famousShops) {
        market.story.famousShops = story.famousShops;
        changed = true;
      }
      if (!market.story.established && story.established) {
        market.story.established = story.established;
        changed = true;
      }
      if (changed) {
        await Market.updateOne({ slug }, { $set: { story: market.story } });
        console.log(`  ✓ Enriched: ${market.name}`);
        updated++;
      } else {
        console.log(`  → Already complete: ${market.name}`);
        skipped++;
      }
    } else {
      // No story — add it
      await Market.updateOne({ slug }, { $set: { story } });
      console.log(`  ✅ Added story: ${market.name}`);
      updated++;
    }
  }

  console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}, Not found: ${notFound}`);
  process.exit(0);
}

run().catch((e) => { console.error(e); process.exit(1); });
