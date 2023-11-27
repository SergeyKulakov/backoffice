import React, { ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "../../../layouts/Dashboard";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { paths } from "../../../paths";
import { useDispatch, useSelector } from "../../../store";
import Loader from "../../../components/Loader";
import {
  getUnverifiedCities,
  getUnverifiedCountries,
  getAllDCountries,
} from "../../../thunks/countries";
import { CountriesUnverifiedListTable } from "../../../sections/dictionaries/countries-unverified-list";

function CountriesUnverified() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnverifiedCountries());
    dispatch(getUnverifiedCities());
    dispatch(getAllDCountries());
  }, [dispatch]);

  const countriesData = useSelector((state) => state.country.countryUnverified);
  const citiesData = useSelector((state) => state.country.cityUnverified);
  const allCountries = useSelector((state) => state.country.name);
  const isSuccessLoad = useSelector((state) => state.country.isSuccess);
  const isNotSuccessLoad = useSelector((state) => state.country.isError);
  const isLoad =
    isSuccessLoad && countriesData && countriesData.data.length > 0;
  const isNotLoad =
    isNotSuccessLoad || (countriesData && countriesData.data.length < 1);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            {isLoad ? (
              <Card>
                <CountriesUnverifiedListTable
                  data={countriesData}
                  //@ts-ignore
                  dataCountries={allCountries}
                  //@ts-ignore
                  dataCities={citiesData}
                />
              </Card>
            ) : isNotLoad ? (
              <Stack alignItems="center">
                <Typography variant="h6">No Countries found</Typography>
              </Stack>
            ) : (
              <Stack alignItems="center">
                <Loader />
              </Stack>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

CountriesUnverified.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CountriesUnverified;
