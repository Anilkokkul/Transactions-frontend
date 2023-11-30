import Chart from "chart.js/auto";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

function TransactionsBarChart({ selectedMonth, selectedYear }) {
  const [chartData, setChartData] = useState(null);
  const chartRef = useRef(null);

  useEffect(() => {
    fetchChartData();
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [selectedMonth, selectedYear]);

  useEffect(() => {
    if (chartData) {
      barChart();
    }
  }, [chartData]);
  const fetchChartData = async () => {
    try {
      const response = await axios.get(
        `https://product-transactions-79wj.onrender.com/api/bar-chart?month=${selectedYear}-${selectedMonth}`
      );
      setChartData(response.data.ChartData);
    } catch (error) {
      console.log(error);
    }
  };

  const barChart = () => {
    const ctx = document.getElementById("barChart");
    chartRef.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: chartData.map((row) => row.priceRange),
        datasets: [
          {
            label: "Number of Items",
            data: chartData.map((row) => row.itemCount),
            backgroundColor: ["#3e95cd"],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "Price Range",
            },
          },
          y: {
            title: {
              display: true,
              text: "Number of Items",
            },
          },
        },
      },
    });
  };

  return (
    <div>
      <h2>Transactions Bar Chart</h2>
      <canvas id="barChart" width="400" height="200"></canvas>
    </div>
  );
}

export default TransactionsBarChart;
