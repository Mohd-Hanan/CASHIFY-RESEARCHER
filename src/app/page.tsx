"use client";

import { useState } from "react";
import PhoneCard from "@/components/PhoneCard";
import { MOCK_PHONES } from "@/services/mockData";
import { Search, SlidersHorizontal } from "lucide-react";
import { Phone } from "@/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");

  const brands = ["All", ...Array.from(new Set(MOCK_PHONES.map(p => p.brand)))];

  const filteredPhones = MOCK_PHONES.filter((phone) => {
    const matchesSearch = phone.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          phone.processor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === "All" || phone.brand === selectedBrand;
    return matchesSearch && matchesBrand;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-secondary/30 p-6 rounded-2xl border">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Latest Refurbished Deals</h1>
          <p className="text-muted-foreground mt-1">Real-time tracking of the best value phones.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search phones, processors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full sm:w-64 pl-9 pr-4 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative">
              <select 
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm font-medium"
              >
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      {filteredPhones.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-secondary/20 rounded-2xl border border-dashed">
          <p className="text-muted-foreground">No phones found matching your criteria.</p>
          <button 
            onClick={() => { setSearchQuery(""); setSelectedBrand("All"); }}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
