import { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import DashboardLayout from "../../layouts/Dashboard";
import { paths } from "../../paths";

import {
  Box,
  Container,
  Stack,
  SvgIcon,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { CityCreateForm } from "../../sections/dictionaries/city-create-form";
import { useRouter } from "next/router";
import withAccessControl from "../../layouts/accessControl";
import { ROLE } from "../../constants";

function Create() {
  const router = useRouter();
  const [city, setCity] = useState<string | undefined>();
  useEffect(() => {
    if (router.isReady) {
      setCity(router.query.city as string | undefined);
    }
  }, [router.isReady, router.query]);
  return (
    <>
      <Head>
        <title>Create City</title>
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
                    <Typography variant="subtitle2">List Cities</Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            {city !== undefined && <CityCreateForm data={city} />}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

Create.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(Create);
