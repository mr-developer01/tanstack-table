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
  TablePagination,
  Typography, // Added for pagination controls
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel, // Added for pagination logic
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
  columnHelper.display({
    id: "actions",
    header: () => <span>Actions</span>,
    cell: () => (
      <Button>
        <Trash2 size={18} color="red" />
      </Button>
    ),
  }),
];

const TanstackTable2 = () => {
  const [data] = React.useState(() => [...mockData]);
  const [pageIndex, setPageIndex] = React.useState(0); // Track current page
  const [pageSize, setPageSize] = React.useState(10); // Rows per page

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // Enable pagination
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function"
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
    },
    manualPagination: false, // Let TanStack handle pagination automatically
  });

  return (
    <>
      <Typography variant="h2" textAlign={"center"} gutterBottom>
        Add Pagination
      </Typography>
      <Stack sx={{ alignItems: "center", marginBottom: "100px" }}>
        <Box
          sx={{
            width: "960px",
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
        {/* Pagination Controls */}
        <TablePagination
          component="div"
          count={data.length} // Total number of rows
          page={pageIndex} // Current page (0-based index)
          onPageChange={(_, newPage) => table.setPageIndex(newPage)} // Update page index
          rowsPerPage={pageSize} // Rows per page
          onRowsPerPageChange={(event) =>
            table.setPageSize(parseInt(event.target.value, 10))
          } // Update page size
          rowsPerPageOptions={[5, 10, 25, 50]} // Options for rows per page
        />
      </Stack>
    </>
  );
};

export default TanstackTable2;
