import React from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

export default function ChartRenderer({ chartType, data, options }) {
  if (chartType === "bar") return <Bar data={data} options={options} />;
  if (chartType === "line") return <Line data={data} options={options} />;
  if (chartType === "pie") return <Pie data={data} options={options} />;
  return <div>Unsupported chart type: {chartType}</div>;
}