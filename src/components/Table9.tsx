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
    TextField,
    IconButton,
    Chip,
  } from "@mui/material";
  import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    useReactTable,
    SortingState,
  } from "@tanstack/react-table";
  import React from "react";
  import { TUser } from "../types/tables";
  import { Trash2, Edit } from "lucide-react";
  import mockData from "../../MOCK_DATA.json";
  import { ArrowUpward, ArrowDownward, Sort, Email as EmailIcon } from "@mui/icons-material";
  
  interface CustomTableMeta {
    onDelete: (id: number) => void;
  }
  
  const columnHelper = createColumnHelper<TUser>();
  const columns = [
    columnHelper.accessor("id", {
      header: () => <span>Id</span>,
      cell: (info) => info.getValue(),
      enableSorting: true,
      filterFn: "includesString",
    }),
    columnHelper.accessor("first_name", {
      header: () => <span>First Name</span>,
      cell: (info) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => alert(`Hello, ${info.getValue()}!`)}
        >
          {info.getValue()}
        </Button>
      ),
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
      cell: (info) => (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <EmailIcon fontSize="small" sx={{ mr: 1 }} />
          <span className="email-text">{info.getValue()}</span>
        </Box>
      ),
      enableSorting: true,
      filterFn: "includesString",
    }),
    columnHelper.accessor("gender", {
      header: () => <span>Gender</span>,
      cell: (info) => (
        <Chip
          label={info.getValue()}
          color={info.getValue() === "Male" ? "primary" : "secondary"}
          size="small"
        />
      ),
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
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton onClick={() => onDelete(rowId)} color="error">
              <Trash2 size={18} />
            </IconButton>
            <IconButton onClick={() => alert(`Editing row ${rowId}`)} color="primary">
              <Edit size={18} />
            </IconButton>
          </Box>
        )
      },
      enableSorting: false,
    }),
  ];
  
  const TanstackTable9 = () => {
    const [data, setData] = React.useState(() => [...mockData]);
    const [pageIndex, setPageIndex] = React.useState(0);
    const [pageSize, setPageSize] = React.useState(10);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState("");
  
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
      getFilteredRowModel: getFilteredRowModel(),
      state: {
        pagination: {
          pageIndex,
          pageSize,
        },
        sorting,
        globalFilter,
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
      onGlobalFilterChange: setGlobalFilter,
      globalFilterFn: "includesString",
      manualPagination: false,
      manualSorting: false,
      manualFiltering: false,
      meta: {
        onDelete: handleDelete,
      } as CustomTableMeta,
    });
  
    return (
      <Stack sx={{ alignItems: "center", marginBottom: "100px" }}>
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
            height: "500px", // Outer container height
            border: "1px solid black",
          }}
        >
          <TableContainer
            component={Paper}
            sx={{
              maxHeight: "500px", // Match outer height for scrolling
              overflowY: "auto", // Enable vertical scrolling
            }}
          >
            <Table aria-label="simple table" stickyHeader>
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
                          backgroundColor: "grey.100", // Distinguish header
                          top: 0, // Stick to top
                          zIndex: 1, // Above body rows
                          position: "sticky", // Reinforce sticky behavior
                          borderBottom: "2px solid grey.300", // Optional: visual separation
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
          count={table.getFilteredRowModel().rows.length}
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
  
  export default TanstackTable9;