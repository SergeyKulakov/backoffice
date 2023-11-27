import { ReactElement, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "../../../store";
import { getOneCompanyType } from "../../../thunks/companyTypes";
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
import { CompanyTypeEditForm } from "../../../sections/dictionaries/company-type/edit-form";
import Loader from "../../../components/Loader";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function SinglePageCompanyType() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;

  const companyData = useSelector((state) => state.companyType.companyTypeItem);
  const isSuccess = useSelector((state) => state.companyType.isSuccess);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getOneCompanyType(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>Company Types | Exactitude</title>
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
                <Link href={paths.dictionary.companyType.index} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.companyType.index}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">
                      List Company Types
                    </Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            {isSuccess && companyData ? (
              <Card>
                <CompanyTypeEditForm data={companyData} />
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

SinglePageCompanyType.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(
  SinglePageCompanyType
);
