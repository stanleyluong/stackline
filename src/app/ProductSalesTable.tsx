import { FC, useMemo } from 'react';
import { WeeklySales } from './productSlice';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { ColDef } from 'ag-grid-community';

interface ProductSalesTableProps {
  salesData: WeeklySales[];
}

export const dateValueFormatter = (params: any) => {
  const [year, month, day] = params.value.split('-');
  return `${month}-${day}-${year}`;
};

const currencyFormatter = (params: any) => {
  if (typeof params.value === 'number') {
    return '$' + params.value.toLocaleString('en-US');
  }
  return '';
};

const ProductSalesTable: FC<ProductSalesTableProps> = ({ salesData }) => {


  const colDefs: ColDef<WeeklySales>[] = useMemo(
    () => [
      { field: 'weekEnding', valueFormatter: dateValueFormatter },
      { field: 'retailSales', valueFormatter: currencyFormatter },
      { field: 'wholesaleSales', valueFormatter: currencyFormatter },
      { field: 'unitsSold' },
      { field: 'retailerMargin', valueFormatter: currencyFormatter },
    ],
    []
  );
  return (
    <div className="ag-theme-quartz sales-table" style={{ height: 2300 }}>
      <AgGridReact
        rowData={salesData}
        columnDefs={colDefs}
        rowSelection="multiple"
      />
    </div>
  );
};
export default ProductSalesTable;
