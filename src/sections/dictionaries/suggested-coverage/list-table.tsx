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
import { Suggested } from "../../../types/suggested-coverage";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "../../../store";
import {
  getAllSuggestedCoverage,
  removeSuggestedCoverage,
} from "../../../thunks/suggestedCoverage";
import { paths } from "../../../paths";
import { useRouter } from "next/router";

interface IProps {
  data: Suggested[];
}

const rowsPerPageOptions = [10, 15, 20];

export const ListTable: FC<IProps> = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleEditItem = (id: string) => {
    router.push(paths.dictionary.suggestedCoverage.index + "/" + id);
  };

  const handleRemoveItem = async (id: string) => {
    await dispatch(removeSuggestedCoverage(id));
    await dispatch(getAllSuggestedCoverage());
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
          {displayedRows.map((item: Suggested) => {
            return (
              <TableRow hover key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Change suggested coverage">
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleEditItem(item._id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove suggested coverage">
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleRemoveItem(item._id)}
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
