import { ColDef } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { FC, useMemo } from 'react';
import { WeeklySales } from './productSlice';

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
  const defaultColDef = useMemo(
    () => ({
      resizable: true,
      sortable: true,
      // minWidth: 100, // A default minWidth for all columns if desired
    }),
    []
  );

  const colDefs: ColDef<WeeklySales>[] = useMemo(
    () => [
      {
        field: 'weekEnding',
        headerName: 'Week Ending',
        valueFormatter: dateValueFormatter,
        width: 130, // Slightly reduced fixed width
        minWidth: 120,
      },
      {
        field: 'retailSales',
        headerName: 'Retail Sales',
        valueFormatter: currencyFormatter,
        flex: 1, // Allow this column to flex
        minWidth: 130, // Prevent it from becoming too small
      },
      {
        field: 'wholesaleSales',
        headerName: 'Wholesale Sales',
        valueFormatter: currencyFormatter,
        flex: 1, // Allow this column to flex
        minWidth: 140, // Prevent it from becoming too small
      },
      {
        field: 'unitsSold',
        headerName: 'Units Sold',
        width: 100, // Reduced fixed width
        minWidth: 90,
      },
      {
        field: 'retailerMargin',
        headerName: 'Retailer Margin',
        valueFormatter: currencyFormatter,
        flex: 1, // Allow this column to flex
        minWidth: 140, // Prevent it from becoming too small
      },
    ],
    []
  );
  return (
    <div
      className="ag-theme-quartz sales-table" // The class sales-table has padding: 15px in App.css
    >
      <AgGridReact
        rowData={salesData}
        columnDefs={colDefs}
        defaultColDef={defaultColDef} // Apply default col def
        rowSelection="multiple"
        domLayout="normal" // Ensures grid behaves well within CSS constraints
        // Consider columnResized and gridReady events for auto-sizing if needed
        // onGridReady={(params) => params.api.sizeColumnsToFit()} // Example: sizes columns to fit available width initially
      />
    </div>
  );
};
export default ProductSalesTable;
