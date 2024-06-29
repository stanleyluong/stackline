import { FC } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { Sale } from './productSlice';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface ProductSalesGraphProps {
  salesData: Sale[];
}

const ProductSalesGraph: FC<ProductSalesGraphProps> = ({ salesData }) => {
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Sales",
        font: {
          family: 'sans-serif',
        },
      },
      legend: {
        position: 'top' as const,
      },
    },
  };

  const labels = salesData.map((week) => week.weekEnding);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Retail Sales',
        data: salesData.map((week) => week.retailSales),
        borderColor: 'red',
        backgroundColor: 'rgba(255,182,193,0.5',
      },
      {
        fill: true,
        label: 'Wholesale Sales',
        data: salesData.map((week) => week.wholesaleSales),
        borderColor: 'green',
        backgroundColor: 'rgba(0,255,0, 0.5)',
      },
      {
        fill: true,
        label: 'Wholesale Sales',
        data: salesData.map((week) => week.retailerMargin),
        borderColor: 'blue',
        backgroundColor: 'rgba(135,206,250,0.5)',
      },
      {
        fill: true,
        label: 'Wholesale Sales',
        data: salesData.map((week) => week.unitsSold),
        borderColor: 'black',
        backgroundColor: 'rgba(211,211,211,0.5)',
      },
    ],
  };

  return (
    <div className="sales-chart">
      <Line options={options} data={data} />
    </div>
  );
};

export default ProductSalesGraph;
