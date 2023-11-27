import React, { ReactElement, useEffect, useState } from "react";
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
import { getAllCompanies } from "../../thunks/companies";
import Loader from "../../components/Loader";
import { CompaniesListTable } from "../../sections/dictionaries/companies-list-table";
import router from "next/router";

function Companies() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    const limit = 10;
    if (page === 0 && rowsPerPage === 10) {
      //@ts-ignore
      dispatch(getAllCompanies({ limit }));
    }
  }, [dispatch, page, rowsPerPage]);

  const companiesData = useSelector((state) => state.company.company);
  const isSuccessLoad = useSelector((state) => state.company.isSuccess);
  const isExist = isSuccessLoad && companiesData && companiesData.length > 0;
  const isCompanies = companiesData && companiesData.length === 0;
  const handleCreateNewClick = () => {
    router.push({
      pathname: paths.dictionary.createCompanies,
      query: { company: "" },
    });
  };
  return (
    <>
      <Helmet title="Companies" />
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
                  Companies list
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
            {isExist ? (
              <Card>
                <CompaniesListTable data={companiesData} />
              </Card>
            ) : isCompanies ? (
              <Stack alignItems="center">
                <Typography variant="h6">No companies types found</Typography>
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

Companies.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Companies;
