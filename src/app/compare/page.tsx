"use client";

import { useState } from "react";
import { MOCK_PHONES } from "@/services/mockData";
import { Phone } from "@/types";
import Image from "next/image";
import { Check, X, ArrowRightLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ComparePage() {
  const [phone1Id, setPhone1Id] = useState<string>(MOCK_PHONES[0].id);
  const [phone2Id, setPhone2Id] = useState<string>(MOCK_PHONES[1].id);

  const phone1 = MOCK_PHONES.find(p => p.id === phone1Id);
  const phone2 = MOCK_PHONES.find(p => p.id === phone2Id);

  const specs = [
    { label: "Price", key: "cashifyPrice" as keyof Phone, format: (v: any) => `₹${v.toLocaleString('en-IN')}`, better: 'lower' },
    { label: "Processor", key: "processor" as keyof Phone },
    { label: "RAM", key: "ram" as keyof Phone },
    { label: "Storage", key: "storage" as keyof Phone },
    { label: "Battery", key: "battery" as keyof Phone },
    { label: "Display", key: "display" as keyof Phone },
    { label: "Camera", key: "camera" as keyof Phone },
    { label: "Condition", key: "condition" as keyof Phone },
  ];

  const renderHighlight = (spec: any, val1: any, val2: any, isPhone1: boolean) => {
    if (spec.key === 'cashifyPrice') {
      if (val1 === val2) return "";
      const isLowest = val1 < val2;
      return (isLowest && isPhone1) || (!isLowest && !isPhone1) ? "text-green-600 font-bold bg-green-50 px-2 py-0.5 rounded" : "";
    }
    // Add more complex highlight logic here for RAM, Battery, etc. if needed.
    return "";
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-5xl mx-auto">
      <div className="text-center space-y-2 mb-10">
        <h1 className="text-3xl font-bold tracking-tight">Compare Phones</h1>
        <p className="text-muted-foreground">Select two phones to compare specs side-by-side.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start relative">
        <div className="hidden md:flex absolute left-1/2 top-[10%] -translate-x-1/2 -translate-y-1/2 bg-white border shadow-sm rounded-full p-3 z-10">
          <ArrowRightLeft className="w-5 h-5 text-muted-foreground" />
        </div>

        {/* Phone 1 Selector */}
        <div className="space-y-6">
          <select 
            value={phone1Id} 
            onChange={(e) => setPhone1Id(e.target.value)}
            className="w-full p-3 rounded-xl border bg-background text-lg font-semibold focus:ring-2 focus:ring-primary/20 outline-none"
          >
            {MOCK_PHONES.map(p => (
              <option key={p.id} value={p.id} disabled={p.id === phone2Id}>{p.name}</option>
            ))}
          </select>
          
          {phone1 && (
            <div className="bg-card rounded-2xl border p-6 text-center space-y-4 shadow-sm">
              <div className="relative w-48 h-48 mx-auto">
                <Image src={phone1.image} alt={phone1.name} fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-xl">{phone1.name}</h3>
                <p className="text-2xl font-black mt-2 text-primary">₹{phone1.cashifyPrice.toLocaleString('en-IN')}</p>
                <p className="text-sm text-green-600 font-medium">Save ₹{(phone1.originalPrice - phone1.cashifyPrice).toLocaleString('en-IN')}</p>
              </div>
            </div>
          )}
        </div>

        {/* Phone 2 Selector */}
        <div className="space-y-6">
          <select 
            value={phone2Id} 
            onChange={(e) => setPhone2Id(e.target.value)}
            className="w-full p-3 rounded-xl border bg-background text-lg font-semibold focus:ring-2 focus:ring-primary/20 outline-none"
          >
            {MOCK_PHONES.map(p => (
              <option key={p.id} value={p.id} disabled={p.id === phone1Id}>{p.name}</option>
            ))}
          </select>
          
          {phone2 && (
            <div className="bg-card rounded-2xl border p-6 text-center space-y-4 shadow-sm">
              <div className="relative w-48 h-48 mx-auto">
                <Image src={phone2.image} alt={phone2.name} fill className="object-contain" />
              </div>
              <div>
                <h3 className="font-bold text-xl">{phone2.name}</h3>
                <p className="text-2xl font-black mt-2 text-primary">₹{phone2.cashifyPrice.toLocaleString('en-IN')}</p>
                <p className="text-sm text-green-600 font-medium">Save ₹{(phone2.originalPrice - phone2.cashifyPrice).toLocaleString('en-IN')}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Comparison Table */}
      {phone1 && phone2 && (
        <div className="mt-12 bg-white rounded-2xl border overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <tbody>
              {specs.map((spec, idx) => (
                <tr key={spec.key} className={cn("border-b last:border-0", idx % 2 === 0 ? "bg-secondary/20" : "")}>
                  <td className="py-4 px-6 font-medium text-muted-foreground w-1/4 border-r">{spec.label}</td>
                  <td className="py-4 px-6 w-3/8 border-r">
                    <span className={renderHighlight(spec, phone1[spec.key], phone2[spec.key], true)}>
                      {spec.format ? spec.format(phone1[spec.key]) : String(phone1[spec.key])}
                    </span>
                  </td>
                  <td className="py-4 px-6 w-3/8">
                    <span className={renderHighlight(spec, phone1[spec.key], phone2[spec.key], false)}>
                      {spec.format ? spec.format(phone2[spec.key]) : String(phone2[spec.key])}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
