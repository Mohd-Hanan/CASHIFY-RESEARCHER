"use client";

import { MOCK_PHONES } from "@/services/mockData";
import PhoneCard from "@/components/PhoneCard";
import { Trophy, Battery, Camera, Cpu, Gamepad2, Banknote, Sparkles, TrendingDown } from "lucide-react";
import { Phone } from "@/types";

export default function RecommendationsPage() {
  
  // Best Overall: High specs, good condition, great savings
  const bestOverall = [...MOCK_PHONES].sort((a, b) => {
    const scoreA = (a.originalPrice - a.cashifyPrice) / a.originalPrice + (a.condition === "Superb" || a.condition === "Like New" ? 0.2 : 0);
    const scoreB = (b.originalPrice - b.cashifyPrice) / b.originalPrice + (b.condition === "Superb" || b.condition === "Like New" ? 0.2 : 0);
    return scoreB - scoreA;
  })[0];

  // Budget King: Lowest price, decent specs
  const budgetKing = [...MOCK_PHONES].sort((a, b) => a.cashifyPrice - b.cashifyPrice)[0];

  // Best Camera: Pixel or S23 Ultra usually
  const bestCamera = MOCK_PHONES.find(p => p.name.includes("Pixel") || p.name.includes("Ultra")) || MOCK_PHONES[0];

  // Biggest Discount
  const biggestDiscount = [...MOCK_PHONES].sort((a, b) => {
    return ((b.originalPrice - b.cashifyPrice) / b.originalPrice) - ((a.originalPrice - a.cashifyPrice) / a.originalPrice);
  })[0];

  const categories = [
    { title: "Best Overall Value", icon: Trophy, phone: bestOverall, color: "text-yellow-600", bg: "bg-yellow-100", reason: "Excellent balance of condition, specifications, and total savings." },
    { title: "Budget King", icon: Banknote, phone: budgetKing, color: "text-green-600", bg: "bg-green-100", reason: "The most affordable entry point without sacrificing core features." },
    { title: "Best for Photography", icon: Camera, phone: bestCamera, color: "text-blue-600", bg: "bg-blue-100", reason: "Class-leading camera sensors and computational photography." },
    { title: "Biggest Discount", icon: TrendingDown, phone: biggestDiscount, color: "text-red-600", bg: "bg-red-100", reason: "Currently offering the highest percentage drop from original MRP." }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl font-bold tracking-tight">AI Recommendations</h1>
        <p className="text-muted-foreground">Smart picks based on value score, specs, and historical pricing.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, idx) => (
          <div key={idx} className="bg-white rounded-3xl border shadow-sm p-6 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 w-full max-w-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${cat.bg} ${cat.color}`}>
                  <cat.icon className="w-6 h-6" />
                </div>
                <h2 className="text-xl font-bold">{cat.title}</h2>
              </div>
              <p className="text-muted-foreground text-sm italic mb-6">"{cat.reason}"</p>
            </div>
            
            <div className="w-full md:w-64 shrink-0">
              {cat.phone && <PhoneCard phone={cat.phone} />}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
