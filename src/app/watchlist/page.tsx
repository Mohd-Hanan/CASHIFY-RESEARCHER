"use client";

import { useState, useEffect } from "react";
import { MOCK_PHONES } from "@/services/mockData";
import PhoneCard from "@/components/PhoneCard";
import { Bookmark, Info } from "lucide-react";

export default function WatchlistPage() {
  const [watchlistIds, setWatchlistIds] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Simulate loading from local storage
    const saved = localStorage.getItem("cashify_watchlist");
    if (saved) {
      setWatchlistIds(JSON.parse(saved));
    } else {
      // Add a couple mock ones if empty for demo
      const demo = [MOCK_PHONES[0].id, MOCK_PHONES[2].id];
      localStorage.setItem("cashify_watchlist", JSON.stringify(demo));
      setWatchlistIds(demo);
    }
    setMounted(true);
  }, []);

  const watchlistedPhones = MOCK_PHONES.filter(p => watchlistIds.includes(p.id));

  const removePhone = (id: string) => {
    const updated = watchlistIds.filter(wid => wid !== id);
    setWatchlistIds(updated);
    localStorage.setItem("cashify_watchlist", JSON.stringify(updated));
  };

  if (!mounted) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3">
        <Bookmark className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your Watchlist</h1>
          <p className="text-muted-foreground mt-1">Tracked devices and smart insights.</p>
        </div>
      </div>

      {watchlistedPhones.length > 0 ? (
        <div className="space-y-6">
          {watchlistedPhones.map(phone => {
            const savingsRs = phone.originalPrice - phone.cashifyPrice;
            const savingsPct = Math.round((savingsRs / phone.originalPrice) * 100);
            
            // Smart insight logic
            let insight = "Wait for a better drop.";
            let insightColor = "text-yellow-700 bg-yellow-50 border-yellow-200";
            
            if (savingsPct >= 40) {
              insight = "Buy Now! Price is exceptionally low.";
              insightColor = "text-green-700 bg-green-50 border-green-200";
            }

            return (
              <div key={phone.id} className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-64 shrink-0">
                  <PhoneCard phone={phone} />
                </div>
                
                <div className="flex-1 w-full space-y-4">
                  <div className={`p-4 rounded-xl border ${insightColor} flex items-start gap-3`}>
                    <Info className="w-5 h-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Smart Insight</h4>
                      <p className="text-sm mt-1">{insight}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <p className="text-muted-foreground mb-1">Target Price</p>
                      <p className="font-semibold">₹{(phone.cashifyPrice - 2000).toLocaleString('en-IN')}</p>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <p className="text-muted-foreground mb-1">Last Updated</p>
                      <p className="font-semibold">Today</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => removePhone(phone.id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
                  >
                    Remove from Watchlist
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl border border-dashed">
          <Bookmark className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-bold">Watchlist is empty</h3>
          <p className="text-muted-foreground">Go to the Latest deals to add phones to track.</p>
        </div>
      )}
    </div>
  );
}
