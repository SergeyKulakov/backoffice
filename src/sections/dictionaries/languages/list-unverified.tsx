import React, { ChangeEvent, FC, useMemo, useState } from "react";
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
  Button,
  Dialog,
  DialogContent,
  TextField,
  Autocomplete,
  DialogTitle,
} from "@mui/material";
import { useDispatch } from "../../../store";

import { paths } from "../../../paths";
import { useRouter } from "next/router";
import Link from "next/link";
import { updateEducation } from "../../../thunks/education";
import { Language, LanguagesUnverified } from "../../../types/language";
import {
  getAllLanguage,
  getUnverifiedLanguages,
  updateLanguage,
} from "../../../thunks/language";
interface IProps {
  data: LanguagesUnverified;
  languages: Language[];
}
type Languages = {
  // _id: string;
  id: string;
  value: string;
};
const rowsPerPageOptions = [10, 15, 20];

export const LanguageUnverifiedListTable: FC<IProps> = ({
  data,
  languages,
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const languagesData = data.data;
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedEducation, setSelectedEducation] = useState<Language | null>(
    null
  );
  const [selectedUniversityName, setSelectedUniversityName] = useState("");
  const handleModalSubmit = async () => {
    if (selectedEducation) {
      const degreeNames = selectedEducation.names;
      await dispatch(
        updateLanguage({
          name: selectedEducation.name,
          _id: selectedEducation._id,
          names: [...degreeNames, selectedUniversityName],
        })
      ).unwrap();
      await dispatch(getUnverifiedLanguages());
      await dispatch(getAllLanguage());
      handleModalClose();
    }
  };
  const handleAddToExistingClick = (universityName: string) => {
    setSelectedUniversityName(universityName);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedEducation(null);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedRows = languagesData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const filteredLanguages = useMemo(() => {
    return languages.filter((university: any) =>
      university.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [languages, inputValue]);

  const filterOptions = (options: any[], { inputValue }: any) => {
    const filteredOptions = options.filter(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
    );
    return filteredOptions.filter((option, index, array) => {
      return array.findIndex((t) => t.name === option.name) === index;
    });
  };
  const handleCreateNewClick = (language: string) => {
    router.push({
      pathname: paths.dictionary.language.create,
      query: { language: language },
    });
  };
  return (
    <Box sx={{ position: "relative" }}>
      <Dialog
        open={isModalOpen}
        onClose={handleModalClose}
        maxWidth="md"
        sx={{
          "& .MuiDialogContent-root": {
            minHeight: "auto",
            minWidth: "450px",
            pt: "20px",
          },
        }}
      >
        <DialogTitle>Add as alias to existing Language</DialogTitle>
        <DialogContent>
          <Autocomplete
            options={filteredLanguages}
            filterOptions={filterOptions}
            getOptionLabel={(option) => option.name}
            value={selectedEducation}
            onChange={(_, value) => setSelectedEducation(value)}
            inputValue={inputValue}
            onInputChange={(_, value) => setInputValue(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select languages"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                value={selectedEducation ? selectedEducation.names : ""}
              />
            )}
          />

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleModalClose}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleModalSubmit}
              color="primary"
            >
              Submit
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Table sx={{ minWidth: 700 }}>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((item: Languages) => {
            return (
              <TableRow hover key={item.id}>
                <TableCell>{item.value}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 5 }}
                    onClick={() => handleAddToExistingClick(item.value)}
                  >
                    Add to existing
                  </Button>

                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleCreateNewClick(item.value)}
                  >
                    Create new
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={languagesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
