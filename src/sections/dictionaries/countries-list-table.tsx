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
import { Country } from "../../types/countries";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "../../store";
import { getAllDCountries, removeCountries } from "../../thunks/countries";
import { paths } from "../../paths";
import { useRouter } from "next/router";

interface IProps {
  data: Country[];
}

const rowsPerPageOptions = [10, 15, 20];

export const CountriesListTable: FC<IProps> = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleEditResearcher = (id: string) => {
    router.push(paths.dictionary.countries.index + "/" + id);
  };

  const removeCountry = async (id: string) => {
    await dispatch(removeCountries(id));
    await dispatch(getAllDCountries());
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
          {displayedRows.map((item: Country) => {
            return (
              <TableRow hover key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Change country">
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleEditResearcher(item._id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove country">
                    <IconButton
                      aria-label="Edit"
                      onClick={() => removeCountry(item._id)}
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
