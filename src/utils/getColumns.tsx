import { createColumnHelper } from "@tanstack/react-table";
import { TUser } from "../types/tables";
import { Trash2 } from "lucide-react";
import { Button } from "@mui/material";

export function getColumns() {
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

  return { columns };
}
