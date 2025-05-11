import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import { FC, useMemo, useState } from 'react';
import { WeeklySales } from './productSlice';

interface ProductSalesTableProps {
  salesData: WeeklySales[];
}

export type SalesDataKey = keyof WeeklySales;

export const dateValueFormatter = (value: string) => {
  const [year, month, day] = value.split('-');
  return `${month}-${day}-${year}`;
};

const currencyFormatter = (value: number) => {
  if (typeof value === 'number') {
    return '$' + value.toLocaleString('en-US');
  }
  return '';
};

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(
  array: readonly T[],
  comparator: (a: T, b: T) => number
) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  id: SalesDataKey;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  { id: 'weekEnding', label: 'Week Ending', numeric: false },
  { id: 'retailSales', label: 'Retail Sales', numeric: true },
  { id: 'wholesaleSales', label: 'Wholesale Sales', numeric: true },
  { id: 'unitsSold', label: 'Units Sold', numeric: true },
  { id: 'retailerMargin', label: 'Retailer Margin', numeric: true },
];

const ProductSalesTable: FC<ProductSalesTableProps> = ({ salesData }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<SalesDataKey>('weekEnding');

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: SalesDataKey
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedSalesData = useMemo(
    () => stableSort(salesData, getComparator(order, orderBy)),
    [salesData, order, orderBy]
  );

  return (
    <TableContainer component={Paper} className="sales-table">
      <Table sx={{ minWidth: 650 }} aria-label="sales data table">
        <TableHead>
          <TableRow>
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                sortDirection={orderBy === headCell.id ? order : false}
                sx={{ fontWeight: 'bold' }}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={(event) => handleRequestSort(event, headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedSalesData.length === 0 ? (
            <TableRow>
              <TableCell colSpan={headCells.length} align="center">
                No sales data to display.
              </TableCell>
            </TableRow>
          ) : (
            sortedSalesData.map((row, index) => (
              <TableRow
                key={row.weekEnding + '-' + index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {dateValueFormatter(row.weekEnding)}
                </TableCell>
                <TableCell align="right">
                  {currencyFormatter(row.retailSales)}
                </TableCell>
                <TableCell align="right">
                  {currencyFormatter(row.wholesaleSales)}
                </TableCell>
                <TableCell align="right">
                  {row.unitsSold.toLocaleString('en-US')}
                </TableCell>
                <TableCell align="right">
                  {currencyFormatter(row.retailerMargin)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductSalesTable;
