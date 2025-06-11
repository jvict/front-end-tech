import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from "recharts";

const COLORS = [
  "#459fed", "#fa657c", "#facc15", "#a3e635", "#6dd3be", "#9789ff", "#f59589", "#59e3fc", "#cd8afd"
];

type Evolution = {
  origin: string;
  day: string;
  total: number;
  valid: number;
  conversion_rate: number;
};

type EvolutionBarChartProps = {
  data: Evolution[];
};

function groupByOrigin(data: Evolution[], valueKey: "conversion_rate" | "total" = "conversion_rate") {
  const days = Array.from(new Set(data.map(d => d.day)));
  const origins = Array.from(new Set(data.map(d => d.origin)));

  // Map dia → objeto com cada canal
  const byDay: Record<string, any> = {};
  days.forEach(day => {
    byDay[day] = { day };
    origins.forEach(origin => {
      byDay[day][origin] = 0; 
    });
  });
  data.forEach(d => {
    byDay[d.day][d.origin] = Number(d[valueKey] ?? 0);
  });

  return {
    data: Object.values(byDay),
    origins
  };
}

export function EvolutionBarChart({ data }: EvolutionBarChartProps) {
  const { data: groupedData, origins } = groupByOrigin(data, "conversion_rate");

  if (!groupedData || groupedData.length === 0 || origins.length === 0) {
    return (
      <div style={{
        background: "#fff",
        borderRadius: 12,
        padding: 35,
        textAlign: "center",
        marginTop: 38
      }}>
        Nenhum dado filtrado para exibir 💡
      </div>
    );
  }

  return (
    <div style={{
      background: "#fff",
      borderRadius: "1rem",
      padding: "1.5rem",
      boxShadow: "0 2px 14px 0 #7dc5e353",
      border: "1.5px solid #eaeaea",
      marginTop: "1.5rem",
      width: "100%",
      maxWidth: 1000
    }}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={groupedData}
          margin={{ top: 22, right: 16, left: 10, bottom: 35 }}
        >
          <CartesianGrid stroke="#eaeaef" vertical={false} />
          <XAxis dataKey="day" angle={-20} textAnchor="end" tick={{ fontSize: 12 }} />
          <YAxis label={{ value: "Taxa %", angle: -90, position: 'insideLeft', fontSize: 14 }} />
          <Tooltip />
          <Legend />
          {origins.map((origin, i) => (
            <Bar
              key={origin}
              dataKey={origin}
              name={origin}
              fill={COLORS[i % COLORS.length]}
              radius={[8, 8, 0, 0]}
              isAnimationActive={false}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}