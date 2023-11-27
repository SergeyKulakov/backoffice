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
import EditIcon from "@mui/icons-material/Edit";
import { Degree } from "../../types/degree";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "../../store";
import { getAllDegree, removeDegreeTypes } from "../../thunks/degree";
import { paths } from "../../paths";
import { useRouter } from "next/router";

interface IProps {
  data: Degree[];
}

const rowsPerPageOptions = [10, 15, 20];

export const DegreeListTable: FC<IProps> = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleEditResearcher = (id: string) => {
    router.push(paths.dictionary.degree.index + "/" + id);
  };

  const removeDegreeType = async (id: string) => {
    await dispatch(removeDegreeTypes(id));
    await dispatch(getAllDegree());
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedRows = data.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ position: "relative" }}>
      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((item: Degree) => {
            return (
              <TableRow hover key={item._id}>
                <TableCell>{item.degree_name}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Change degree type">
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleEditResearcher(item._id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove degree type">
                    <IconButton
                      aria-label="Edit"
                      onClick={() => removeDegreeType(item._id)}
                    >
                      <DeleteOutlineIcon />
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
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
