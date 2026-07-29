import { Phone, PriceHistoryRecord } from '@/types';

const subDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() - days);
  return result;
};

const today = new Date().toISOString();

export const MOCK_PHONES: Phone[] = [
  {
    id: "p1",
    name: "Apple iPhone 13",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&q=80&w=400",
    processor: "A15 Bionic",
    display: "6.1 Super Retina XDR OLED",
    ram: "4GB",
    storage: "128GB",
    battery: "3227 mAh",
    camera: "12MP + 12MP",
    androidVersion: "iOS 17",
    condition: "Superb",
    cashifyAssurance: true,
    originalPrice: 59900,
    cashifyPrice: 38999,
    productUrl: "#",
    availability: true,
    dateAdded: subDays(new Date(), 30).toISOString(),
    lastUpdated: today,
    aiReviewSummary: "Excellent battery life and smooth performance. Current price is a strong value proposition compared to new.",
  },
  {
    id: "p2",
    name: "Samsung Galaxy S23 Ultra 5G",
    brand: "Samsung",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=400",
    processor: "Snapdragon 8 Gen 2",
    display: "6.8 Dynamic AMOLED 2X",
    ram: "12GB",
    storage: "256GB",
    battery: "5000 mAh",
    camera: "200MP + 10MP + 10MP + 12MP",
    androidVersion: "Android 14",
    condition: "Good",
    cashifyAssurance: true,
    originalPrice: 124999,
    cashifyPrice: 76500,
    productUrl: "#",
    availability: true,
    dateAdded: subDays(new Date(), 45).toISOString(),
    lastUpdated: today,
    aiReviewSummary: "Unmatched camera quality and S-Pen utility. Significant depreciation makes it a great refurbished buy.",
  },
  {
    id: "p3",
    name: "Google Pixel 7 Pro 5G",
    brand: "Google",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351cb315?auto=format&fit=crop&q=80&w=400",
    processor: "Google Tensor G2",
    display: "6.7 LTPO AMOLED",
    ram: "12GB",
    storage: "128GB",
    battery: "5000 mAh",
    camera: "50MP + 48MP + 12MP",
    androidVersion: "Android 14",
    condition: "Fair",
    cashifyAssurance: false,
    originalPrice: 84999,
    cashifyPrice: 36000,
    productUrl: "#",
    availability: true,
    dateAdded: subDays(new Date(), 10).toISOString(),
    lastUpdated: today,
    aiReviewSummary: "Incredible still photography. Tensor G2 can run warm, but at this price, it's a steal for camera lovers.",
  },
  {
    id: "p4",
    name: "OnePlus 11 5G",
    brand: "OnePlus",
    image: "https://images.unsplash.com/photo-1678174780517-8e68ef3bd7ec?auto=format&fit=crop&q=80&w=400",
    processor: "Snapdragon 8 Gen 2",
    display: "6.7 Fluid AMOLED",
    ram: "8GB",
    storage: "128GB",
    battery: "5000 mAh",
    camera: "50MP + 32MP + 48MP",
    androidVersion: "Android 14",
    condition: "Like New",
    cashifyAssurance: true,
    originalPrice: 56999,
    cashifyPrice: 39500,
    productUrl: "#",
    availability: false,
    dateAdded: subDays(new Date(), 60).toISOString(),
    lastUpdated: subDays(new Date(), 2).toISOString(),
    aiReviewSummary: "Fast charging and solid performance. A very balanced phone with OxygenOS smoothness.",
  },
  {
    id: "p5",
    name: "Nothing Phone (2)",
    brand: "Nothing",
    image: "https://images.unsplash.com/photo-1690226490890-e3146473554e?auto=format&fit=crop&q=80&w=400",
    processor: "Snapdragon 8+ Gen 1",
    display: "6.7 LTPO OLED",
    ram: "12GB",
    storage: "256GB",
    battery: "4700 mAh",
    camera: "50MP + 50MP",
    androidVersion: "Android 14",
    condition: "Superb",
    cashifyAssurance: true,
    originalPrice: 49999,
    cashifyPrice: 31000,
    productUrl: "#",
    availability: true,
    dateAdded: subDays(new Date(), 15).toISOString(),
    lastUpdated: today,
    aiReviewSummary: "Unique Glyph interface and fluid software. A great daily driver that stands out from the crowd.",
  },
  {
    id: "p6",
    name: "Apple iPhone 14 Pro",
    brand: "Apple",
    image: "https://images.unsplash.com/photo-1663465374824-34208a9f345f?auto=format&fit=crop&q=80&w=400",
    processor: "A16 Bionic",
    display: "6.1 Super Retina XDR OLED",
    ram: "6GB",
    storage: "256GB",
    battery: "3200 mAh",
    camera: "48MP + 12MP + 12MP",
    androidVersion: "iOS 17",
    condition: "Like New",
    cashifyAssurance: true,
    originalPrice: 129900,
    cashifyPrice: 84000,
    productUrl: "#",
    availability: true,
    dateAdded: subDays(new Date(), 20).toISOString(),
    lastUpdated: today,
    aiReviewSummary: "Dynamic Island and an upgraded 48MP camera make it a worthy upgrade over the 13 Pro. Excellent display.",
  }
];

export const MOCK_HISTORY: PriceHistoryRecord[] = [];

// Generate realistic mock history for the last 30 days
MOCK_PHONES.forEach(phone => {
  let currentPrice = phone.cashifyPrice + (Math.floor(Math.random() * 5) * 2000) + 2000; // start higher
  for (let i = 30; i >= 0; i--) {
    // Drop price randomly a few times
    if (Math.random() > 0.8) {
      currentPrice = currentPrice - (Math.floor(Math.random() * 5) * 500);
      // Don't drop below current price
      if (currentPrice < phone.cashifyPrice) currentPrice = phone.cashifyPrice;
    }
    // On day 0 (today), set to current price
    if (i === 0) currentPrice = phone.cashifyPrice;

    MOCK_HISTORY.push({
      id: `${phone.id}-h${i}`,
      phoneId: phone.id,
      price: currentPrice,
      recordedAt: subDays(new Date(), i).toISOString(),
    });
  }
});
