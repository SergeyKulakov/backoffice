import React, { ChangeEvent, FC, useEffect, useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";
import { Degree, DegreeUnverified } from "../../types/degree";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "../../store";
import {
  getAllDegree,
  getUnverifiedDegree,
  removeDegreeTypes,
  updateDegreeTypes,
} from "../../thunks/degree";
import { paths } from "../../paths";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
interface IProps {
  data: DegreeUnverified;
  unverifiedDegree: Degree[] | null;
}
type Degrees = {
  id: string;
  value: string;
};
const rowsPerPageOptions = [10, 15, 20];

export const DegreeUnverifiedListTable: FC<IProps> = ({
  data,
  unverifiedDegree,
}) => {
  const degreeData = data.data;
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedDegree, setSelectedDegree] = useState<Degree | null>(null);
  const [selectedDegreeName, setSelectedDegreeName] = useState("");

  const handleAddToExistingClick = (degreeName: string) => {
    setSelectedDegreeName(degreeName);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDegree(null);
  };
  const handleModalSubmit = async () => {
    if (selectedDegree) {
      try {
        const degreeNames = selectedDegree.degree_names;
        await dispatch(
          updateDegreeTypes({
            degree_name: selectedDegree.degree_name,
            _id: selectedDegree._id,
            degree_names: [...degreeNames, selectedDegreeName],
          })
        ).unwrap();
        await dispatch(getUnverifiedDegree());
        await dispatch(getAllDegree());
        toast.success("Degree added");
        handleModalClose();
      } catch (err) {
        // @ts-ignore
        toast.error(err.message[0]);
      }
    }
  };
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedRows = degreeData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const handleCreateNewClick = (degree: string) => {
    router.push({
      pathname: paths.dictionary.createDegreeTypes,
      query: { degree: degree },
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
        <DialogTitle>Add as alias to existing Degree</DialogTitle>
        <DialogContent>
          <Autocomplete
            //@ts-ignore
            options={unverifiedDegree}
            getOptionLabel={(option) => option.degree_name}
            value={selectedDegree}
            onChange={(_, value) => setSelectedDegree(value)}
            inputValue={inputValue}
            InputLabelProps={{ shrink: true }}
            onInputChange={(_, value) => setInputValue(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select degree"
                fullWidth
                margin="normal"
                value={selectedDegree ? selectedDegree.degree_names : ""}
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
          {displayedRows.map((item: Degrees) => {
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
        count={degreeData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
