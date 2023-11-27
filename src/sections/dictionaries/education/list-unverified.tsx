import React, { ChangeEvent, FC, useEffect, useMemo, useState } from "react";
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
  InputAdornment,
} from "@mui/material";
import { useDispatch } from "../../../store";
import { paths } from "../../../paths";
import { useRouter } from "next/router";
import Link from "next/link";
import { Education, EducationUnverified } from "../../../types/education";
import {
  getAllEducation,
  getUnverifiedEducation,
  updateEducation,
} from "../../../thunks/education";
import toast from "react-hot-toast";
interface IProps {
  data: EducationUnverified;
  dataUniversities: Education[];
}
type University = {
  _id: string;
  value: string;
};
const rowsPerPageOptions = [10, 15, 20];

export const EducationUnverifiedListTable: FC<IProps> = ({
  data,
  dataUniversities,
}) => {
  const universitiesData = data.data;
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedEducation, setSelectedEducation] = useState<Education | null>(
    null
  );
  const [selectedUniversityName, setSelectedUniversityName] = useState("");
  const handleModalSubmit = async () => {
    if (selectedEducation) {
      try {
        const degreeNames = selectedEducation.names;
        await dispatch(
          updateEducation({
            name: selectedEducation.name,
            _id: selectedEducation._id,
            names: [...degreeNames, selectedUniversityName],
          })
        ).unwrap();
        await dispatch(getUnverifiedEducation());
        await dispatch(getAllEducation());
        toast.success("University added");
        handleModalClose();
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
      }
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

  const displayedRows = universitiesData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const filteredUniversities = useMemo(() => {
    return dataUniversities.filter((university: any) =>
      university.name.toLowerCase().includes(inputValue.toLowerCase())
    );
  }, [dataUniversities, inputValue]);

  const filterOptions = (options: any[], { inputValue }: any) => {
    const filteredOptions = options.filter(
      (option) =>
        option.name.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1
    );
    return filteredOptions.filter((option, index, array) => {
      return array.findIndex((t) => t.name === option.name) === index;
    });
  };
  const handleCreateNewClick = (universityName: string) => {
    router.push({
      pathname: paths.dictionary.education.create,
      query: { university: universityName },
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
        aria-labelledby="add-university-dialog-title"
      >
        <DialogTitle id="add-university-dialog-title">
          Add as alias to existing university
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            options={filteredUniversities}
            filterOptions={filterOptions}
            getOptionLabel={(option: any) => option.name}
            onChange={(_, value: any) => setSelectedEducation(value)}
            inputValue={inputValue}
            onInputChange={(_, value) => setInputValue(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search university"
                fullWidth
                margin="normal"
                value={selectedEducation ? selectedEducation.name : ""}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      {!selectedEducation && (
                        <InputAdornment position="start">
                          <em>Select an option</em>
                        </InputAdornment>
                      )}
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
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
          {displayedRows.map((item: University) => {
            return (
              <TableRow hover key={item._id}>
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
        count={universitiesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
