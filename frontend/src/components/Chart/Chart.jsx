import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  AreaChart,
  Area,
  Line,
} from "recharts";

const data = [
  { name: "Tháng 1", order: 2110.2, access: 2523.32, total: 1290 },
  { name: "Tháng 2", order: 3553.5, access: 3325.0, total: 1387 },
  { name: "Tháng 3", order: 4404.3, access: 7435.3, total: 2908 },
  { name: "Tháng 4", order: 5721.3, access: 5355.6, total: 3532 },
  { name: "Tháng 5", order: 4523.3, access: 4778.9, total: 3478 },
  { name: "Tháng 6", order: 2302.9, access: 4590.8, total: 2932 },
  { name: "Tháng 7", order: 3902.9, access: 4790.8, total: 4332 },
  { name: "Tháng 8", order: 2602.9, access: 3890.8, total: 5732 },
  { name: "Tháng 9", order: 5802.9, access: 7590.8, total: 6290 },
];

const Chart = () => {
  return (
    <div>
      <div className="container_chart">
        <AreaChart
          className="AreaChart"
          width={1100}
          height={350}
          data={data}
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colortotal" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3498db" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3498db" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="order"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />
          <Area
            type="monotone"
            dataKey="access"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colorPv)"
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#82ca9d"
            fillOpacity={1}
            fill="url(#colortotal)"
          />
        </AreaChart>
      </div>
    </div>
  );
};

export default Chart;
