import { ReactElement, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "../../../store";
import { getOneCountry } from "../../../thunks/countries";
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
import { CountriesEditForm } from "../../../sections/dictionaries/countries-edit-form";
import Loader from "../../../components/Loader";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";
function SinglePageCounrties() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const countriesData = useSelector((state) => state.country.names);
  const isSuccess = useSelector((state) => state.country.isSuccess);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getOneCountry(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>Countries</title>
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
                <Link href={paths.dictionary.countries.countryMain} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.countries.countryMain}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">List Countries</Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            {isSuccess && countriesData ? (
              <Card>
                <CountriesEditForm data={countriesData} allLanguages={[]} />
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

SinglePageCounrties.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(
  SinglePageCounrties
);
