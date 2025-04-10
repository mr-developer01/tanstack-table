import React from "react";
import { getColumns } from "../../utils/getColumns";
import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import mockData from "../../../MOCK_DATA.json";
import { Stack, Typography } from "@mui/material";

const Landing = () => {
  const columns = React.useMemo(() => getColumns().columns, []);
  const [data] = React.useState(() => [...mockData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Stack sx={{alignItems: 'center'}}>
      <Typography variant="h2" textAlign={'center'} gutterBottom>Basic Table With Tanstack</Typography>
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
    </Stack>
  );
};

export default Landing;
