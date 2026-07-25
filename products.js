// Loomexra Product Database — 40 Premium Items
// Indian woman / kids fashion images used for all products

const PRODUCTS = [
  // ===== MATERNITY WEAR (10) =====
  {
    id: "mat-1",
    name: "Aura Premium Cotton Maternity Dress",
    category: "maternity",
    price: 4899,
    description: "An elegant flowing dress crafted from premium long-staple cotton with expandable side seams and soft empire waist for comfort throughout pregnancy.",
    sizes: ["S", "M", "L", "XL"],
    image: "assets/mat1.jpg",
    rating: 4.8, reviews: 124,
    highlights: ["100% Premium Combed Cotton", "Expandable side gathers", "Concealed nursing zippers", "Breathable lightweight knit"]
  },
  {
    id: "mat-2",
    name: "Elysian Linen Maternity Midi",
    category: "maternity",
    price: 5499,
    description: "Flowing warm-beige midi dress made from premium breathable linen with an adjustable back wrap design for a perfect fit at every stage.",
    sizes: ["S", "M", "L", "XL"],
    image: "assets/mat2.jpg",
    rating: 4.9, reviews: 86,
    highlights: ["Premium European flax linen", "Wrap-around adjustable tie", "Side slit for mobility", "Hypoallergenic dyes"]
  },
  {
    id: "mat-3",
    name: "Serene Ribbed Maternity Slip Dress",
    category: "maternity",
    price: 6299,
    description: "A sleek flexible ribbed knit dress in warm sand. Body-contouring yet non-restrictive silhouette, transitioning from day to evening.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=600&auto=format&fit=crop&q=80",
    rating: 4.7, reviews: 98,
    highlights: ["Ultra-stretch rib knit", "Ankle-grazing length", "Viscose-silk blend", "Wrinkle-resistant fabric"]
  },
  {
    id: "mat-4",
    name: "Solace Gauze Maternity Caftan",
    category: "maternity",
    price: 4299,
    description: "Double-layered cotton gauze caftan. Breathable and breezy with mother-of-pearl buttons for easy nursing access.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&auto=format&fit=crop&q=80",
    rating: 4.6, reviews: 75,
    highlights: ["Double-layered cotton gauze", "Relaxed fluid drape", "Front button placket", "Side seam pockets"]
  },
  {
    id: "mat-5",
    name: "Nova Pleated Empire Maternity Gown",
    category: "maternity",
    price: 7899,
    description: "A gorgeous pleated empire-line gown in soft peach chiffon, ideal for maternity photo shoots and formal occasions.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&auto=format&fit=crop&q=80",
    rating: 4.9, reviews: 142,
    highlights: ["Chiffon wrap top", "Micro-pleated skirt", "Satin inner lining", "Special occasion design"]
  },
  {
    id: "mat-6",
    name: "Breeze Tiered Cotton Maternity Maxi",
    category: "maternity",
    price: 4999,
    description: "Tiered sundress in beautiful off-white with a smocked back panel that stretches comfortably for relaxed daily wear.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&auto=format&fit=crop&q=80",
    rating: 4.7, reviews: 63,
    highlights: ["100% breathable cambric cotton", "Smocked flexible bodice", "Adjustable shoulder straps", "Cotton voile lining"]
  },
  {
    id: "mat-7",
    name: "Halcyon Linen Nursing Jumpsuit",
    category: "maternity",
    price: 5999,
    description: "Tailored from premium Belgian linen with a relaxed drop-crotch and hidden front nursing zipper — comfort meets premium style.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80",
    rating: 4.8, reviews: 110,
    highlights: ["Belgian linen-cotton blend", "Concealed nursing zip", "Detachable fabric belt", "Deep utility pockets"]
  },
  {
    id: "mat-8",
    name: "Dawn Modal Jersey Maternity Midi",
    category: "maternity",
    price: 3699,
    description: "Minimalist casual dress in premium modal-cotton jersey. Unmatched softness against sensitive skin with high elasticity.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1605497746444-1306501934ad?w=600&auto=format&fit=crop&q=80",
    rating: 4.5, reviews: 80,
    highlights: ["Superfine modal-cotton blend", "Four-way stretch", "Raw-edge finishing", "Eco-friendly botanical dye"]
  },
  {
    id: "mat-9",
    name: "Amara Wrap Knit Midi",
    category: "maternity",
    price: 5299,
    description: "Elegant wrap dress in warm clay with adjustable waist tie, crafted from premium stretch knit fabric.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?w=600&auto=format&fit=crop&q=80",
    rating: 4.7, reviews: 93,
    highlights: ["Viscose-elastane knit", "Functional wrap silhouette", "Elegant V-neckline", "Mid-calf length"]
  },
  {
    id: "mat-10",
    name: "Vesper Linen Maternity Slip Dress",
    category: "maternity",
    price: 4799,
    description: "Minimalist warm-toned linen slip dress with loose A-line draping and adjustable shoulder strap sliders.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?w=600&auto=format&fit=crop&q=80",
    rating: 4.6, reviews: 58,
    highlights: ["Pure European flax linen", "Adjustable strap buckles", "Relaxed A-line fit", "Perfect for summer"]
  },

  // ===== NON-MATERNITY DRESSES (10) =====
  {
    id: "dr-1",
    name: "Satin Cowl Midi Dress",
    category: "dresses",
    price: 6899,
    description: "A luxurious bias-cut satin slip dress with a cowl neckline. Premium heavy-weight satin drapes beautifully for a sculptural look.",
    sizes: ["S", "M", "L", "XL"],
    image: "assets/dress1.jpg",
    rating: 4.9, reviews: 215,
    highlights: ["High-grade heavy-weight satin", "Bias-cut fluid silhouette", "Elegant cowl neck", "Adjustable cross-back straps"]
  },
  {
    id: "dr-2",
    name: "Ivory Embroidered Maxi Dress",
    category: "dresses",
    price: 8499,
    description: "Premium ivory maxi with delicate hand-designed tone-on-tone botanical embroidery, keyhole back and balloon sleeves.",
    sizes: ["S", "M", "L", "XL"],
    image: "assets/dress2.jpg",
    rating: 4.8, reviews: 167,
    highlights: ["Fine georgette fabric", "Tone-on-tone embroidery", "Sheer balloon sleeves", "Concealed back zipper"]
  },
  {
    id: "dr-3",
    name: "Minimalist Linen Shift Dress",
    category: "dresses",
    price: 4999,
    description: "Structural shift dress in charcoal, cut from pure French linen with a clean boat neck and seamless hidden pockets.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=600&auto=format&fit=crop&q=80",
    rating: 4.7, reviews: 104,
    highlights: ["100% French flax linen", "Minimalist shift structure", "Invisible side pockets", "Contrast back-stitch detail"]
  },
  {
    id: "dr-4",
    name: "Oatmeal Button-Down Maxi",
    category: "dresses",
    price: 5899,
    description: "Structured full-length dress in sand linen with a tailored button-down front, coconut shell buttons and matching belt.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1566207274740-0f8cf6b7d5a5?w=600&auto=format&fit=crop&q=80",
    rating: 4.6, reviews: 90,
    highlights: ["Heavy-weight pure linen", "Detachable fabric belt", "Coconut shell buttons", "Double-stitched hems"]
  },
  {
    id: "dr-5",
    name: "Tiered Silk-Blend Halter Midi",
    category: "dresses",
    price: 9299,
    description: "Premium silk-viscose blend midi with delicate tiers, a halter neck and low open back — luxury and sophistication.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&auto=format&fit=crop&q=80",
    rating: 4.9, reviews: 130,
    highlights: ["Luxurious silk-viscose blend", "Flowing tiered layers", "Halter neck tie", "Elegant low-cut back"]
  },
  {
    id: "dr-6",
    name: "Sculptural Linen Blazer Dress",
    category: "dresses",
    price: 8999,
    description: "A structured double-breasted blazer dress with peak lapels and custom fabric-covered buttons. Perfect for power dressing.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1609357605129-26f69add5d6e?w=600&auto=format&fit=crop&q=80",
    rating: 4.8, reviews: 87,
    highlights: ["Structured linen-cotton blend", "Fully satin-lined", "Structured shoulder pads", "Double-breasted front"]
  },
  {
    id: "dr-7",
    name: "Earthy Knit Column Dress",
    category: "dresses",
    price: 6499,
    description: "Column midi dress in heavy-weight cotton knit with a high mock collar and structured side ribs for elegant definition.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1611042553975-08733608b2db?w=600&auto=format&fit=crop&q=80",
    rating: 4.7, reviews: 112,
    highlights: ["100% long-staple cotton yarn", "Mock-neck styling", "Subtle side-slit", "Warm ivory colorway"]
  },
  {
    id: "dr-8",
    name: "Pleated Chiffon Wrap Dress",
    category: "dresses",
    price: 7499,
    description: "A romantic wrap midi in Sage Green, fine pleated chiffon. Lightweight feel with a fully adjustable wrap closure.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1550639525-c97d455acf70?w=600&auto=format&fit=crop&q=80",
    rating: 4.8, reviews: 79,
    highlights: ["Accordion-pleated chiffon", "Adjustable wrap closure", "Ruffled cuffs", "Soft inner slip included"]
  },
  {
    id: "dr-9",
    name: "Sweetheart Cotton Sundress",
    category: "dresses",
    price: 5299,
    description: "Classic A-line summer dress with a clean sweetheart neckline, tie shoulder straps and a smocked back panel.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1616847220555-468bfbb30fdb?w=600&auto=format&fit=crop&q=80",
    rating: 4.6, reviews: 119,
    highlights: ["Premium cotton poplin", "Sweetheart neckline", "Smocked back panel", "Side seam pockets"]
  },
  {
    id: "dr-10",
    name: "Deep V-Neck Linen Midi",
    category: "dresses",
    price: 6199,
    description: "Minimalist midi with a deep V-neck and relaxed drop waist. Breathable raw linen for warm weather staple styling.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&auto=format&fit=crop&q=80",
    rating: 4.5, reviews: 64,
    highlights: ["Breathable raw flax linen", "Deep V-neckline", "Relaxed drop waist", "French seams inside"]
  },

  // ===== CORD SETS (10) =====
  {
    id: "co-1",
    name: "Linen Wide-Leg Co-ord Set",
    category: "cordsets",
    price: 7299,
    description: "Luxurious two-piece co-ord with a relaxed button-up shirt and wide-leg trousers in premium flax linen.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&auto=format&fit=crop&q=80",
    rating: 4.9, reviews: 188,
    highlights: ["100% Premium French Flax Linen", "Mother-of-pearl buttons", "Elasticated back waistband", "Wide-leg trousers"]
  },
  {
    id: "co-2",
    name: "Tailored Linen Casual Co-ord",
    category: "cordsets",
    price: 6499,
    description: "Sporty-chic co-ord with a structured boxy top and relaxed tailored shorts in sand-beige cotton-linen.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80",
    rating: 4.7, reviews: 132,
    highlights: ["Cotton-linen breathable weave", "Boxy crew neck top", "Elastic-drawstring shorts", "Double side pockets"]
  },
  {
    id: "co-3",
    name: "Classic Oatmeal Lounge Set",
    category: "cordsets",
    price: 7999,
    description: "Relaxed lounge coordinates with a loose drop-shoulder shirt and matching trousers in premium oatmeal texture.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&auto=format&fit=crop&q=80",
    rating: 4.8, reviews: 95,
    highlights: ["Premium linen-viscose blend", "Drop-shoulder relaxed fit", "Warm oatmeal colorway", "Minimal front pockets"]
  },
  {
    id: "co-4",
    name: "Cropped Knit Mock-Neck Co-ord",
    category: "cordsets",
    price: 8499,
    description: "Elegant warm knit set with a cropped mock-neck jumper and wide-leg knit trousers. Extremely soft against skin.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&auto=format&fit=crop&q=80",
    rating: 4.9, reviews: 74,
    highlights: ["Viscose-nylon stretch knit", "Cropped mock-neck top", "High-waisted trousers", "Exquisite rib detailing"]
  },
  {
    id: "co-5",
    name: "Urban Minimalist Sweat Set",
    category: "cordsets",
    price: 5999,
    description: "Premium street-ready co-ord with a boxy heavy-weight cotton crewneck sweatshirt and matching relaxed joggers.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80",
    rating: 4.6, reviews: 145,
    highlights: ["Heavy 400GSM French Terry", "Pre-shrunk luxury wash", "Tone-on-tone stitching", "Brushed interior finish"]
  },
  {
    id: "co-6",
    name: "Structured Tailored Vest Set",
    category: "cordsets",
    price: 9499,
    description: "Modern tailored set with a sleeveless V-neck vest and tortoiseshell buttons paired with pleated linen trousers.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1542060748-10c28b629f6f?w=600&auto=format&fit=crop&q=80",
    rating: 4.9, reviews: 83,
    highlights: ["Structured linen-cotton canvas", "Tortoiseshell horn buttons", "High-waist double-pleat trousers", "Fully lined vest"]
  },
  {
    id: "co-7",
    name: "Pastel Sage Resort Co-ord",
    category: "cordsets",
    price: 6899,
    description: "Summer resort co-ord in Sage green with an open collar short-sleeve shirt and matching relaxed drawstring shorts.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?w=600&auto=format&fit=crop&q=80",
    rating: 4.7, reviews: 67,
    highlights: ["Breathable Lyocell-linen blend", "Camp collar shirt design", "Elasticated waistband shorts", "Muted pastel tint"]
  },
  {
    id: "co-8",
    name: "Charcoal Tailored Jacket Set",
    category: "cordsets",
    price: 9299,
    description: "Elegant monochrome tailored set with a collarless utility jacket and matching straight-leg trousers in charcoal.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=600&auto=format&fit=crop&q=80",
    rating: 4.8, reviews: 109,
    highlights: ["Heavy combed cotton canvas", "Minimalist hidden metal snaps", "Utility patch pockets", "Structured modern fit"]
  },
  {
    id: "co-9",
    name: "Linen Utility Cargo Co-ord",
    category: "cordsets",
    price: 7499,
    description: "Relaxed utility set with a multi-pocket button shirt and matching cargo trousers. Maximum function and premium style.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&auto=format&fit=crop&q=80",
    rating: 4.5, reviews: 82,
    highlights: ["100% Belgian linen fabric", "Four button pockets on shirt", "Relaxed cargo fit", "Felled clean seams"]
  },
  {
    id: "co-10",
    name: "Stone Kimono Palazzo Set",
    category: "cordsets",
    price: 7999,
    description: "Lightweight coordinate set in stone colorway with a loose kimono-style cardigan and flowing palazzo trousers.",
    sizes: ["S", "M", "L", "XL"],
    image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&auto=format&fit=crop&q=80",
    rating: 4.8, reviews: 51,
    highlights: ["Eco-friendly modal satin", "Relaxed kimono open top", "Wide palazzo leg trousers", "Silky soft touch"]
  },

  // ===== KIDS CLOTHING (10) =====
  {
    id: "kd-1",
    name: "Premium Linen Kids Overall",
    category: "kids",
    price: 2999,
    description: "Adorable kids overall in soft hypoallergenic washed premium linen with adjustable crossover straps and easy bottom snaps.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&auto=format&fit=crop&q=80",
    rating: 4.9, reviews: 154,
    highlights: ["100% hypoallergenic premium linen", "Adjustable crossover buckles", "Brass bottom snaps", "Front patch pocket"]
  },
  {
    id: "kd-2",
    name: "Knitted Premium Kids Jumper",
    category: "kids",
    price: 3299,
    description: "Warm cozy jumper knitted from pure combed cotton with a soft round collar and ribbed cuffs.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    image: "https://images.unsplash.com/photo-1519689680058-324335c77ebe?w=600&auto=format&fit=crop&q=80",
    rating: 4.8, reviews: 112,
    highlights: ["Premium long-staple combed cotton", "Chunky soft knit", "Flexible collar stretch", "Shrink-resistant"]
  },
  {
    id: "kd-3",
    name: "Kids Premium Knit Cardigan",
    category: "kids",
    price: 3499,
    description: "Button-front knit cardigan with faux-wood buttons and high-quality double-knit weave for warmth.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    image: "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?w=600&auto=format&fit=crop&q=80",
    rating: 4.9, reviews: 98,
    highlights: ["Superfine combed cotton yarn", "Imitation wood buttons", "Premium double-knit", "Non-itchy texture"]
  },
  {
    id: "kd-4",
    name: "Linen Band Collar Kids Shirt",
    category: "kids",
    price: 2499,
    description: "Minimal linen-cotton blend shirt with a classic band collar and half-button placket. Premium seaside look for kids.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=600&auto=format&fit=crop&q=80",
    rating: 4.7, reviews: 80,
    highlights: ["Cotton-linen natural blend", "Minimalist band collar", "Roll-up tab sleeves", "Flat-felled seams"]
  },
  {
    id: "kd-5",
    name: "Smocked Linen Kids Sundress",
    category: "kids",
    price: 2899,
    description: "Lovely summer dress for little ones with smocked chest, ruffled straps and tiered skirt in fine flax linen.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    image: "https://images.unsplash.com/photo-1604917621956-10dfa7cce2e7?w=600&auto=format&fit=crop&q=80",
    rating: 4.8, reviews: 73,
    highlights: ["Pure linen canvas fabric", "Ruffled shoulder straps", "Smocked flexible chest", "Open back design"]
  },
  {
    id: "kd-6",
    name: "Premium Cotton Kids Sweat Set",
    category: "kids",
    price: 3699,
    description: "Matching two-piece crewneck sweatshirt and joggers in soft clay. Extremely comfortable for everyday play.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    image: "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?w=600&auto=format&fit=crop&q=80",
    rating: 4.6, reviews: 140,
    highlights: ["Premium Cotton French Terry", "Elastic cuffs and ankles", "Cotton drawstring", "Soft-brushed inside"]
  },
  {
    id: "kd-7",
    name: "Linen Kids Drawstring Trousers",
    category: "kids",
    price: 2299,
    description: "Lightweight breathable linen trousers with cotton drawstring and stretchable elastic waistband for active kids.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    image: "https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=600&auto=format&fit=crop&q=80",
    rating: 4.7, reviews: 86,
    highlights: ["Pure linen-cotton canvas", "Comfort-stretch elastic waist", "Deep slash pockets", "Double-stitched knees"]
  },
  {
    id: "kd-8",
    name: "Shell-Button Knit Kids Romper",
    category: "kids",
    price: 2799,
    description: "Vintage-inspired knit romper with shell-button straps in soft-washed cotton yarn for maximum sensory comfort.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    image: "https://images.unsplash.com/photo-1566516171511-1c411a59c8a0?w=600&auto=format&fit=crop&q=80",
    rating: 4.9, reviews: 105,
    highlights: ["100% fine cotton yarn", "Vintage bubble silhouette", "Adjustable strap buttonholes", "Elastic leg openings"]
  },
  {
    id: "kd-9",
    name: "Bamboo Lounge Coordinates — Kids",
    category: "kids",
    price: 3199,
    description: "Soft coordinate set with a short-sleeve loose top and shorts in muted beige — silky and breathable for daily play.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&auto=format&fit=crop&q=80",
    rating: 4.8, reviews: 92,
    highlights: ["Viscose-bamboo cotton", "Silky soft breathable", "Tagless neck labels", "Loose comfort play design"]
  },
  {
    id: "kd-10",
    name: "Linen Kids Utility Vest Set",
    category: "kids",
    price: 2999,
    description: "Button-down utility vest in lightweight flax linen. Stylish, unisex, and easy to wear — great for sunny day outings.",
    sizes: ["2-3Y", "3-4Y", "4-5Y", "5-6Y"],
    image: "https://images.unsplash.com/photo-1619086303291-0ef7b414c13e?w=600&auto=format&fit=crop&q=80",
    rating: 4.5, reviews: 47,
    highlights: ["Pure washed linen", "Two-piece vest set", "Unisex styling", "Easy button front"]
  }
];

if (typeof window !== 'undefined') window.PRODUCTS = PRODUCTS;
if (typeof module !== 'undefined' && module.exports) module.exports = PRODUCTS;
