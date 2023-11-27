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
import { Company } from "../../types/companies";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "../../store";
import { removeCompany } from "../../thunks/companies";
import { paths } from "../../paths";
import { useRouter } from "next/router";
import { getAllCompanies } from "../../thunks/companies";

interface IProps {
  data: Company[];
}

const rowsPerPageOptions = [10, 15, 20];

export const CompaniesListTable: FC<IProps> = ({ data }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleEditResearcher = (id: string) => {
    router.push(paths.dictionary.company.index + "/" + id);
  };

  const removeCompaniesType = async (id: string) => {
    await dispatch(removeCompany(id));
    await dispatch(getAllCompanies());
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  //@ts-ignore
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
          {displayedRows.map((item: Company) => {
            return (
              <TableRow hover key={item._id}>
                <TableCell>{item.name}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Change company">
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleEditResearcher(item._id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Remove company">
                    <IconButton
                      aria-label="Edit"
                      onClick={() => removeCompaniesType(item._id)}
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
        //@ts-ignore
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
