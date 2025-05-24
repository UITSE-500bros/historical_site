"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { country: "USA", visitors: 450 },
  { country: "UK", visitors: 320 },
  { country: "France", visitors: 280 },
  { country: "Germany", visitors: 220 },
  { country: "Italy", visitors: 190 },
];

const primaryColor = "#1D4ED8";   // Blue-700
const secondaryColor = "#CBD5E1"; // Slate-300

export default function BarChartClient() {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
        <XAxis type="number" hide />
        <YAxis type="category" dataKey="country" />
        <Tooltip />
        <Bar dataKey="visitors">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={index === 0 ? primaryColor : secondaryColor} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
