import React, { ReactElement } from "react";
import Head from "next/head";
import Link from "next/link";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import DashboardLayout from "../../layouts/Dashboard";
import { IndexUpdateForm } from "../../sections/csv/idex-update-form";
import { paths } from "../../paths";

import {
  Box,
  Container,
  Stack,
  SvgIcon,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import withAccessControl from "../../layouts/accessControl";
import { ROLE } from "../../constants";

function Create() {
  return (
    <>
      <Head>
        <title>CSV Index Update | Exactitude</title>
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
                <Link href={paths.csv.upload} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.csv.upload}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">CSV List</Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            <IndexUpdateForm />
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
