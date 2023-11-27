import React, { ChangeEvent, FC, useRef, useState, useEffect } from "react";
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
import { Degree } from "../../types/degree";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch, useSelector } from "../../store";
import {
  getAllDegree,
  removeDegreeTypes,
  updateDegreeTypes,
} from "../../thunks/degree";
import { paths } from "../../paths";
import { useRouter } from "next/router";
import { CompanyUnverified } from "../../types/companies";
import {
  getAllCompanies,
  getUnverifiedCompanies,
  updateCompaniesTypes,
} from "../../thunks/companies";
import { getAllCompanyType } from "../../thunks/companyTypes";
import Link from "next/link";
import toast from "react-hot-toast";
interface IProps {
  data: CompanyUnverified;
  dataCompanies: Company[];
}
type Companies = {
  id: string;
  value: string;
};
interface Company {
  _id: string | undefined;
  name: string | null | undefined;
  names: any;
  value: string;
  company_type: {
    _id: string;
  };
}
const rowsPerPageOptions = [10, 15, 20];

export const CompaniesUnverifiedListTable: FC<IProps> = ({
  data,
  dataCompanies,
}) => {
  const companiesData = data.data;
  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [selectedSubtype, setSelectedSubtype] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [selectedCompanyType, setSelectedCompanyType] = useState("");
  const companyTypes = useSelector((state) => state.companyType.companyType);
  useEffect(() => {
    dispatch(getAllCompanyType());
  }, [dispatch]);
  const toNameRef = useRef();

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [selectedCompanyName, setSelectedCompanyName] = useState("");
  const [filteredDataCompanies, setFilteredDataCompanies] = useState<Company[]>(
    []
  );
  const [selectedCompanySubtype, setSelectedCompanySubtype] = useState("");
  const handleAddToExistingClick = (companyName: string) => {
    setSelectedCompanyName(companyName);
    setIsModalOpen(true);
  };
  const handleCompanyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const companyId = event.target.value;

    if (companyTypes && dataCompanies) {
      const company = companyTypes.find(
        (company: { _id: string }) => company._id === companyId
      );
      setSelectedCompanyType(company?._id || "");
      setSelectedCompany(null);
      setSelectedCompanySubtype("");

      const filteredCompanies = dataCompanies.filter(
        (company: Company) => company.company_type._id === selectedCompanyType
      );
      setFilteredDataCompanies(filteredCompanies);
    }
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };
  const handleModalSubmit = async () => {
    if (selectedCompany) {
      try {
        const companyNames = selectedCompany.names;
        await dispatch(
          updateCompaniesTypes({
            name: selectedCompany.name,
            _id: selectedCompany._id,
            company_type: selectedCompanyType,
            names: [...(companyNames as []), selectedCompanyName],
          })
        ).unwrap();
        await dispatch(getUnverifiedCompanies());
        await dispatch(getAllCompanies());
        toast.success("Companies added");
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
  const handleSubtypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subtypeId = event.target.value;
    const companiesForSubtype = dataCompanies.filter(
      (company: any) => company.company_type._id === selectedCompanyType
    );
    setSelectedSubtype(subtypeId);
    setSelectedCompany(companiesForSubtype[0] || null);
  };

  const displayedRows = companiesData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const handleCreateNewClick = (company: string) => {
    router.push({
      pathname: paths.dictionary.createCompanies,
      query: { company: company },
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
        <DialogTitle>Add as alias to existing Company</DialogTitle>
        <DialogContent>
          <TextField
            label="Company Type"
            name="company_type"
            fullWidth
            select
            SelectProps={{ native: true }}
            inputRef={toNameRef}
            InputLabelProps={{ shrink: true }}
            value={selectedCompanyType}
            onChange={handleCompanyChange}
          >
            <option value="">Select a company</option>
            {Array.isArray(companyTypes) &&
              companyTypes.map((company) => (
                <option key={company._id} value={company._id}>
                  {company.name}
                </option>
              ))}
          </TextField>
          <TextField
            label="Select Company"
            name="subtype"
            fullWidth
            select
            SelectProps={{ native: true }}
            inputRef={toNameRef}
            InputLabelProps={{ shrink: true }}
            disabled={!selectedCompanyType}
            value={selectedSubtype}
            onChange={handleSubtypeChange}
            sx={{ mt: "20px" }}
          >
            <option value="">Select Company</option>
            {dataCompanies
              ?.filter(
                (company) => company.company_type._id === selectedCompanyType
              )
              .map((subtype: any, index) => (
                <option key={index} value={subtype._id}>
                  {subtype.name}
                </option>
              ))}
          </TextField>

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
            {/* <TableCell>Type</TableCell> */}
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((item: Companies) => {
            return (
              <TableRow hover key={item.id}>
                <TableCell>{item.value}</TableCell>
                {/* <TableCell>{item.name}</TableCell> */}
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 5 }}
                    onClick={() => handleAddToExistingClick(item.value as any)}
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
        count={companiesData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
