"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const data = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  datasets: [
    {
      label: "Total monthly AUC",
      data: [
        9.8, 11.0, 19.1, 22.4, 27.9, 35.1, 36.6, 40.6, 45.4, 65.3, 78.7, 80.3,
      ],
      fill: false,
      backgroundColor: "rgb(75, 192, 192)",
      borderColor: "rgba(75, 192, 192, 0.2)",
    },
  ],
};

const options = {
  responsive: true,
};

export default function Analysis() {
  return (
    <section className="grow rounded-lg border border-base-300 bg-base-200">
      <Line data={data} options={options} />
    </section>
  );
}
