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
    TextField, // Added for search input
  } from "@mui/material";
  import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel, // Added for filtering
    useReactTable,
    SortingState,
  } from "@tanstack/react-table";
  import React from "react";
  import { TUser } from "../types/tables";
  import { Trash2 } from "lucide-react";
  import mockData from "../../MOCK_DATA.json";
  import { ArrowUpward, ArrowDownward, Sort } from "@mui/icons-material";
  
  interface CustomTableMeta {
    onDelete: (id: number) => void;
  }
  
  const columnHelper = createColumnHelper<TUser>();
  const columns = [
    columnHelper.accessor("id", {
      header: () => <span>Id</span>,
      cell: (info) => info.getValue(),
      enableSorting: true,
      filterFn: "includesString", // Enable filtering for this column
    }),
    columnHelper.accessor("first_name", {
      header: () => <span>First Name</span>,
      cell: (info) => info.getValue(),
      enableSorting: true,
      filterFn: "includesString",
    }),
    columnHelper.accessor("last_name", {
      header: () => <span>Last Name</span>,
      cell: (info) => info.getValue(),
      enableSorting: true,
      filterFn: "includesString",
    }),
    columnHelper.accessor("email", {
      header: () => <span>Email</span>,
      cell: (info) => <span className="email-text">{info.getValue()}</span>,
      enableSorting: true,
      filterFn: "includesString",
    }),
    columnHelper.accessor("gender", {
      header: () => <span>Gender</span>,
      cell: (info) => info.getValue(),
      enableSorting: true,
      filterFn: "includesString",
    }),
    columnHelper.accessor("ip_address", {
      header: () => <span>Address</span>,
      cell: (info) => info.getValue(),
      enableSorting: true,
      filterFn: "includesString",
    }),
    columnHelper.display({
      id: "actions",
      header: () => <span>Actions</span>,
      cell: (info) => {
        const rowId = info.row.original.id;
        const { onDelete } = info.table.options.meta as CustomTableMeta;
        return (
          <Button onClick={() => onDelete(rowId)}>
            <Trash2 size={18} color="red" />
          </Button>
        );
      },
      enableSorting: false,
    }),
  ];
  
  const TanstackTable6 = () => {
    const [data, setData] = React.useState(() => [...mockData]);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(10);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState(""); // State for search filter
  
    const handleDelete = (id: number) => {
      setData((prevData) => prevData.filter((row) => row.id !== id));
      const totalRows = data.length - 1;
      const totalPages = Math.ceil(totalRows / pageSize);
      if (pageIndex >= totalPages && pageIndex > 0) {
        setPageIndex(totalPages - 1);
      }
    };
  
    const table = useReactTable<TUser>({
      data,
      columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(), // Enable filtering
      state: {
        pagination: {
          pageIndex,
          pageSize,
        },
        sorting,
        globalFilter, // Pass global filter state
      },
      onPaginationChange: (updater) => {
        const newPagination =
          typeof updater === "function"
            ? updater({ pageIndex, pageSize })
            : updater;
        setPageIndex(newPagination.pageIndex);
        setPageSize(newPagination.pageSize);
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setGlobalFilter, // Update filter state
      globalFilterFn: "includesString", // Use includesString for global filtering
      manualPagination: false,
      manualSorting: false,
      manualFiltering: false, // Let TanStack handle filtering
      meta: {
        onDelete: handleDelete,
      } as CustomTableMeta,
    });
  
    return (
      <Stack sx={{ alignItems: "center", marginBottom: "100px" }}>
        {/* Search Input */}
        <Box sx={{ width: "960px", mb: 2 }}>
          <TextField
            label="Search"
            variant="outlined"
            value={globalFilter ?? ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            fullWidth
            placeholder="Search all columns..."
          />
        </Box>
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
                      <TableCell
                        key={header.id}
                        onClick={header.column.getToggleSortingHandler()}
                        sx={{
                          cursor: header.column.getCanSort() ? "pointer" : "default",
                          userSelect: "none",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getCanSort() ? (
                            header.column.getIsSorted() === "asc" ? (
                              <ArrowUpward fontSize="small" />
                            ) : header.column.getIsSorted() === "desc" ? (
                              <ArrowDownward fontSize="small" />
                            ) : (
                              <Sort fontSize="small" />
                            )
                          ) : null}
                        </Box>
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
        <TablePagination
          component="div"
          count={table.getFilteredRowModel().rows.length} // Use filtered row count
          page={pageIndex}
          onPageChange={(_, newPage) => table.setPageIndex(newPage)}
          rowsPerPage={pageSize}
          onRowsPerPageChange={(event) =>
            table.setPageSize(parseInt(event.target.value, 10))
          }
          rowsPerPageOptions={[5, 10, 25, 50]}
        />
      </Stack>
    );
  };
  
  export default TanstackTable6;