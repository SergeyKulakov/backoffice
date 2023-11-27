import React, { ReactElement } from "react";
import Head from "next/head";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import {
  Box,
  Container,
  Stack,
  SvgIcon,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import Link from "next/link";
import DashboardLayout from "../../layouts/Dashboard";
import { paths } from "../../paths";
import { SupervisorForm } from "../../sections/supervisor/supervisor-form";
import withAccessControl from "../../layouts/accessControl";
import { ROLE } from "../../constants";

function ProfileSellsideSupervisor() {
  return (
    <>
      <Head>
        <title>Dashboard: Supervisor Sellside | Exactitude</title>
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
                <Link href={paths.users.index} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.users.index}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">People list</Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            <SupervisorForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

ProfileSellsideSupervisor.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(
  ProfileSellsideSupervisor
);
