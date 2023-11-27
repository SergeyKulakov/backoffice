import { ReactElement, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "../../../store";
import { getOneCompany } from "../../../thunks/companies";
import { useRouter } from "next/router";
import DashboardLayout from "../../../layouts/Dashboard";
import Head from "next/head";
import {
  Box,
  Card,
  Container,
  Link as MuiLink,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { paths } from "../../../paths";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { CompaniesEditForm } from "../../../sections/dictionaries/companies-edit-form";
import Loader from "../../../components/Loader";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function SinglePageCompanies() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const companiesData = useSelector((state) => state.company.companyItem);
  const isSuccess = useSelector((state) => state.company.isSuccess);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getOneCompany(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>Companies</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={4}>
            <Stack spacing={4}>
              <div>
                <Link href={paths.dictionary.companiesMain} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.companiesMain}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">List Companies</Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            {isSuccess && companiesData ? (
              <Card>
                <CompaniesEditForm data={companiesData} />
              </Card>
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

SinglePageCompanies.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(
  SinglePageCompanies
);
