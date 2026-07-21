export interface BulkDiscountTier {
  minQty: number;
  discountPercent: number; // e.g., 10 for 10%
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: "scanners" | "printers" | "handhelds" | "accessories" | "smart-trays" | "eas-gates" | "reusable-tags" | "onetime-tags";
  description: string;
  price: number; // B2C retail single-unit price
  readRange?: string;
  frequency?: string;
  stockStatus: "In Stock" | "Low Stock" | "Contact Sales" | "Made to Order" | "In Stock (Bulk packs of 100)" | "In Stock (Bulk rolls of 1000)";
  imageSeed: string; // seed for picsum or SVG identifier
  specs: ProductSpec[];
  bulkTiers: BulkDiscountTier[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface RecommendedHardwareItem {
  name: string;
  type: "Scanner" | "Printer" | "Scanner Gun" | "Accessory";
  qty: number;
  reason: string;
}

export interface AISolution {
  title: string;
  frequency: string;
  frequencyReason: string;
  recommendedHardware: RecommendedHardwareItem[];
  tagStrategy: string;
  integrationComplexity: "Low" | "Medium" | "High";
  estimatedROI: string;
  b2bIntegrationTips: string[];
  b2cPurchaseNote: string;
}

export interface B2CFormData {
  fullName: string;
  email: string;
  phone: string;
  productInterest: string;
  quantity: number;
  shippingAddress: string;
  message: string;
}

export interface B2BFormData {
  fullName: string;
  companyName: string;
  email: string;
  phone: string;
  productInterest: string;
  estimatedVolume: number;
  integrationNeeds: string; // e.g., ERP, SDK, Cloud Sync
  message: string;
}
