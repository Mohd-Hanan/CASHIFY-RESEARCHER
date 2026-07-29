"use client";

import Image from "next/image";
import { Phone } from "@/types";
import { BadgeCheck, Cpu, HardDrive, Cpu as Memory, Battery, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface PhoneCardProps {
  phone: Phone;
}

export default function PhoneCard({ phone }: PhoneCardProps) {
  const savingsRs = phone.originalPrice - phone.cashifyPrice;
  const savingsPct = Math.round((savingsRs / phone.originalPrice) * 100);

  return (
    <div className="group relative bg-card rounded-2xl border p-4 transition-all hover:shadow-lg flex flex-col h-full">
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        <div className="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded-md shadow-sm">
          Save {savingsPct}%
        </div>
        {!phone.availability && (
          <div className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded-md shadow-sm flex items-center gap-1">
            <AlertCircle className="w-3 h-3" /> Out of Stock
          </div>
        )}
      </div>

      {/* Image */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden mb-4 bg-secondary/50">
        <Image
          src={phone.image}
          alt={phone.name}
          fill
          className="object-contain p-4 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Title & Price */}
      <div className="mb-4 flex-grow">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2">{phone.name}</h3>
          {phone.cashifyAssurance && (
            <BadgeCheck className="w-5 h-5 text-blue-500 shrink-0 ml-2" />
          )}
        </div>
        <p className="text-sm text-muted-foreground">{phone.condition} Condition</p>
        
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold">₹{phone.cashifyPrice.toLocaleString('en-IN')}</span>
          <span className="text-sm text-muted-foreground line-through">₹{phone.originalPrice.toLocaleString('en-IN')}</span>
        </div>
      </div>

      {/* Specs Mini-grid */}
      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground mb-4 bg-secondary/50 p-3 rounded-lg">
        <div className="flex items-center gap-1.5">
          <Memory className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{phone.ram}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <HardDrive className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{phone.storage}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{phone.processor}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Battery className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">{phone.battery}</span>
        </div>
      </div>

      {/* AI Summary */}
      <div className="mb-4 text-sm bg-blue-50 text-blue-900 p-3 rounded-lg border border-blue-100 relative">
        <div className="absolute -top-2 -right-2 bg-blue-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm">AI</div>
        <p className="line-clamp-3 italic">"{phone.aiReviewSummary}"</p>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-auto">
        <button 
          className={cn(
            "flex-1 py-2 rounded-lg font-medium transition-colors text-sm",
            phone.availability 
              ? "bg-primary text-primary-foreground hover:bg-primary/90" 
              : "bg-secondary text-muted-foreground cursor-not-allowed"
          )}
          disabled={!phone.availability}
        >
          {phone.availability ? "Buy Now" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}
