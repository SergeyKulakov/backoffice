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
import { ResearcherFormSellside } from "../../sections/researcher/researcher-form-sellside";

function ProfileSellsideResearcher() {
  return (
    <>
      <Head>
        <title>Dashboard: Researcher Sellside | Exactitude</title>
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
            <ResearcherFormSellside />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

ProfileSellsideResearcher.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default ProfileSellsideResearcher;
