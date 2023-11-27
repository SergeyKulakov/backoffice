import { ReactElement } from "react";
import Head from "next/head";
import Link from "next/link";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import DashboardLayout from "../../../layouts/Dashboard";
import { DiversityCreateForm } from "../../../sections/dictionaries/diversity/create-form";
import { paths } from "../../../paths";

import {
  Box,
  Container,
  Stack,
  SvgIcon,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function Create() {
  return (
    <>
      <Head>
        <title>Create Diversity | Exactitude</title>
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
                <Link href={paths.dictionary.diversity.index} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.diversity.index}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">List Diversity</Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            <DiversityCreateForm />
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
