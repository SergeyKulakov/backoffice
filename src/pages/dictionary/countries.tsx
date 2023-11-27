import React, { ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "../../layouts/Dashboard";
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
import { paths } from "../../paths";
import { useDispatch, useSelector } from "../../store";
import { getAllDCountries } from "../../thunks/countries";
import Loader from "../../components/Loader";
import { CountriesListTable } from "../../sections/dictionaries/countries-list-table";
import router from "next/router";
function Countries() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDCountries());
  }, [dispatch]);

  const countriesData = useSelector((state) => state.country.name);
  const isSuccessLoad = useSelector((state) => state.country.isSuccess);
  const handleCreateNewClick = () => {
    router.push({
      pathname: paths.dictionary.createCountry,
      query: { country: "" },
    });
  };
  return (
    <>
      <Helmet title="Countries" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h3" gutterBottom display="inline">
                  Countries list
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1} />
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => handleCreateNewClick()}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            {isSuccessLoad && countriesData && countriesData.length > 0 ? (
              <Card>
                <CountriesListTable data={countriesData} />
              </Card>
            ) : countriesData && countriesData.length === 0 ? (
              <Stack alignItems="center">
                <Typography variant="h6">No countries found</Typography>
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

Countries.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Countries;
