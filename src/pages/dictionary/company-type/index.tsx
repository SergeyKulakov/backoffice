import React, { ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "../../../layouts/Dashboard";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { CompanyTypeListTable } from "../../../sections/dictionaries/company-type/list-table";
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
import { getAllCompanyType } from "../../../thunks/companyTypes";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function CompanyType() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCompanyType());
  }, [dispatch]);

  const companyData = useSelector((state) => state.companyType.companyType);
  const isSuccessLoad = useSelector((state) => state.companyType.isSuccess);
  const isLoadData = isSuccessLoad && companyData && companyData.length > 0;
  const isNotFoundData = companyData && companyData.length === 0;

  return (
    <>
      <Helmet title="Company Type" />
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
                  Company types list
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1} />
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Link href={paths.dictionary.companyType.create}>
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </Link>
              </Stack>
            </Stack>
            {isLoadData ? (
              <Card>
                <CompanyTypeListTable data={companyData} />
              </Card>
            ) : isNotFoundData ? (
              <Stack alignItems="center">
                <Typography variant="h6">No company types found</Typography>
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

CompanyType.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(CompanyType);
