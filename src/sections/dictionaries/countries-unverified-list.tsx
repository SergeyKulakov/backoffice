import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
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
import {
  Country,
  CountryUnverified,
  CityUnverified,
} from "../../types/countries";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDispatch } from "../../store";
import {
  getAllDCountries,
  getUnverifiedCities,
  updateCountries,
  getUnverifiedCountries,
} from "../../thunks/countries";
import { paths } from "../../paths";
import { useRouter } from "next/router";
import Link from "next/link";
import toast from "react-hot-toast";
interface IProps {
  data: CountryUnverified;
  dataCities: CityUnverified;
  dataCountries: Country[];
}
type Countries = {
  id: string;
  value: string;
};
const rowsPerPageOptions = [10, 15, 20];

export const CountriesUnverifiedListTable: FC<IProps> = ({
  data,
  dataCountries,
  dataCities,
}) => {
  const countryData = data.data;
  const cityData = dataCities.data;

  const router = useRouter();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const toNameRef = useRef();
  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCity, setIsModalOpenCity] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedDegree, setSelectedDegree] = useState<Country | null>(null);
  const [selectedDegreeName, setSelectedDegreeName] = useState("");
  const [selectCountry, setSelectedCountry] = useState("");
  const handleAddToExistingClick = (degreeName: string) => {
    setSelectedDegreeName(degreeName);
    setIsModalOpen(true);
  };
  const [selectedCityValue, setSelectedCityValue] = useState("");
  const [filteredDataCountries, setFilteredDataCountries] = useState<Country[]>(
    []
  );
  const handleAddToExistingCity = (degreeName: string) => {
    setSelectedCityValue(degreeName);
    setIsModalOpenCity(true);
  };

  const handleCountryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const countryId = event.target.value;

    if (dataCountries) {
      const country = dataCountries.find(
        (country: { _id: string }) => country._id === countryId
      );
      setSelectedCountry(country?._id || "");
      const filteredCountries = dataCountries.filter(
        (country: Country) => country._id === selectCountry
      );
      setFilteredDataCountries(filteredCountries);
      //   setSelectedCity("")
      // setSelectedCompany(null);
      //   setSelectedCompanySubtype("");
    }
  };
  const handleCityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const subtypeId = event.target.value;
    const filteredCities = dataCountries.filter(
      (company: any) => company.cities.names
    );
    setSelectedCity(subtypeId);
    setSelectedDegree(filteredCities[0] || null);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedDegree(null);
  };
  const handleModalCloseCity = () => {
    setIsModalOpenCity(false);
    setSelectedDegree(null);
  };
  const handleModalSubmit = async () => {
    if (selectCountry) {
      const filtered = dataCountries.find((el) => el._id === selectCountry);
      if (filtered) {
        try {
          const degreeNames = filtered.names;
          await dispatch(
            updateCountries({
              name: filtered.name,
              _id: selectCountry,
              names: [...degreeNames, selectedDegreeName],
            })
          ).unwrap();
          await dispatch(getUnverifiedCountries());
          await dispatch(getUnverifiedCities());
          await dispatch(getAllDCountries());
          toast.success("Countries added");
          handleModalClose();
        } catch (err) {
          // @ts-ignore
          toast.error(err.message[0]);
        }
      }
    }
  };
  const handleModalSubmitCity = async () => {
    if (selectCountry) {
      const filtered = dataCountries.find((el) => el._id === selectCountry);
      if (filtered) {
        try {
          const filteredCities = filtered.cities.filter(
            (city: any) => city._id === selectedCity
          );

          const updatedCities = filtered.cities.map((city: any) => {
            if (city._id === selectedCity) {
              return {
                name: filteredCities[0].name,
                _id: selectedCity,
                //@ts-ignore
                names: [...filteredCities[0].names, selectedCityValue],
              };
            }
            return city;
          });

          await dispatch(
            updateCountries({
              name: filtered.name,
              _id: selectCountry,
              names: [...filtered.names],
              cities: updatedCities,
            })
          ).unwrap();

          await dispatch(getUnverifiedCountries());
          await dispatch(getUnverifiedCities());
          await dispatch(getAllDCountries());
          toast.success("Cities added");
          handleModalCloseCity();
        } catch (err) {
          // @ts-ignore
          toast.error(err.message[0]);
        }
      }
    }
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const displayedRows = countryData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const displayedRowsCities = cityData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  const handleCreateNewClick = (country: string) => {
    router.push({
      pathname: paths.dictionary.createCountry,
      query: { country: country },
    });
  };
  const handleCreateNewClickCity = (city: string) => {
    router.push({
      pathname: paths.dictionary.createCity,
      query: { city: city },
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
            pt: "10px",
            // minHeight: "250px",
            minWidth: "450px",
          },
        }}
      >
        <DialogTitle>Add as alias to existing Country</DialogTitle>
        <DialogContent>
          <TextField
            label="Select Country"
            name="country"
            fullWidth
            select
            SelectProps={{ native: true }}
            inputRef={toNameRef}
            InputLabelProps={{ shrink: !!toNameRef.current }}
            value={selectCountry}
            onChange={handleCountryChange}
          >
            <option value="">Select a country</option>
            {Array.isArray(dataCountries) &&
              dataCountries.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.name}
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
      <Dialog
        open={isModalOpenCity}
        onClose={handleModalCloseCity}
        maxWidth="md"
        sx={{
          "& .MuiDialogContent-root": {
            minHeight: "auto",
            minWidth: "450px",
            pt: "20px",
          },
        }}
      >
        <DialogTitle>Add as alias to existing City</DialogTitle>
        <DialogContent>
          <TextField
            label="Select Country"
            name="country"
            fullWidth
            select
            SelectProps={{ native: true }}
            inputRef={toNameRef}
            value={selectCountry}
            InputLabelProps={{ shrink: true }}
            onChange={handleCountryChange}
          >
            <option value="">Select a country</option>
            {Array.isArray(dataCountries) &&
              dataCountries.map((country) => (
                <option key={country._id} value={country._id}>
                  {country.name}
                </option>
              ))}
          </TextField>
          <TextField
            label="Select City"
            name="cities"
            fullWidth
            select
            SelectProps={{ native: true }}
            inputRef={toNameRef}
            InputLabelProps={{ shrink: true }}
            value={selectedCity}
            disabled={!selectCountry}
            onChange={handleCityChange}
            sx={{ mt: "20px" }}
          >
            <option value="">Select City</option>
            {dataCountries
              .filter((country) => country._id === selectCountry)
              .map((country) =>
                country.cities.map((city: any) => (
                  <option key={city._id} value={city._id}>
                    {city.name}
                  </option>
                ))
              )}
          </TextField>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              onClick={handleModalCloseCity}
              sx={{ mr: 1 }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleModalSubmitCity}
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
            <TableCell>Type</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {displayedRows.map((item: Countries) => {
            return (
              <TableRow hover key={item.id}>
                <TableCell>{item.value}</TableCell>
                <TableCell>Country</TableCell>
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
          {displayedRowsCities.map((item: Countries) => {
            return (
              <TableRow hover key={item.id}>
                <TableCell>{item.value}</TableCell>
                <TableCell>City</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    sx={{ mr: 5 }}
                    onClick={() => handleAddToExistingCity(item.value)}
                  >
                    Add to existing
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => handleCreateNewClickCity(item.value)}
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
        count={countryData.length + cityData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};
