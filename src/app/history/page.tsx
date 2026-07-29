"use client";

import { useState } from "react";
import { MOCK_PHONES, MOCK_HISTORY } from "@/services/mockData";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingDown, TrendingUp, DollarSign } from "lucide-react";

export default function HistoryPage() {
  const [selectedPhoneId, setSelectedPhoneId] = useState(MOCK_PHONES[0].id);
  const [timeRange, setTimeRange] = useState<number>(30); // days

  const phone = MOCK_PHONES.find(p => p.id === selectedPhoneId);
  
  // Filter history for selected phone and time range
  const phoneHistory = MOCK_HISTORY
    .filter(h => h.phoneId === selectedPhoneId)
    .sort((a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime());

  // Cut to timeRange
  const displayHistory = phoneHistory.slice(-timeRange);

  // Stats
  const prices = displayHistory.map(h => h.price);
  const lowestPrice = Math.min(...prices);
  const highestPrice = Math.max(...prices);
  const currentPrice = prices[prices.length - 1];
  
  // Format date for chart
  const chartData = displayHistory.map(h => {
    const date = new Date(h.recordedAt);
    return {
      date: `${date.getDate()} ${date.toLocaleString('default', { month: 'short' })}`,
      price: h.price
    };
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Price History Tracker</h1>
        <p className="text-muted-foreground mt-1">Know exactly when to buy by tracking historical price drops.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between bg-white p-4 rounded-2xl border shadow-sm">
        <select 
          value={selectedPhoneId} 
          onChange={(e) => setSelectedPhoneId(e.target.value)}
          className="w-full md:w-96 p-2.5 rounded-xl border bg-background text-sm font-semibold focus:ring-2 focus:ring-primary/20 outline-none"
        >
          {MOCK_PHONES.map(p => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <div className="flex bg-secondary p-1 rounded-xl">
          {[7, 30, 90].map(days => (
            <button
              key={days}
              onClick={() => setTimeRange(days)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${timeRange === days ? 'bg-white shadow-sm' : 'text-muted-foreground hover:text-black'}`}
            >
              {days} Days
            </button>
          ))}
        </div>
      </div>

      {phone && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <DollarSign className="w-5 h-5" />
                <h3 className="font-medium text-sm">Current Price</h3>
              </div>
              <p className="text-2xl font-bold">₹{currentPrice.toLocaleString('en-IN')}</p>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <TrendingDown className="w-5 h-5 text-green-500" />
                <h3 className="font-medium text-sm">Lowest Recorded</h3>
              </div>
              <p className="text-2xl font-bold text-green-600">₹{lowestPrice.toLocaleString('en-IN')}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              <div className="flex items-center gap-3 text-muted-foreground mb-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <h3 className="font-medium text-sm">Highest Recorded</h3>
              </div>
              <p className="text-2xl font-bold text-red-500">₹{highestPrice.toLocaleString('en-IN')}</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border shadow-sm flex flex-col justify-center items-center text-center">
              {currentPrice === lowestPrice ? (
                <>
                  <span className="text-4xl">🔥</span>
                  <p className="font-bold text-sm mt-2 text-green-600">Lowest Price Ever</p>
                  <p className="text-xs text-muted-foreground">Great time to buy!</p>
                </>
              ) : (
                <>
                  <span className="text-4xl">⏳</span>
                  <p className="font-bold text-sm mt-2 text-yellow-600">Wait for a Drop</p>
                  <p className="text-xs text-muted-foreground">Currently ₹{(currentPrice - lowestPrice).toLocaleString('en-IN')} above lowest.</p>
                </>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border shadow-sm h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                <YAxis 
                  domain={['dataMin - 2000', 'dataMax + 2000']} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6b7280', fontSize: 12}}
                  tickFormatter={(val) => `₹${val.toLocaleString('en-IN')}`}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: number) => [`₹${value.toLocaleString('en-IN')}`, 'Price']}
                />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke="#000000" 
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#000000', strokeWidth: 2, stroke: '#ffffff' }}
                  activeDot={{ r: 6, fill: '#000000' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}
