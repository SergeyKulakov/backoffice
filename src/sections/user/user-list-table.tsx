import { ChangeEvent, FC, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
} from "@mui/material";
import { User } from "../../types/user";

interface IProps {
  users: User[];
}

const rowsPerPageOptions = [10, 15, 20];

export const UserListTable: FC<IProps> = ({ users }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedRows = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleRole = (role: number) => {
    if (role === 0) {
      return "Admin";
    } else if (role === 1) {
      return "Superviser";
    } else if (role === 2) {
      return "Researcher";
    } else {
      return "User";
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((user: User, i: number) => {
            return (
              <TableRow hover key={i}>
                <TableCell>
                  {user.firstName} {user.lastName}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{handleRole(user.role)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
