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
import Loader from "../../components/Loader";
import { CompaniesUnverifiedListTable } from "../../sections/dictionaries/companies-unverified-list";
import {
  getUnverifiedCompanies,
  getAllCompanies,
} from "../../thunks/companies";

function CompaniesUnverified() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnverifiedCompanies());
    dispatch(getAllCompanies());
  }, [dispatch]);

  const companiesData = useSelector((state) => state.company.companyUnverified);
  const allCompanies = useSelector((state) => state.company.company);
  const isSuccessLoad = useSelector((state) => state.company.isSuccess);
  const isNotSuccessLoad = useSelector((state) => state.company.isError);
  const isLoad =
    isSuccessLoad && companiesData && companiesData.data.length > 0;
  const isNotLoad =
    isNotSuccessLoad || (companiesData && companiesData.data.length < 1);
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
                <CompaniesUnverifiedListTable
                  data={companiesData}
                  //@ts-ignore
                  dataCompanies={allCompanies}
                />
              </Card>
            ) : isNotLoad ? (
              <Stack alignItems="center">
                <Typography variant="h6">No Companies found</Typography>
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

CompaniesUnverified.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default CompaniesUnverified;
