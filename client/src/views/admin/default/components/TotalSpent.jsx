import React, { useEffect, useState } from "react";
import Card from "components/card";
import BarChart from "../../../../components/charts/BarChart";
import api from "helpers/api";

const MenuPopularity = ({data}) => {
  

  // Transform data for the chart
  const chartData = [
    {
      name: "Orders",
      data: data.map(item => item.order_count), // Extract orders from the API response
    },
  ];

  // Define chart options
  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: data.map(item => item.product_name), // Extract names for categories
      title: {
        text: "Menu Items",
        style: {
          fontWeight: "bold",
          color: "#333",
        },
      },
      labels: {
        show:false,
        style: {
          colors: ["#888"],
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      title: {
        text: "Order Count",
        style: {
          fontWeight: "bold",
          color: "#333",
        },
      },
      labels: {
        style: {
          colors: ["#888"],
          fontSize: "12px",
        },
      },
    },
    colors: ["#EF233C"], // Updated color theme
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#EF236D"],
        inverseColors: true,
        opacityFrom: 0.85,
        opacityTo: 0.95,
      },
    },
    grid: {
      show: false, // Hide grid lines
    },
    title: {
      text: "Menu Item Popularity",
      align: "center",
      style: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#333",
      },
      
    },
    
    tooltip: {
      theme: "dark",
      y: {
        formatter: (val) => `${val} orders`,
      },
    },
  };

  return (
    <Card extra="!p-[20px] text-center shadow-lg rounded-lg bg-white dark:bg-navy-800">
      <div className="flex justify-between mb-4">
     
      </div>

      <div className="mt-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
          Popular Menu Items
        </h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Track orders to see what’s trending and adjust your menu.
        </p>

        {data.length > 0 ? ( // Check if data is available
          <div className="w-full max-w-lg mx-auto mt-6">
            <BarChart chartData={chartData} chartOptions={chartOptions} />
          </div>
        ) : (
          <p className="mt-4 text-gray-500">Loading...</p> // Show loading message
        )}
      </div>
    </Card>
  );
};

export default MenuPopularity;
