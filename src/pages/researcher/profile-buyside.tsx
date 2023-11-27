import React, { ReactElement } from "react";
import Link from "next/link";
import Head from "next/head";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import DashboardLayout from "../../layouts/Dashboard";
import { ResearcherForm } from "../../sections/researcher/researcher-form-buyside";
import { paths } from "../../paths";
import {
  Box,
  Container,
  Stack,
  SvgIcon,
  Link as MuiLink,
  Typography,
} from "@mui/material";

function ProfileBuysideResearcher() {
  return (
    <>
      <Head>
        <title>Dashboard: Researcher Buyside | Exactitude</title>
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
            <ResearcherForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

ProfileBuysideResearcher.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProfileBuysideResearcher;
