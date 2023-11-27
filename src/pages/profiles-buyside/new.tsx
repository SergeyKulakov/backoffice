import { ReactElement } from "react";
import Head from "next/head";
import DashboardLayout from "../../layouts/Dashboard";
import { NewProfilesForm } from "../../sections/profiles-buyside/new-profiles-form";

import { Box, Container, Stack } from "@mui/material";
import withAccessControl from "../../layouts/accessControl";
import { ROLE } from "../../constants";

function NewProfiles() {
  return (
    <>
      <Head>
        <title>New Profiles | Exactitude</title>
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
            <Container maxWidth="lg">
              <Stack spacing={4}>
                <NewProfilesForm />
              </Stack>
            </Container>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

NewProfiles.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([
  ROLE.ADMIN,
  ROLE.SUPERVISOR,
  ROLE.RESEARCHER,
])(NewProfiles);
