import {
  Box,
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { TUser } from "../types/tables";
import { Trash2 } from "lucide-react";
import mockData from "../../MOCK_DATA.json";

const columnHelper = createColumnHelper<TUser>();
const columns = [
  columnHelper.accessor("id", {
    header: () => <span>Id</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("first_name", {
    header: () => <span>First Name</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("last_name", {
    header: () => <span>Last Name</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: () => <span>Email</span>,
    cell: (info) => <span className="email-text">{info.getValue()}</span>,
  }),
  columnHelper.accessor("gender", {
    header: () => <span>Gender</span>,
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("ip_address", {
    header: () => <span>Address</span>,
    cell: (info) => info.getValue(),
  }),
  // 💥 Custom Delete Column
  columnHelper.display({
    id: "actions",
    header: () => <span>Actions</span>,
    cell: () => {
      return (
        <Button>
          <Trash2 size={18} color="red" />
        </Button>
      );
    },
  }),
];

const TanstackTable = () => {
  const [data] = React.useState(() => [...mockData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Stack sx={{alignItems: 'center', marginBottom: '100px'}}>
      <Box
        sx={{
          width: "960px",
          height: "800px",
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
    </Stack>
  );
};

export default TanstackTable;
