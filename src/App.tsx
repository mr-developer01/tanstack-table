import React from "react";
import mockData from "../MOCK_DATA.json";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getColumns } from "./utils/getColumns";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import TanstackTable from "./components/Table";
import TanstackTable2 from "./components/Table2";
import TanstackTable3 from "./components/Table3";
import TanstackTable4 from "./components/Table4";
import TanstackTable5 from "./components/Table5";
import TanstackTable6 from "./components/Table6";
import TanstackTable7 from "./components/Table7";
import TanstackTable8 from "./components/Table8";
import TanstackTable9 from "./components/Table9";

const App = () => {
  const columns = React.useMemo(() => getColumns().columns, []);
  const [data] = React.useState(() => [...mockData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <Typography variant="h2" textAlign={'center'} gutterBottom>Normal Table</Typography>
      <TanstackTable />
      <Typography variant="h2" textAlign={'center'} gutterBottom>Add Pagination</Typography>
      <TanstackTable2 />
      <Typography variant="h2" textAlign={'center'} gutterBottom>Add Delete Action</Typography>
      <TanstackTable3 />
      <Typography variant="h2" textAlign={'center'} gutterBottom>Select Header Column Then Sort</Typography>
      <TanstackTable4 />
      <Typography variant="h2" textAlign={'center'} gutterBottom>Select Header Column Then Sort</Typography>
      <TanstackTable5 />
      <Typography variant="h2" textAlign={'center'} gutterBottom>Add Search Field</Typography>
      <TanstackTable6 />
      <Typography variant="h4" textAlign={'center'} gutterBottom>Custom Cells: Render buttons, images, or custom components in cells.</Typography>
      <TanstackTable7 />
      <Typography variant="h4" textAlign={'center'} gutterBottom>Fixed Header</Typography>
      <TanstackTable8 />
      <Typography variant="h4" textAlign={'center'} gutterBottom>Fixed Header</Typography>
      <TanstackTable9 />
      {/* Normal Table */}
      <div>
        <table>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* MUI Table */}
      <Box
        sx={{
          width: "960px",
          height: "900px",
          border: "1px solid black",
          overflowY: "auto",
        }}
      >
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default App;
