import { Product } from "../types";

export const RFID_PRODUCTS: Product[] = [
  {
    id: "sparkle-sr-100-reader",
    name: "Sparkle SR-100 Multi-Port Fixed Reader",
    tagline: "The absolute benchmark for luxury retail showrooms & exit gate security portals",
    category: "scanners",
    description: "Designed specifically for high-end jewelry showrooms, smart showcases, and store exit gates. Featuring an elegant anodized graphite casing, 4 monostatic antenna ports, and raw processing capability to track over 1,100 security tags per second with absolute accuracy.",
    price: 1499.00,
    readRange: "Up to 12 meters (antenna dependent)",
    frequency: "UHF (860 - 960 MHz) Global Support",
    stockStatus: "In Stock",
    imageSeed: "apex_fixed_reader",
    specs: [
      { label: "Antenna Ports", value: "4 Monostatic (RP-TNC)" },
      { label: "IP Rating", value: "IP53 Premium Aluminum Shell" },
      { label: "Protocols", value: "EPC Gen2v2, ISO 18000-63" },
      { label: "Connectivity", value: "Ethernet PoE+, USB, GPIO, RS-232" },
      { label: "Max Read Rate", value: "1,100 tags / sec" }
    ],
    bulkTiers: [
      { minQty: 5, discountPercent: 10 },
      { minQty: 10, discountPercent: 18 },
      { minQty: 50, discountPercent: 25 },
      { minQty: 200, discountPercent: 38 }
    ]
  },
  {
    id: "sparkle-st-301-handheld",
    name: "Sparkle ST-301 Rugged Handheld Scanner",
    tagline: "Ergonomic mobile inventory computer for lightning-fast showcase audits",
    category: "scanners",
    description: "Conduct instant glass case audits and track up to 2,000 precious items in seconds. Features an ergonomic pistol trigger, high-capacity hot-swappable battery, Android OS, and an integrated circularly polarized antenna that ignores metal and liquid interference.",
    price: 1199.00,
    readRange: "Up to 9 meters",
    frequency: "UHF (865 - 928 MHz)",
    stockStatus: "Low Stock",
    imageSeed: "ranger_handheld_gun",
    specs: [
      { label: "Operating System", value: "Android 12 Enterprise Certified" },
      { label: "Drop Spec", value: "2.0m (6.5 ft) drop to concrete" },
      { label: "Battery", value: "7,000mAh Lithium-Ion Hot-Swap" },
      { label: "Display", value: "5.5 inch outdoor-readable Gorilla Glass" },
      { label: "Keypad", value: "Pistol grip trigger + physical alphanumeric keys" }
    ],
    bulkTiers: [
      { minQty: 5, discountPercent: 12 },
      { minQty: 15, discountPercent: 20 },
      { minQty: 50, discountPercent: 28 },
      { minQty: 150, discountPercent: 40 }
    ]
  },
  {
    id: "sparkle-st-500-tray",
    name: "Sparkle Smart Velvet Tray",
    tagline: "Bespoke velvet showcase tray with integrated low-profile RFID reader",
    category: "smart-trays",
    description: "Handcrafted from solid mahogany and lined with luxury velvet. Instantly reads rings, watches, and diamonds inside it, displaying pricing specs on showroom screens and logging customer trial durations automatically.",
    price: 899.00,
    readRange: "Up to 0.4 meters (near field focus)",
    frequency: "UHF (860 - 960 MHz) Near-Field Pattern",
    stockStatus: "In Stock",
    imageSeed: "scribe_400_printer", // fallback seed
    specs: [
      { label: "Chassis Material", value: "Velvet + Solid Mahogany" },
      { label: "Interface", value: "Bluetooth 5.0, USB-C, Wi-Fi" },
      { label: "Battery Life", value: "12 hours active showcase display" },
      { label: "Alert triggers", value: "Out-of-tray vibration alert" },
      { label: "RFID Chipset", value: "Impinj Indy R2000 focus module" }
    ],
    bulkTiers: [
      { minQty: 5, discountPercent: 8 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 25, discountPercent: 20 },
      { minQty: 100, discountPercent: 30 }
    ]
  },
  {
    id: "sparkle-eg-900-gate",
    name: "Sparkle EAS-900 Shield Gates",
    tagline: "High-sensitivity exit gate security portals optimized for jewelry showrooms",
    category: "eas-gates",
    description: "Sleek glass security panels placed at store entrances. Instantly alarms when unauthorized tags cross the threshold, while ignoring tags inside nearby glass display cases through highly focused RF shields.",
    price: 2499.00,
    readRange: "Up to 2.5 meters exit width",
    frequency: "Dual UHF (860-960 MHz) + EAS 8.2 MHz",
    stockStatus: "Made to Order",
    imageSeed: "signpost_antenna", // fallback seed
    specs: [
      { label: "Gate Width", value: "Supports 1.2m to 2.5m corridors" },
      { label: "Alarms", value: "Flashing LED + 95dB sound indicator" },
      { label: "Shielding", value: "Directional metal back-reflector" },
      { label: "Material", value: "Tempered Glass & Polished Steel" },
      { label: "Database Sync", value: "Direct IP link with Sparkle ERP" }
    ],
    bulkTiers: [
      { minQty: 2, discountPercent: 5 },
      { minQty: 5, discountPercent: 10 },
      { minQty: 10, discountPercent: 18 }
    ]
  },
  {
    id: "sparkle-rt-10-reusable",
    name: "Sparkle Reusable Gold Clasp Tags",
    tagline: "Premium alloy clasp security tags with integrated micro-RFID chips",
    category: "reusable-tags",
    description: "Designed for gold rings and necklaces. Features a padded alloy clasp that secures onto items without scratching. Can be unlocked and re-programmed up to 100,000 times for new stock lines.",
    price: 49.00,
    readRange: "Up to 3 meters",
    frequency: "UHF EPC Class 1 Gen 2",
    stockStatus: "In Stock (Bulk packs of 100)",
    imageSeed: "apex_fixed_reader", // fallback seed
    specs: [
      { label: "Pack Size", value: "100 Clasp Tags per pack" },
      { label: "Lock Spec", value: "Micro magnetic clutch system" },
      { label: "Dimensions", value: "18mm x 12mm x 4mm" },
      { label: "Frequency", value: "UHF Global 860-960 MHz" },
      { label: "Memory", value: "96-bit EPC + 512-bit User Memory" }
    ],
    bulkTiers: [
      { minQty: 10, discountPercent: 10 },
      { minQty: 50, discountPercent: 20 },
      { minQty: 100, discountPercent: 30 }
    ]
  },
  {
    id: "sparkle-ot-20-onetime",
    name: "Sparkle Micro Adhesive One-Time Tags",
    tagline: "Vandal-evident self-adhesive tag loops for quick item labeling",
    category: "onetime-tags",
    description: "Disposable micro-label loops designed to attach to chains, bracelets, and rings. Automatically de-tunes and self-destructs if tampered with or cut, preventing tag swapping in high-risk environments.",
    price: 15.00,
    readRange: "Up to 2 meters",
    frequency: "UHF (860-960 MHz)",
    stockStatus: "In Stock (Bulk rolls of 1000)",
    imageSeed: "scribe_400_printer", // fallback seed
    specs: [
      { label: "Roll Size", value: "1,000 tags per roll" },
      { label: "Adhesive Type", value: "Residue-free structural adhesive" },
      { label: "Vandal Spec", value: "Fracture-sensitive aluminum antenna" },
      { label: "Format", value: "Micro flag loop (25mm flag length)" },
      { label: "Printable", value: "Optimized for Scribe-400 printer" }
    ],
    bulkTiers: [
      { minQty: 5, discountPercent: 15 },
      { minQty: 20, discountPercent: 25 },
      { minQty: 50, discountPercent: 35 }
    ]
  },
  {
    id: "sparkle-scribe-400-printer",
    name: "Sparkle Scribe-400 Precision Tag Printer",
    tagline: "Simultaneous high-speed thermal printing and micro-chip encoding",
    category: "printers",
    description: "An absolute powerhouse for luxury labeling. Engineered specifically for micro-caliber jewelry hangtags, adhesive barcode labels, and delicate packaging tags. Automatically prints high-definition 300 DPI graphics and encodes RFID chips on the fly.",
    price: 2199.00,
    readRange: "Near-field encoding calibration",
    frequency: "UHF EPC Gen2, HF, and NFC capabilities",
    stockStatus: "In Stock",
    imageSeed: "scribe_400_printer",
    specs: [
      { label: "Print Width", value: "4.09 inches (104 mm) max" },
      { label: "Resolution", value: "300 DPI high-definition thermal" },
      { label: "Print Speed", value: "Up to 14 inches / second" },
      { label: "Ribbon Capacity", value: "450 meters (heavy industrial)" },
      { label: "Encoding Engine", value: "Adaptive Auto-Calibration" }
    ],
    bulkTiers: [
      { minQty: 3, discountPercent: 8 },
      { minQty: 10, discountPercent: 15 },
      { minQty: 25, discountPercent: 22 },
      { minQty: 100, discountPercent: 35 }
    ]
  },
  {
    id: "sparkle-sa-200-antenna",
    name: "Sparkle SA-200 High-Gain RFID Antenna",
    tagline: "Minimalist ultra-thin circularly polarized panel antenna",
    category: "accessories",
    description: "Slender panel antenna designed for beautiful under-counter, desktop tray, or wall-mount placement in high-end retail environments. Offers a highly focused beam width to avoid false scans and eliminate tracking spillover.",
    price: 299.00,
    readRange: "Extends read zones up to 14 meters",
    frequency: "UHF 860 - 960 MHz Wideband",
    stockStatus: "In Stock",
    imageSeed: "signpost_antenna",
    specs: [
      { label: "Gain", value: "9.0 dBi Circularly Polarized" },
      { label: "Beam Width", value: "70° horizontal, 70° vertical" },
      { label: "IP Rating", value: "IP67 Weatherproof and dustproof" },
      { label: "Mounting", value: "VESA 100 Standard bracket included" },
      { label: "Connector Type", value: "N-Female (integrated)" }
    ],
    bulkTiers: [
      { minQty: 10, discountPercent: 15 },
      { minQty: 50, discountPercent: 25 },
      { minQty: 200, discountPercent: 35 },
      { minQty: 500, discountPercent: 45 }
    ]
  }
];

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  type: "b2b" | "b2c";
  rating: number;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    quote: "Deploying Sparkle RFID exit gate portals and SA-200 antennas across our 15 luxury jewelry boutiques reduced our inventory audit time from 8 hours to under 3 minutes, with zero missed assets.",
    author: "Arjun Patel",
    role: "Technology Lead",
    company: "Luxore Jewelry Group",
    type: "b2b",
    rating: 5
  },
  {
    id: "test-2",
    quote: "I bought a single Sparkle ST-301 Scanner and 1,000 micro-tags for my watch shop. I can now do a full morning stock take in under a minute without opening glass cases.",
    author: "Elena Rostova",
    role: "Owner & Lead Designer",
    company: "Rostova Fine Jewelry",
    type: "b2c",
    rating: 5
  },
  {
    id: "test-3",
    quote: "Sparkle's custom calibrations and gold node systems completely solved signal bounce from metallic silver and platinum pieces. Their API integrated flawlessly into our custom POS showroom platform.",
    author: "Dinesh Patel",
    role: "Systems Integration Director",
    company: "Vance Retail Group",
    type: "b2b",
    rating: 5
  },
  {
    id: "test-4",
    quote: "Testing Sparkle's micro adhesive RFID tags on diamond jewelry has been brilliant. Their direct online purchase path made securing hardware simple, without needing high-volume enterprise sales hoops.",
    author: "Liam Chen",
    role: "Boutique Pilot Coordinator",
    company: "Omni Gem Labs",
    type: "b2c",
    rating: 4.8
  }
];
