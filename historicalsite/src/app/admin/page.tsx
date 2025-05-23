"use client";

import React from "react";
import BarChartClient from '../../components/charts/BarChartClient';

export default function Admin() {
  return (
    <div className="flex h-screen font-sans overflow-hidden">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-[#FAF9F6] p-6 text-sm border-r border-gray-200 overflow-y-auto">
        <h1 className="text-xl font-bold mb-8">History Admin</h1>
        <nav className="space-y-5 text-gray-700">
          <a href="#" className="flex items-center">🏠 <span className="ml-2">Dashboard</span></a>
          <a href="#" className="flex items-center">📄 <span className="ml-2">Posts</span></a>
          <a href="#" className="flex items-center">🏛️ <span className="ml-2">Museums</span></a>
          <a href="#" className="flex items-center">🎟️ <span className="ml-2">Tickets</span></a>
          <a href="#" className="flex items-center">💬 <span className="ml-2">Feedback</span></a>
        </nav>
      </aside> */}

      {/* Main content */}
      <main className="flex-1 h-full overflow-y-auto bg-white p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <div className="space-x-2">
            <button className="border px-3 py-1 rounded bg-blue-600 text-white">7 Days</button>
            <button className="border px-3 py-1 rounded">30 Days</button>
            <button className="border px-3 py-1 rounded">90 Days</button>
          </div>
        </div>

        {/* Stats boxes */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[{ label: "Total Posts", value: "156", change: "↑ 12%", desc: "from last period" },
            { label: "Total Tickets", value: "1289", change: "↑ 18%", desc: "from last period" },
            { label: "Revenue", value: "$24,500", change: "↑ 15%", desc: "from last period" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded shadow border border-gray-100">
              <p>{stat.label}</p>
              <h3 className="text-2xl font-bold text-blue-700">{stat.value}</h3>
              <p className="text-green-600">{stat.change} <span className="text-gray-500">{stat.desc}</span></p>
            </div>
          ))}
        </div>

        {/* Visitors by Country */}
        <div className="bg-white p-6 rounded shadow mb-8 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Visitors by Country</h3>
          <BarChartClient />
        </div>

        {/* Bottom Panels */}
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-white p-4 rounded shadow border border-gray-100">
            <h4 className="mb-4 font-semibold">Popular Museums</h4>
            <ul className="text-sm space-y-2">
              <li className="flex justify-between">🏛️ Louvre Museum <span className="font-semibold">520 visits</span></li>
              <li className="flex justify-between">🏛️ British Museum <span className="font-semibold">480 visits</span></li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded shadow border border-gray-100">
            <h4 className="mb-4 font-semibold">Recent Activity</h4>
            <ul className="text-sm space-y-2">
              <li>🎟️ Ticket Purchase - British Museum - Adult Entry <span className="text-xs text-gray-500 ml-2">5 minutes ago</span></li>
              <li>🆕 New Post</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
