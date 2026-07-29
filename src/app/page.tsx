"use client";

import { useState } from "react";
import PhoneCard from "@/components/PhoneCard";
import { MOCK_PHONES } from "@/services/mockData";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { Phone } from "@/types";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter States
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");
  const [selectedRam, setSelectedRam] = useState("All");
  const [selectedStorage, setSelectedStorage] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [selectedAssurance, setSelectedAssurance] = useState("All");
  
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Filter Options
  const brands = ["All", ...Array.from(new Set(MOCK_PHONES.map(p => p.brand)))];
  const rams = ["All", ...Array.from(new Set(MOCK_PHONES.map(p => p.ram)))];
  const storages = ["All", ...Array.from(new Set(MOCK_PHONES.map(p => p.storage)))];
  const conditions = ["All", ...Array.from(new Set(MOCK_PHONES.map(p => p.condition)))];

  const filteredPhones = MOCK_PHONES.filter((phone) => {
    const matchesSearch = phone.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          phone.processor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrand === "All" || phone.brand === selectedBrand;
    const matchesRam = selectedRam === "All" || phone.ram === selectedRam;
    const matchesStorage = selectedStorage === "All" || phone.storage === selectedStorage;
    const matchesCondition = selectedCondition === "All" || phone.condition === selectedCondition;
    
    let matchesPrice = true;
    if (selectedPrice === "Under ₹30,000") matchesPrice = phone.cashifyPrice < 30000;
    if (selectedPrice === "₹30,000 - ₹50,000") matchesPrice = phone.cashifyPrice >= 30000 && phone.cashifyPrice <= 50000;
    if (selectedPrice === "Over ₹50,000") matchesPrice = phone.cashifyPrice > 50000;

    let matchesAssurance = true;
    if (selectedAssurance === "Assured Only") matchesAssurance = phone.cashifyAssurance === true;

    return matchesSearch && matchesBrand && matchesPrice && matchesRam && matchesStorage && matchesCondition && matchesAssurance;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header & Main Filters */}
      <div className="bg-secondary/30 p-6 rounded-2xl border space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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
                className="w-full sm:w-64 pl-9 pr-4 py-2.5 rounded-xl border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all text-sm"
              />
            </div>
            
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border bg-background hover:bg-secondary transition-colors text-sm font-medium"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showAdvanced ? "rotate-180" : ""}`} />
            </button>
          </div>
        </div>

        {/* Advanced Filters Drawer */}
        {showAdvanced && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 pt-4 border-t border-dashed animate-in slide-in-from-top-2">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground ml-1">Brand</label>
              <select value={selectedBrand} onChange={(e) => setSelectedBrand(e.target.value)} className="w-full p-2 text-sm rounded-lg border bg-white outline-none focus:ring-2 focus:ring-primary/20">
                {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground ml-1">Price Range</label>
              <select value={selectedPrice} onChange={(e) => setSelectedPrice(e.target.value)} className="w-full p-2 text-sm rounded-lg border bg-white outline-none focus:ring-2 focus:ring-primary/20">
                <option value="All">All Prices</option>
                <option value="Under ₹30,000">Under ₹30,000</option>
                <option value="₹30,000 - ₹50,000">₹30,000 - ₹50,000</option>
                <option value="Over ₹50,000">Over ₹50,000</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground ml-1">RAM</label>
              <select value={selectedRam} onChange={(e) => setSelectedRam(e.target.value)} className="w-full p-2 text-sm rounded-lg border bg-white outline-none focus:ring-2 focus:ring-primary/20">
                {rams.map(ram => <option key={ram} value={ram}>{ram}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground ml-1">Storage</label>
              <select value={selectedStorage} onChange={(e) => setSelectedStorage(e.target.value)} className="w-full p-2 text-sm rounded-lg border bg-white outline-none focus:ring-2 focus:ring-primary/20">
                {storages.map(storage => <option key={storage} value={storage}>{storage}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground ml-1">Condition</label>
              <select value={selectedCondition} onChange={(e) => setSelectedCondition(e.target.value)} className="w-full p-2 text-sm rounded-lg border bg-white outline-none focus:ring-2 focus:ring-primary/20">
                {conditions.map(condition => <option key={condition} value={condition}>{condition}</option>)}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-muted-foreground ml-1">Assurance</label>
              <select value={selectedAssurance} onChange={(e) => setSelectedAssurance(e.target.value)} className="w-full p-2 text-sm rounded-lg border bg-white outline-none focus:ring-2 focus:ring-primary/20">
                <option value="All">All</option>
                <option value="Assured Only">Cashify Assured</option>
              </select>
            </div>
          </div>
        )}
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
            onClick={() => { 
              setSearchQuery(""); setSelectedBrand("All"); setSelectedPrice("All");
              setSelectedRam("All"); setSelectedStorage("All"); setSelectedCondition("All");
              setSelectedAssurance("All");
            }}
            className="mt-4 text-sm font-medium text-primary hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
