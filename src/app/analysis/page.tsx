"use client";

import { useState } from "react";
import { MOCK_PHONES } from "@/services/mockData";
import { ArrowUpDown } from "lucide-react";
import { Phone } from "@/types";
import { cn } from "@/lib/utils";

export default function AnalysisPage() {
  const [sortField, setSortField] = useState<keyof Phone | "savingsRs" | "savingsPct">("savingsPct");
  const [sortDesc, setSortDesc] = useState(true);

  const sortedPhones = [...MOCK_PHONES].sort((a, b) => {
    let valA: any = a[sortField as keyof Phone];
    let valB: any = b[sortField as keyof Phone];

    if (sortField === "savingsRs") {
      valA = a.originalPrice - a.cashifyPrice;
      valB = b.originalPrice - b.cashifyPrice;
    } else if (sortField === "savingsPct") {
      valA = (a.originalPrice - a.cashifyPrice) / a.originalPrice;
      valB = (b.originalPrice - b.cashifyPrice) / b.originalPrice;
    }

    if (valA < valB) return sortDesc ? 1 : -1;
    if (valA > valB) return sortDesc ? -1 : 1;
    return 0;
  });

  const toggleSort = (field: string) => {
    if (sortField === field) {
      setSortDesc(!sortDesc);
    } else {
      setSortField(field as any);
      setSortDesc(true);
    }
  };

  const SortHeader = ({ field, label }: { field: string, label: string }) => (
    <th 
      className="px-4 py-3 text-left font-semibold text-muted-foreground cursor-pointer hover:text-black transition-colors"
      onClick={() => toggleSort(field)}
    >
      <div className="flex items-center gap-1">
        {label}
        <ArrowUpDown className={cn("w-3 h-3", sortField === field ? "text-primary" : "text-muted-foreground/30")} />
      </div>
    </th>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Price Analysis</h1>
        <p className="text-muted-foreground mt-1">Detailed breakdown of all tracked devices.</p>
      </div>

      <div className="bg-white rounded-2xl border shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 border-b">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Phone</th>
              <SortHeader field="originalPrice" label="Original Price" />
              <SortHeader field="cashifyPrice" label="Cashify Price" />
              <SortHeader field="savingsRs" label="Savings (₹)" />
              <SortHeader field="savingsPct" label="Savings (%)" />
              <th className="px-4 py-3 text-left font-semibold text-muted-foreground">Deal Quality</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {sortedPhones.map((phone) => {
              const savingsRs = phone.originalPrice - phone.cashifyPrice;
              const savingsPct = Math.round((savingsRs / phone.originalPrice) * 100);
              
              let dealBadge = <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-medium">Average Deal</span>;
              if (savingsPct >= 40) dealBadge = <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">Excellent Deal</span>;
              else if (savingsPct >= 25) dealBadge = <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded text-xs font-medium">Good Deal</span>;

              return (
                <tr key={phone.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-4 font-medium flex items-center gap-3">
                    <div className="w-10 h-10 relative rounded-md bg-secondary flex-shrink-0">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={phone.image} alt={phone.name} className="object-contain w-full h-full p-1 mix-blend-multiply" />
                    </div>
                    {phone.name}
                  </td>
                  <td className="px-4 py-4">₹{phone.originalPrice.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-4 font-bold text-primary">₹{phone.cashifyPrice.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-4 text-green-600 font-medium">₹{savingsRs.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-4">{savingsPct}%</td>
                  <td className="px-4 py-4">{dealBadge}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
