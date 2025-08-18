"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

// Define the type for a user
interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

type Order = "asc" | "desc";
type OrderBy = keyof User;

// Sample data
const users: User[] = [
  { id: 1, name: "Alice", age: 25, email: "alice@example.com" },
  { id: 2, name: "Bob", age: 30, email: "bob@example.com" },
  { id: 3, name: "Charlie", age: 22, email: "charlie@example.com" },
  { id: 4, name: "Diana", age: 28, email: "diana@example.com" },
  { id: 5, name: "Eve", age: 35, email: "eve@example.com" },
  { id: 6, name: "Frank", age: 24, email: "frank@example.com" },
  { id: 7, name: "Grace", age: 27, email: "grace@example.com" },
  { id: 8, name: "Hank", age: 32, email: "hank@example.com" },
  { id: 9, name: "Ivy", age: 29, email: "ivy@example.com" },
  { id: 10, name: "Jack", age: 26, email: "jack@example.com" },
  { id: 11, name: "Karen", age: 31, email: "karen@example.com" },
  { id: 12, name: "Leo", age: 23, email: "leo@example.com" },
  { id: 13, name: "Mona", age: 34, email: "mona@example.com" },
  { id: 14, name: "Nate", age: 28, email: "nate@example.com" },
  { id: 15, name: "Olivia", age: 27, email: "olivia@example.com" },
  { id: 16, name: "Paul", age: 30, email: "paul@example.com" },
  { id: 17, name: "Quinn", age: 26, email: "quinn@example.com" },
  { id: 18, name: "Rachel", age: 33, email: "rachel@example.com" },
  { id: 19, name: "Steve", age: 24, email: "steve@example.com" },
  { id: 20, name: "Tina", age: 29, email: "tina@example.com" },
  { id: 21, name: "Uma", age: 31, email: "uma@example.com" },
  { id: 22, name: "Victor", age: 27, email: "victor@example.com" },
  { id: 23, name: "Wendy", age: 25, email: "wendy@example.com" },
  { id: 24, name: "Xander", age: 28, email: "xander@example.com" },
  { id: 25, name: "Yara", age: 30, email: "yara@example.com" },
];

const EasyTable: React.FC = () => {
  const theme = useTheme();
  const [orderBy, setOrderBy] = useState<OrderBy>("name");
  const [order, setOrder] = useState<Order>("asc");
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

  const handleRequestSort = (property: OrderBy) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const sortedUsers = [...users].sort((a, b) => {
    const aVal = a[orderBy];
    const bVal = b[orderBy];

    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });

  const visibleUsers = sortedUsers.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <div>
      <p style={{ textAlign: "center", margin: "2rem" }}>
        12. Build a data table using Material-UI's Table component. Populate the
        table with sample data and add features like sorting and pagination.
      </p>

      <Paper
        sx={{
          width: "90%",
          margin: "auto",
          marginTop: theme.spacing(4),
          overflow: "hidden",
          bgcolor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        }}
      >
        <Typography
          variant="h6"
          component="div"
          sx={{ padding: theme.spacing(2) }}
        >
          Users
        </Typography>

        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {(["name", "age", "email"] as OrderBy[]).map((headCell) => (
                  <TableCell
                    key={headCell}
                    sortDirection={orderBy === headCell ? order : false}
                    sx={{ fontWeight: "bold" }}
                  >
                    <TableSortLabel
                      active={orderBy === headCell}
                      direction={orderBy === headCell ? order : "asc"}
                      onClick={() => handleRequestSort(headCell)}
                    >
                      {headCell.charAt(0).toUpperCase() + headCell.slice(1)}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {visibleUsers.map((user) => (
                <TableRow hover key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.age}</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
              ))}
              {visibleUsers.length < rowsPerPage && (
                <TableRow
                  style={{ height: 53 * (rowsPerPage - visibleUsers.length) }}
                >
                  <TableCell colSpan={3} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default EasyTable;
