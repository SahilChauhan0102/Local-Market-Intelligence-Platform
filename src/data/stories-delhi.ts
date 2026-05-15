import type { MarketStory } from '@/types/market';

const stories: Record<string, MarketStory> = {

  'chandni-chowk-delhi': {
    established: '1650 AD',
    famousShops: [
      'Paranthe Wali Gali — a lane dedicated entirely to stuffed parathas since the 1870s',
      'Ghantewala Halwai — sweets shop that served Mughal emperors (closed 2015, legendary legacy)',
      'Kinari Bazaar — lace, ribbons, and bridal accessories since the Mughal era',
      'Lala Babu Sweets — best sohan halwa in Old Delhi',
    ],
    funFacts: [
      'Chandni Chowk means "Moonlit Square" — it originally had a canal reflecting moonlight.',
      'It was designed by Mughal princess Jahanara Begum, Shah Jahan\'s daughter.',
      'The street was once the most expensive commercial real estate in Asia.',
    ],
    body: `Chandni Chowk is not just a market — it is a living museum, a 375-year-old testament to the commercial genius of Mughal India. Built in 1650 AD under Emperor Shah Jahan's reign, this iconic market was designed by his daughter Princess Jahanara Begum, making it one of history's rare examples of royal urban planning by a woman. A shimmering canal once ran through its centre, reflecting moonlight and giving the market its poetic name: "Moonlit Square."\n\nAt its peak under the Mughals, Chandni Chowk was arguably Asia's wealthiest commercial street. Spices from Kerala, silk from Benaras, diamonds from Golconda, and horses from Persia all passed through its lanes. European traders who visited in the 1600s described it in breathless terms in their journals.\n\nToday, the canal is gone and the Mughal glory has softened, but Chandni Chowk retains an extraordinary density of commerce. It is simultaneously the world's largest spice market, India's biggest wholesale fabric destination, the country's premier wedding accessories hub, and a street food paradise — all compressed into a few kilometres of lanes that the uninitiated find utterly overwhelming.\n\nParanthe Wali Gali has served stuffed flatbreads since the 1870s, and regulars claim the recipe has not changed. The silver market, the book market, the electronics lanes, the dry fruit traders — each gali has its identity, and learning to navigate them feels like unlocking a secret city within a city.`,
  },

  'sarojini-nagar-market': {
    established: '1950s',
    famousShops: [
      'Export Surplus Stalls — clothes rejected by international brands for tiny defects',
      'Shoes & Accessories Lane — branded footwear at 80% off',
      'Tuesday & Wednesday Wholesale — best deals for resellers',
    ],
    funFacts: [
      'Export surplus items here often carry original brand labels of H&M, Zara, and Marks & Spencer.',
      'Sarojini is Instagram\'s most-tagged Delhi market for fashion hauls.',
      'On weekends, over 1 lakh people visit — making crowd management a serious exercise.',
    ],
    body: `Sarojini Nagar Market is Delhi's great democratic equaliser — where a ₹500 budget can kit you out in clothes that would cost ₹5,000 in a mall. Born in the 1950s as a residential market for the neighbourhood, it transformed over decades into the capital's premier destination for export surplus garments — clothing manufactured for international brands that didn't ship due to minor defects, size mismatches, or cancelled orders.\n\nThe market's metamorphosis into a fashion hub was gradual but unstoppable. As Delhi's garment export industry boomed in the 1980s and 90s, unsold surplus found its way here. Word spread among college students and budget shoppers that you could find near-perfect branded clothes for a fraction of their original price. Sarojini became a phenomenon.\n\nToday, the market is a carefully chaotic grid of permanent shops and temporary stalls. The permanent shops stock curated collections; the stalls change inventory almost daily as new surplus arrives. Regulars know to come on weekday mornings — fresh stock, fewer crowds, more negotiating room.\n\nThe skill of shopping at Sarojini is in the search. You cannot walk in and expect a perfect wardrobe to present itself. You must dig through piles, try things on in makeshift changing areas, and bargain firmly. The thrill of finding a barely-defective international brand shirt for ₹150 is part of why this place generates genuine excitement. Fashion influencers have turned it into a social media staple, but the real Sarojini magic was always discovered by ordinary shoppers with sharp eyes and patient hands.`,
  },

  'lajpat-nagar-market': {
    established: '1947–1950',
    famousShops: [
      'Central Market Lajpat Nagar — the spine of the entire market',
      'Bridal Lehenga Row — hundreds of bridal shops in one stretch',
      'Kapoor Cloth House — landmark fabric store for 60+ years',
    ],
    funFacts: [
      'Lajpat Nagar was built to rehabilitate Partition refugees from West Punjab and Sindh.',
      'It is named after Lala Lajpat Rai, the freedom fighter known as "Punjab Kesari."',
      'The market has the highest density of bridal lehenga shops in all of Delhi.',
    ],
    body: `Lajpat Nagar Market carries a history deeper than most people realise when they browse its colourful fabric lanes or bargain over wedding jewellery. This market was born from one of history's greatest human tragedies — the Partition of 1947. When millions of refugees from West Punjab and Sindh crossed the new border into India with nothing but their lives, the Indian government created Lajpat Nagar as a rehabilitation colony, and its market grew from the entrepreneurial spirit of people who had lost everything but their skills.\n\nThe Sindhi and Punjabi traders who built this market brought with them a sharp commercial instinct and a specific aesthetic — bold colours, heavy embroidery, elaborate silverwork — that shaped Lajpat Nagar's identity forever. To this day, the market's bridal sections reflect this heritage: lehengas with intense mirror work, dupattas heavy with zari borders, and jewellery designs rooted in the pre-Partition craft traditions of Sindh and Lahore.\n\nCentral Market is the market's main artery — a long, busy street flanked by shops selling clothes, accessories, home furnishings, and everything in between. The lanes branching off Central Market each have their own character: one is all curtain fabrics, another is all wedding accessories, another is street food and dhabas.\n\nFor Delhi brides on a budget, Lajpat Nagar is a first and often final stop. You can find comparable quality to Chandni Chowk's bridal market here, but with slightly less tourist pricing and arguably more variety in contemporary fusion styles.`,
  },

  'karol-bagh-market': {
    established: '1920s',
    famousShops: [
      'Ajmal Khan Road — the main commercial spine with 500+ shops',
      'Gaffar Market (adjacent) — electronics and mobile accessories',
      'Roopak Stores — Delhi\'s most famous spice shop, established 1950',
      'Arya Samaj Road Sweets — Bengali sweets and North Indian mithai',
    ],
    funFacts: [
      'Karol Bagh is named after King Charles — a colonial-era anglicisation of "Charles Bagh."',
      'It is home to the largest cluster of shoe wholesale shops in North India.',
      'The area has over 5,000 registered commercial establishments.',
    ],
    body: `Karol Bagh is the grand bazaar of Middle Delhi — a dense, multifaceted commercial district that somehow manages to be a wholesale hub, a tourist destination, a bridal shopping centre, and an everyday neighbourhood market all at once. Its roots go back to the 1920s when the British laid out this area as part of New Delhi's planned expansion, and merchants — many of them Punjabi traders — quickly claimed it as prime commercial territory.\n\nThe name itself is a colonial curiosity. "Karol" is believed to be an Indianisation of "Charles," as in King Charles, suggesting the area may have been called Charles Bagh in early administrative records before locals adapted it to something more pronounceable.\n\nAjmal Khan Road is the market's main artery, and it is spectacular in its variety. Shoe shops dominate the western end — Karol Bagh supplies footwear to retailers across North India, and the variety of styles, from traditional juttis to modern sneakers, is staggering. The eastern end transitions into electronics, then fabric, then a cluster of hotels that serve the thousands of wedding shopping tourists who descend on the area each year.\n\nRoopak Stores, tucked in the lanes, is a pilgrimage site for serious cooks. This family-run spice shop has stocked over 400 varieties of spices, herbs, and condiments since 1950, and its shelves are as educational as they are fragrant. Chefs from five-star hotels quietly shop here alongside housewives and home cooks.`,
  },

  'gaffar-market-delhi': {
    established: '1980s',
    famousShops: [
      'Mobile Accessories Bazaar — entire floors of phone cases and chargers',
      'Refurbished Laptop Zone — tested and warrantied second-hand laptops',
      'Camera Bazaar — DSLR bodies, lenses, and accessories at dealer prices',
    ],
    funFacts: [
      'Gaffar Market reportedly has the cheapest mobile accessories in all of Delhi.',
      'Grey market (parallel import) electronics are openly discussed but legally grey.',
      'The market is famous for selling "refurbished" iPhones — always verify before buying.',
    ],
    body: `Gaffar Market is Delhi's underground technology bazaar — not literally underground, but operating in the grey zones between retail and wholesale, new and refurbished, official and parallel import. Located adjacent to Karol Bagh, this compact multi-storey market has quietly become the go-to destination for anyone who wants electronics at prices that no mall or authorised dealer can match.\n\nThe market grew organically in the 1980s as electronic goods became aspirational purchases for middle-class Delhi and demand far outpaced the supply of affordable official retail. Traders discovered that importing electronics through alternative channels — or sourcing refurbished units — could serve this demand profitably, and Gaffar Market became the hub of this trade.\n\nWalking through its floors is a sensory overload. Every square metre is occupied: phone accessories spill from shelves onto counters, laptops are stacked in transparent display cases, camera lenses sit in velvet-lined boxes, and Bluetooth speakers play competing music from a dozen stalls simultaneously.\n\nThe key to shopping here is knowledge. Bring someone who understands specs and can verify whether that "refurbished" phone has its original battery and whether the laptop's RAM is what the seller claims. That said, informed buyers can find extraordinary deals — a fully functional mid-range smartphone at 40% of its market price, or a camera lens that would cost three times more at an authorised dealer.\n\nAlways ask for a demo, test everything before paying, and remember: no receipt means no recourse.`,
  },

  'janpath-market': {
    established: '1970s',
    famousShops: [
      'Tibetan Market — authentic Tibetan handicrafts and jewellery',
      'Janpath Lane Stalls — block-print kurtas, jhola bags, junk jewellery',
      'Village Creations — handloom fabrics direct from weavers',
    ],
    funFacts: [
      'Janpath\'s Tibetan Market was established after the 1959 Tibetan diaspora.',
      'The road itself was designed by British architect Edwin Lutyens in the 1920s.',
      'Janpath means "People\'s Way" in Sanskrit — a fitting name for Delhi\'s most democratic shopping street.',
    ],
    body: `Janpath — "People's Way" — lives up to its Sanskrit name with a democratic, accessible energy that sets it apart from Delhi's more self-conscious shopping destinations. Laid out by British architect Edwin Lutyens as part of New Delhi's grand colonial design in the 1920s, this broad avenue has since been claimed by the people it was named for: artists, students, travellers, and anyone who values character over brand labels.\n\nThe market's identity crystallised in the 1970s when the government established a permanent flea market along the street, and artisans from across India began bringing their crafts directly to urban consumers. Today, Janpath is particularly famous for its incredible range of handloom fabrics — block-printed cotton kurtas, Rajasthani mirror-work dupattas, Kashmiri pashminas, and Gujarati bandhani saris at prices that support the artisans rather than enriching middlemen.\n\nThe Tibetan Market is Janpath's most distinctive feature. Established after the 1959 Tibetan diaspora brought thousands of refugees to India, this compact cluster of stalls sells genuine Tibetan handicrafts: turquoise and coral jewellery, hand-knotted carpets, singing bowls, thangka paintings, and yak wool shawls. Many stallholders are Tibetan refugees or their descendants, and purchasing from them is simultaneously an act of shopping and solidarity.\n\nFor the backpacking traveller or the Delhi local who's tired of mall homogeneity, Janpath offers something irreplaceable: goods made by human hands, carrying the distinct identity of the cultures that produced them.`,
  },

  'palika-bazaar-delhi': {
    established: '1978',
    famousShops: [
      'Electronics Zone — lower level packed with gadgets and accessories',
      'CD & Gaming Floor — physical media and gaming accessories',
      'Clothes Corridor — budget western wear for teens and young adults',
    ],
    funFacts: [
      'Palika Bazaar is Asia\'s first underground shopping complex, inaugurated in 1978.',
      'It was built under Connaught Place\'s inner circle, preserving the heritage streetscape above.',
      'During summers, it stays cool naturally due to its underground position.',
    ],
    body: `Palika Bazaar holds the remarkable distinction of being Asia's first underground shopping complex — a subterranean retail world built beneath the iconic Connaught Place in 1978. Delhi's planners, faced with the challenge of adding commercial space to a heritage area without disrupting the colonial-era architecture above, came up with a genuinely innovative solution: go underground. The result is a sprawling, air-cooled bazaar that has developed a distinct subculture over nearly five decades.\n\nDescending into Palika from Connaught Place's central fountain feels like entering another city. The natural daylight disappears, replaced by the fluorescent glow of hundreds of small shops packed into curving corridors that follow the circular layout of the surface above. The temperature drops, noise echoes differently, and the shopping experience becomes intensely compact — every square foot is maximised.\n\nThe market built its early reputation on electronics and fashion at prices significantly below the authorised retail above ground. This reputation attracted a specific demographic: students, young professionals, and budget-conscious shoppers who didn't mind navigating the maze in exchange for significant savings.\n\nOver the decades, Palika has adapted to survive. When physical music died, the CD shops became phone accessory sellers. When internet killed gaming arcades, those spaces became fashion outlets. This survival instinct — constantly reshaping the merchandise mix to match demand — has kept Palika relevant when other markets of its era have declined.\n\nEven today, its underground mystique is part of the appeal.`,
  },

  'nehru-place-it-market': {
    established: '1984',
    famousShops: [
      'Hindustan Computers — one of the first computer dealers in India',
      'IT Park Complex — multi-storey buildings housing thousands of vendors',
      'Software Bazaar — licensed and parallel-import software',
    ],
    funFacts: [
      'Nehru Place was once the largest computer market in Asia.',
      'The area processes an estimated ₹500 crore in IT transactions daily.',
      'Many of India\'s early software companies were incubated in Nehru Place offices.',
    ],
    body: `Nehru Place is where India's IT revolution has its scruffiest, most authentic face. While Bengaluru has its gleaming tech parks and Hyderabad its HITEC City, Delhi has Nehru Place — a dense, chaotic, endlessly productive market where hardware is traded, software is installed, servers are assembled, and the engine of India's digital economy is lubricated daily in the most unglamorous way possible.\n\nEstablished in 1984, Nehru Place was originally planned as an office complex, but the computer boom of the late 1980s and 1990s transformed it into something entirely different: Asia's largest IT market. At its peak in the early 2000s, billions of rupees of computer hardware changed hands here daily. Every major PC brand, every server manufacturer, and every peripheral maker had a presence — often operating out of a single room with a desk and a phone.\n\nThe market has two faces. The ground level and surrounding streets are pure bazaar — vendors selling printer cartridges, ethernet cables, refurbished laptops, and components from folding tables. Go upstairs into the office towers, and you find legitimate software companies, networking firms, and IT service providers operating in a more corporate register.\n\nNehru Place is where small businesses across Delhi go when their computer breaks. It is where a startup founder comes to assemble servers at half the cost of ordering online. It is where IT students learn pricing, specs, and negotiation simultaneously. Despite Amazon and Flipkart, Nehru Place endures because it offers something neither can: immediate physical access, expert advice, and the ability to negotiate face to face.`,
  },

  'dilli-haat-ina': {
    established: '1994',
    famousShops: [
      'State Craft Emporia — official stalls from 29 Indian states',
      'Artisan Demonstration Area — live weaving, pottery, and painting',
      'Regional Food Court — authentic cuisine from every Indian state',
    ],
    funFacts: [
      'Dilli Haat is designed as a traditional village haat — the concept of a periodic village market.',
      'Over 600 artisans from across India rotate through stalls every 15 days.',
      'The food court serves dishes you genuinely cannot find elsewhere in Delhi.',
    ],
    body: `Dilli Haat is Delhi's most intentional market — a place designed not just for commerce but for cultural preservation. Opened in 1994 by the Delhi Tourism and Transportation Development Corporation, it was conceived as a permanent platform for Indian artisans who were being squeezed out of urban markets by mass-produced goods. The result is one of Delhi's most genuinely rewarding shopping experiences.\n\nThe design draws from the traditional haat — a periodic village market where artisans and farmers come together to sell directly to consumers. Dilli Haat recreates this format in a permanent, curated setting: approximately 200 stalls arranged in a landscaped open-air complex, where artisans from different states rotate every 15 days, ensuring the inventory is always fresh and diverse.\n\nWalking through Dilli Haat is an education in India's staggering craft diversity. In one hour, you can examine Manipuri handloom weaving, watch a Rajasthani blue pottery artisan at work, handle Kashmiri walnut wood carving, and compare the weight and texture of Chanderigauze with Banarasi silk. The artisans are present and willing to explain their crafts — conversations that add context and meaning to what might otherwise be just objects.\n\nThe food court is as much a draw as the crafts. Authentic regional dishes — Nagaland's smoked pork curry, Goa's fish thali, Bihar's litti chokha, Kerala's appam with stew — are prepared by cooks from those very states, and the quality is genuine. For many visitors, Dilli Haat is the most delicious 30 square metres in Delhi.`,
  },

  'khan-market-delhi': {
    established: '1951',
    famousShops: [
      'Bahrisons Booksellers — Delhi\'s most beloved independent bookstore since 1953',
      'Good Earth — premium Indian home décor and lifestyle brand',
      'Khan Chacha — legendary kebab rolls and butter chicken',
      'The Shop — curated Indian handicrafts since 1975',
    ],
    funFacts: [
      'Named after Khan Abdul Jabbar Khan, a freedom fighter from the North-West Frontier.',
      'Khan Market has been rated Asia\'s most expensive retail real estate multiple times.',
      'The market has the highest density of foreign diplomats shopping in any Delhi market.',
    ],
    body: `Khan Market is Delhi's most sophisticated bazaar — a compact, tree-lined L-shaped complex that somehow manages to be simultaneously a neighbourhood convenience market and one of Asia's priciest retail addresses. Established in 1951 and named after Khan Abdul Jabbar Khan, a freedom fighter from the North-West Frontier, it was originally built to serve the nearby diplomatic enclave and government housing colonies.\n\nThe neighbourhood has shaped the market's personality profoundly. Decades of serving diplomats, academics, bureaucrats, and the city's intellectual elite have given Khan Market a distinctive character: it stocks things you simply cannot find elsewhere in Delhi — imported cheeses, specialist wines, international magazines, and books in languages rarely stocked in other stores.\n\nBahrisons Booksellers is the market's soul. This family-run bookshop has operated since 1953, and its walls carry the signatures and memories of nearly every significant Indian writer, politician, and intellectual of the past seven decades. Author events, book launches, and readings happen here regularly, making it as much a cultural venue as a retail shop.\n\nKhan Market's food scene is equally serious. Khan Chacha's roll counter — which has been doing exactly two things for 50 years, chicken kebab rolls and butter chicken — is regularly cited in international food guides. The newer restaurants are expensive by Delhi standards, but the quality justifies the premium for special occasions.\n\nThe market's rental rates are legendarily high, but shops endure because Khan Market's customers — loyal, educated, and free-spending — are among Delhi's most valuable retail audience.`,
  },

  'kamla-nagar-market': {
    established: '1960s',
    famousShops: [
      'Chandni Chowk-Style Cloth Market — fabrics at wholesale prices',
      'Student Fashion Stalls — trendy clothes under ₹500',
      'Stationary & Books Row — academic supplies for Delhi University',
      'Street Food Strip — momos, rolls, chaat, pasta — everything under ₹100',
    ],
    funFacts: [
      'Kamla Nagar is considered Delhi University\'s "unofficial campus canteen."',
      'The market changes character completely after 4PM when college lets out.',
      'Over 30 street food vendors operate within 200 metres of the main market.',
    ],
    body: `Kamla Nagar Market is a university market that grew up. Located a short walk from Delhi University's North Campus, it has served generations of students with affordable fashion, academic supplies, and the kind of cheap, delicious street food that fuels late-night studying and early-morning hunger. If Delhi University is the engine of North Delhi's intellectual life, Kamla Nagar is the fuel station.\n\nThe market began developing in the 1960s as the university expanded and a residential area grew around its northern boundary. Shopkeepers quickly identified their primary customer base — students with limited budgets and strong opinions about style — and tailored their offerings accordingly. Today, Kamla Nagar is one of Delhi's best destinations for affordable fashion, with hundreds of stalls selling trend-conscious clothing at prices that would be impossible in any mall or brand store.\n\nThe market has a distinct before-and-after character. In the morning, it's a functioning neighbourhood market: vegetable sellers, pharmacies, provision stores, and dry cleaners serving the residential population. After 3PM, as colleges empty, the energy transforms completely. Student groups flood the lanes, fashion stalls extend their hours, street food vendors fire up their tawas, and the market becomes a social space as much as a commercial one.\n\nThe street food here deserves its own essay. Momos with chilli oil, loaded fries, cheesy parathas, fruit cream bowls, tandoori rolls — all priced for a student wallet. On any given evening, you'll find students debating philosophy over ₹50 momos and sharing fashion discoveries over chaat. Kamla Nagar doesn't just serve students; it nurtures them.`,
  },

  'connaught-place-delhi': {
    established: '1933',
    famousShops: [
      'Wenger\'s — Delhi\'s oldest bakery and deli since 1926',
      'Regal Cinema Building — iconic heritage structure in the inner circle',
      'Central Cottage Industries Emporium — government-run craft store since 1952',
      'Palika Bazaar (underground) — Asia\'s first underground shopping complex',
    ],
    funFacts: [
      'Designed by British architect RobertTor Russell and named after the Duke of Connaught.',
      'The inner circle has exactly 12 blocks, labelled A through L — no K block exists.',
      'CP was the most expensive real estate in Asia for several decades post-Independence.',
    ],
    body: `Connaught Place — CP to every Delhiite — is the colonial heart of India's capital, a grand circular market designed in 1933 by British architect Robert Tor Russell as the commercial centrepiece of New Delhi. Named after the Duke of Connaught, it was conceived as a European-style shopping arcade for the colonial administration and their Indian elite contemporaries. Nine decades later, it remains Delhi's most symbolic address.\n\nThe architecture alone justifies a visit. The famous white colonnaded buildings, arranged in concentric circles with radial roads connecting them, create a geometry that is both aesthetically striking and practically efficient. Walking the covered walkways that line the inner circle — past columns that have witnessed eight decades of Delhi life — feels like passing through history with a coffee in hand.\n\nWenger's Bakery, which has operated from its CP location since 1926 (before CP was even officially finished), is India's oldest surviving European-style deli. Its pastry counter has changed little since the 1940s, and regulars claim the black forest cake and patties taste exactly as their grandparents described them.\n\nModern CP is a complex blend: heritage buildings housing Zara and H&M, underground Palika Bazaar, government craft emporia alongside upscale restaurants, and the famous central park where office workers eat lunch and activists sometimes stage protests. The famous "hole-in-the-wall" dhabas and boot-polish wallahs who operated here for decades have thinned, but CP retains its irreplaceable gravitational pull on Delhi's commercial and cultural life.`,
  },
};

export default stories;
