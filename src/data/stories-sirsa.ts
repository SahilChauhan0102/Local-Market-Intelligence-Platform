import type { MarketStory } from '@/types/market';

const stories: Record<string, MarketStory> = {

  'sirsa-main-market': {
    established: '1950s',
    famousShops: [
      'Sharma Electronics — trusted for appliances since 1972',
      'Goyal Cloth House — finest fabrics in Sirsa for 50+ years',
      'Batra Sweets — famous for milk cake and gujiya',
      'Singh Hardware Store — the go-to for every household fix',
    ],
    funFacts: [
      'The market sits around Sirsa\'s iconic Clock Tower, built in the 1940s.',
      'On Sundays, vegetable sellers double and the crowd triples by 8AM.',
      'Locals call it "Ghanta Ghar Bazaar" after the clock tower at its heart.',
    ],
    body: `Sirsa Main Market is the beating heart of this proud Haryanvi city. Spread around the landmark Clock Tower — locally called Ghanta Ghar — this market has been serving Sirsa residents since the town began developing post-Independence. What started as a small cluster of general stores in the 1950s gradually grew into the city's most important commercial hub, with everything from fresh produce to electronics now available under one busy sky.\n\nThe market is an experience in itself. Cycle-rickshaws weave between pedestrians, vendors shout their best prices, and the smell of freshly fried jalebis drifts from the sweet shops. Despite modern malls appearing on the city's outskirts, Sirsa Main Market refuses to slow down — in fact, footfall has only grown over the decades.\n\nThe cloth section is particularly famous. Families travel from surrounding villages on wedding seasons to pick fabrics here, knowing they'll get better variety and value than anywhere else. Electronics shops line the northern stretch, while the southern end is dominated by spice sellers and grain wholesalers.\n\nIf you arrive on a Wednesday — the weekly bazaar day — expect double the energy, double the sellers, and double the bargains. The market truly comes alive then, transforming into something that feels less like shopping and more like a community festival.`,
  },

  'rania-bazaar': {
    established: '1920s',
    famousShops: [
      'Rania Kapda Market — entire lane dedicated to fabrics',
      'Chaudhary General Store — open since 1941',
      'Khan Shoe House — handmade mojaris and chappals',
    ],
    funFacts: [
      'Rania town is historically known for its annual cattle fair, one of Haryana\'s oldest.',
      'The bazaar operates as a weekly haat on Tuesdays that draws nearby villages.',
      'During harvest season, the market spills onto the main road for nearly 500 metres.',
    ],
    body: `Rania Bazaar is a textbook example of a traditional North Indian town market — raw, unfiltered, and deeply rooted in the agricultural rhythms of Haryana. Rania itself is a small town, but its market punches well above its weight, drawing traders and shoppers from dozens of surrounding villages every week.\n\nThe bazaar traces its origins to the early 1920s when Rania served as a key transit point on local trade routes. Cotton, wheat, and mustard from the nearby fields would pass through, and naturally, a market ecosystem grew around this flow of goods. Over time, cloth merchants, shoe-makers, and general stores established permanent shops, forming the compact but vibrant bazaar you see today.\n\nThe weekly Tuesday haat is the main event. From early morning, vegetable sellers, fruit vendors, and cloth traders set up temporary stalls that stretch the full length of the main street. Local farmers sell directly to consumers here — no middlemen — which means incredibly fresh produce at rock-bottom prices.\n\nRania Bazaar has a very different personality from city markets. Shopkeepers know most of their customers by name. Bargaining is almost expected, and the atmosphere stays genuinely warm. The shoe section is a hidden gem — local cobblers still make traditional Haryanvi mojaris to order, a craft that's disappearing elsewhere. Come with time and patience, and you'll leave with stories as well as good deals.`,
  },

  'anaj-mandi-sirsa': {
    established: '1940s',
    famousShops: [
      'Bansal Grain Traders — one of Sirsa\'s oldest wholesale families',
      'Aggarwal Dal Mill — supplying pulses across Haryana',
      'Sharma Masala Wale — hand-ground spices, legendary in the region',
    ],
    funFacts: [
      'During wheat season, the mandi handles over 50,000 quintals of grain daily.',
      'The weighing stones (kanta) used here are calibrated by government inspectors every 3 months.',
      'Sirsa district is one of Haryana\'s top wheat and cotton producing regions.',
    ],
    body: `The Anaj Mandi, or Grain Market, of Sirsa is far more than just a place to buy rice and wheat — it is the economic engine of an entire agricultural district. This sprawling wholesale market was formally established in the 1940s and today handles hundreds of thousands of quintals of grains, pulses, and spices every year, feeding not just Sirsa but supplying traders across Haryana, Punjab, and Rajasthan.\n\nEarly mornings at the mandi are electric. By 6AM, bullock carts and tractors loaded with freshly harvested wheat or mustard line up outside. Arhtiyas — commission agents who have worked these lanes for generations — negotiate deals in rapid-fire Haryanvi. The smell of raw grain, dust, and mustard oil blends into something uniquely North Indian.\n\nThe spice section is a sensory revelation. Traders here stock everything from ordinary turmeric to rare dried fenugreek leaves sourced directly from farms. Many city restaurants send their staff here to buy in bulk, knowing the quality is unmatched.\n\nThe mandi has its own social ecosystem — a chai stall that has operated since the 1960s, an afternoon lunch spot famous for dal-baati, and a small temple where traders offer prayers before closing deals. Despite the arrival of online agricultural platforms, Sirsa's Anaj Mandi continues to hold its own because trust, built over generations, cannot be replaced by an app.`,
  },

  'sabzi-mandi-sirsa': {
    established: 'Early 1960s',
    famousShops: [
      'Ram Lal Vegetable Wala — here since before most shoppers were born',
      'Devi Fruit Corner — known for hand-picked seasonal fruits',
    ],
    funFacts: [
      'The mandi receives fresh stock from farms as early as 4AM.',
      'Onion prices here are often used as an informal inflation indicator by locals.',
      'During winter, the market is dominated by mustard greens (sarson) and radishes.',
    ],
    body: `Sirsa's Sabzi Mandi is where the city's day truly begins. Long before office-goers are awake, farmers and vendors are already at work — unloading crates of tomatoes, stacking towers of cauliflower, and arranging pyramids of seasonal fruit under the yellow glow of tube lights. By 6AM, this market is in full swing; by noon, it is nearly empty and preparing for the next morning's stock.\n\nThe mandi serves a dual role: it operates as both a wholesale point for restaurant and hotel buyers in the early morning, and as a retail bazaar for households from around 8AM onwards. This means early risers get restaurant-grade produce at wholesale prices — a fact that regular shoppers have quietly exploited for years.\n\nSeasonal rhythms define this place. Summer brings watermelons so large they require two hands to carry. Autumn arrives with guavas that locals swear are the sweetest in the state. Winters are all about the glorious sarson ka saag season — mountains of mustard leaves piled high, waiting to be transformed into Haryana's most iconic dish.\n\nVendors here are characters in their own right. Old Ram Lal has sold vegetables from the same spot for over four decades, greeting regulars by name and sometimes throwing in an extra bunch of coriander "for the children." This personal touch — completely absent in supermarkets — is exactly why the Sabzi Mandi continues to thrive.`,
  },

  'hanumangarh-road-market': {
    established: 'Mid 1970s',
    famousShops: [
      'Jain Hardware Palace — everything for construction and repair',
      'Electrical Depot Sirsa — wiring, fittings, and switchgear',
      'Plumber\'s Corner — tools and spare parts for plumbers',
    ],
    funFacts: [
      'This is the only market in Sirsa open at 7AM for contractors starting early jobs.',
      'During the cotton gin season, demand for mechanical parts spikes significantly.',
      'Local contractors say you can source any obscure pipe fitting within a 10-minute search here.',
    ],
    body: `Hanumangarh Road Market is Sirsa's no-nonsense trade street — where builders, farmers, plumbers, and electricians come to get the job done. Unlike the colourful chaos of the main bazaar or the aroma-filled lanes of the spice market, this stretch is defined by the metallic clang of tools, the smell of machine oil, and the businesslike efficiency of traders who know exactly what their customers need.\n\nThe market grew organically along the Hanumangarh Road corridor in the mid-1970s as Sirsa began expanding and construction activity picked up. What started with a few hardware shops quickly attracted electricians' suppliers, plumbing wholesalers, and agricultural machinery parts dealers — creating a one-stop destination for anyone running a trade in the region.\n\nThe market's clientele is almost entirely professional. Contractors arrive early morning to collect materials before their workers reach job sites. Farmers come in for spare parts for their irrigation pumps and tractors. Electricians browse for switchgear and wiring. There is very little retail browsing here — almost every visit has a purpose.\n\nWhat makes this market special is the depth of its inventory. Ask for a specific bolt size, an obscure pipe fitting, or a replacement part for a 1990s water pump, and chances are someone in this market has it. This encyclopaedic stock — built up over decades — is what keeps Hanumangarh Road Market indispensable to Sirsa's working economy.`,
  },

  'dhobiana-bazaar': {
    established: 'Late 1960s',
    famousShops: [
      'Makkhan Lal Chaat Corner — iconic golgappe and chaat since 1971',
      'Sindhi Sweet House — famous for sohan halwa and barfi',
      'Haryanvi Dhaba Row — five dhabas serving authentic local food',
    ],
    funFacts: [
      'Named after the "dhobi" (washerman) community that historically settled here.',
      'Evening crowds here rival the main market despite being a smaller lane.',
      'The chaat here uses a secret tamarind chutney recipe passed down for three generations.',
    ],
    body: `Dhobiana Bazaar is Sirsa's favourite hangout — a place where students, families, and office workers converge every evening for one purpose: food. This compact but lively market has built its reputation entirely on its incredible street food, and locals will firmly tell you that no trip to Sirsa is complete without stopping here.\n\nThe bazaar takes its name from the dhobi community — traditional washermen — who were among its earliest residents. While the washermen have long moved on, the neighbourhood they left behind transformed into something far more delicious. By the 1970s, a cluster of food stalls had emerged, and word spread fast. Today, Dhobiana Bazaar is synonymous with golgappe, chaat, samosas, and the kind of fried snacks that you eat standing on the roadside while arguing about who gets the last plate.\n\nMakkhan Lal's chaat corner is the stuff of local legend. The man himself — now elderly — still shows up every evening to supervise, insisting that only he knows the correct ratio of tamarind to jaggery in the chutney. His golgappe queue starts forming 15 minutes before he even opens the pots.\n\nBeyond the chaat, the bazaar offers budget clothes, small accessories, and affordable household goods — but let's be honest, nobody really comes here for those. They come for the food, the crowds, the noise, and the feeling that this chaotic, joyful street is the realest part of Sirsa.`,
  },

  'sector-17-fashion-market': {
    established: '1990s',
    famousShops: [
      'Trendy Junction — western wear for college students',
      'Lehenga Palace — bridal wear specialists',
      'Sports World Sirsa — branded and local sportswear',
    ],
    funFacts: [
      'Wedding season (Oct–Feb) sees this market run until midnight with special lighting.',
      'The market has the highest concentration of tailor shops in Sirsa.',
      'Local influencers regularly shoot reels here for Instagram fashion content.',
    ],
    body: `Sector 17 Fashion Market is where Sirsa gets dressed up. Unlike the utilitarian Hanumangarh Road strip or the traditional Anaj Mandi, this market is aspirational — a place where young people come to browse the latest styles, families plan wedding wardrobes, and fashion-conscious residents source outfits that wouldn't look out of place in a Ludhiana or Chandigarh boutique.\n\nThe market emerged in the 1990s as Sirsa's residential sectors expanded and a new generation of consumers with different tastes began demanding better fashion choices. Entrepreneurs responded, and within a decade, Sector 17 had become the city's definitive fashion destination.\n\nThe range here is genuinely impressive for a Tier-3 city. You'll find everything from budget western wear and casual kurtas to elaborate bridal lehengas with heavy embroidery and mirror work. The bridal section operates almost year-round but peaks dramatically between October and February — wedding season — when the market glitters with fairy lights and families spend entire Sundays going shop to shop.\n\nThe tailoring community is a backbone of this market. Skilled tailors who have worked here for decades can replicate almost any outfit from a photograph, and at a fraction of what a boutique would charge. Many college girls from nearby hostels treat this market as their personal wardrobe — visiting every few weeks to pick up pieces that are fashion-forward, affordable, and locally made.`,
  },

  'jewelry-market-sirsa': {
    established: '1930s',
    famousShops: [
      'Madan Lal Jewellers — trusted for hallmark gold since 1947',
      'Rajasthan Silver House — finest silver jewellery and artefacts',
      'Deepak Gems & Jewels — precious and semi-precious stones',
    ],
    funFacts: [
      'Sirsa\'s jewelry market has some of the finest kundan and meenakari work in Haryana.',
      'Gold prices here are updated twice daily from the MCX exchange.',
      'The market sees its biggest rush on Dhanteras — often 10× normal footfall.',
    ],
    body: `Sirsa's Jewelry Market is one of the oldest and most respected commercial strips in the city, with roots stretching back to the 1930s when gold and silver traders first established permanent shops to serve the agricultural wealth flowing through the region. Haryana's farming families have always invested heavily in gold — for weddings, for savings, and for status — and Sirsa's jewellers have been the beneficiaries of that trust for nearly a century.\n\nThe market is concentrated along a few lanes near the main bazaar, and stepping into it feels like entering a world of restrained opulence. Glass-fronted display cases glitter with necklaces, bangles, earrings, and elaborate bridal sets. Craftsmen sit in small workshops at the back of shops, shaping wax models, setting stones, and doing the delicate work that machines still cannot replicate.\n\nBridal jewellery is the market's speciality. Families begin planning wedding purchases months in advance, making multiple visits to compare designs before committing. Gold purity is taken extremely seriously — BIS hallmarking is standard, and reputable shops display their certifications prominently.\n\nSilver jewellery, often underrated, is a hidden strength of this market. Rajasthani-influenced silver pieces — thick kadas, intricate anklets, and hand-engraved rings — are available at prices that would be unthinkable in a Delhi or Jaipur shop. During Dhanteras, the entire market illuminates magnificently, and the queue of buyers sometimes stretches around the block.`,
  },

  'electronics-hub-sirsa': {
    established: 'Mid 1980s',
    famousShops: [
      'Krishna Electronics — Sirsa\'s oldest multi-brand appliance store',
      'Mobile Zone — repairs, accessories, and second-hand phones',
      'PC World Sirsa — computers and peripherals since 1998',
    ],
    funFacts: [
      'Second-hand smartphone trade here is thriving — over 200 phones change hands daily.',
      'Many shops offer free delivery within Sirsa city limits.',
      'The market has its own informal price discovery — dealers call each other before fixing rates.',
    ],
    body: `Sirsa's Electronics Hub emerged in the mid-1980s when television ownership began spreading rapidly across North India and a market for appliance retail, repair, and accessories found its footing here. What started with a handful of TV and radio repair shops has since evolved into a dense cluster of mobile phone dealers, computer retailers, appliance showrooms, and a remarkably active second-hand electronics trade.\n\nThe market has a dual personality. The front-facing shops are clean, air-conditioned showrooms displaying the latest smartphones and home appliances at competitive prices. But duck into the lanes behind, and you enter the repair economy — technicians hunched over circuit boards, soldering irons glowing, screens and batteries piled in cardboard boxes, fixing devices that cheaper markets would simply discard.\n\nThe second-hand phone trade is the market's most fascinating feature. Every morning, traders arrive with phones to sell; by noon, a complex web of deals has been struck, and devices have changed hands multiple times. Prices are negotiated verbally, with no receipts — the entire ecosystem runs on reputation and trust built over years.\n\nFor students and first-time buyers, this market is invaluable. A working refurbished smartphone with a 3-month guarantee can be found for under ₹3,000. Computer repair services are fast and affordable. And for the tech-savvy, the accessories section — phone cases, cables, power banks — offers far more variety at far lower prices than any online marketplace.`,
  },

  'purani-dilli-bazaar-sirsa': {
    established: 'Pre-1900s',
    famousShops: [
      'Lala Ram Chand & Sons — textiles merchants since before Partition',
      'Old Sirsa Pharmacy — the city\'s oldest medicine shop',
      'Halwai Gali — a full lane of traditional sweet makers',
    ],
    funFacts: [
      'Some buildings here still show the pre-Partition architecture of undivided Punjab.',
      'The old bazaar had a functional sarai (inn) for travelling traders until the 1960s.',
      'Street numbering in this area still follows a pre-Independence system.',
    ],
    body: `Purani Dilli Bazaar — Old Sirsa Market — is the original commercial heart of the city, predating Independence and carrying the weight of history in every crumbling facade and narrow gali. This is where Sirsa's commercial life began, long before sectors were planned and new markets were built, when this cluster of lanes was the only place in the region where goods and communities could converge.\n\nThe architecture tells the story. Thick brick walls, wooden balconies, and arched doorways speak of a time when this area was part of undivided Punjab. Many families running shops here today are the third or fourth generation of traders who set up after the chaos of Partition, rebuilding their lives and livelihoods in these very lanes.\n\nHalwai Gali — Sweetmakers' Lane — is the most atmospheric stretch. The smell of simmering khoya, frying gulab jamun, and freshly made jalebis hangs permanently in the air. These halwais have not changed their recipes in decades; some claim their methods trace back to royal kitchens. The milk cake (kalakand) made here has fans across the district.\n\nShopping here requires patience. Streets are narrow, parking is non-existent, and navigation is intuitive rather than logical. But the payoff is discovering shops that haven't changed their price philosophy since the 1980s — because they own their premises, have no rent burden, and serve loyal customers who've been coming since childhood.`,
  },
};

export default stories;
