import {
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js';
import { FC } from 'react';

import { Line } from 'react-chartjs-2';
import { WeeklySales } from './productSlice';

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
  salesData: WeeklySales[];
}

const ProductSalesGraph: FC<ProductSalesGraphProps> = ({ salesData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Sales',
        font: {
          family: 'sans-serif',
        },
      },
      legend: {
        position: 'top' as const,
      },
    },
  };

  const labels = salesData.map((week) => {
    const [year, month, day] = week.weekEnding.split('-');
    return `${month}-${day}-${year}`;
  });

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
        label: 'Retailer Margin',
        data: salesData.map((week) => week.retailerMargin),
        borderColor: 'blue',
        backgroundColor: 'rgba(135,206,250,0.5)',
      },
      {
        fill: true,
        label: 'Units Sold',
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
