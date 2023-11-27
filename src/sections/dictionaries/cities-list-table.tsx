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
  SvgIcon,
  Stack,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Country } from "../../types/countries";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "../../store";
import Link from "next/link";
import { getAllDCountries, removeCountries } from "../../thunks/countries";
import { paths } from "../../paths";
import { useRouter } from "next/router";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { CitiesEditForm } from "./cities-edit-form";
// interface IProps {
//   data?: string[];
// }
interface IProps {
  data: Country;
  removeCity: (cityId: string) => void;
}

const rowsPerPageOptions = [10, 15, 20];

export const CitiesListTable: FC<IProps> = ({ data, removeCity }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [inputValue, setInputValue] = useState("");
  const [selectedCityId, setSelectedCityId] = useState<string | null>(null);
  const handleEditResearcher = (id: string, cityId: string) => {
    setSelectedCityId(cityId);
    router.push({
      pathname: paths.dictionary.countries.cities.index + "/" + id,
      query: { cityId: cityId },
    });
  };
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedRows = data.cities
    .filter((city) => city.name && city.name.trim() !== "")
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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
          {displayedRows.map((item: any, index) => (
            <TableRow hover key={`city-${index}`}>
              <TableCell>{item.name}</TableCell>
              <TableCell align="right">
                {item._id ? (
                  <Tooltip title="Change city">
                    <IconButton
                      aria-label="Edit"
                      // @ts-ignore
                      onClick={() => handleEditResearcher(data._id, item._id)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <>Please update page</>
                )}

                <Tooltip title="Remove city">
                  <IconButton
                    aria-label="Edit"
                    // @ts-ignore
                    onClick={() => removeCity(item._id)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.cities.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
