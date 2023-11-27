import React, { ChangeEvent, FC, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
} from "@mui/material";
import { CsvData } from "../../types/csv";
import EditIcon from "@mui/icons-material/Edit";

interface IProps {
  files: CsvData[];
}

const rowsPerPageOptions = [10, 15, 20];

export const CsvListTable: FC<IProps> = ({ files }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleEditResearcher = (id: number) => {
    // TODO Create append id to another page
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedRows = files.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ position: "relative" }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>CSV File Title</TableCell>
            <TableCell>Timestamp</TableCell>
            <TableCell>Assigned Researcher</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((file: CsvData) => {
            return (
              <TableRow hover key={file.id}>
                <TableCell>{file.title}</TableCell>
                <TableCell>{file.timestamp}</TableCell>
                <TableCell>{file.researcher}</TableCell>
                <TableCell>{file.type}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Change researcher">
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleEditResearcher(file.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={files.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
