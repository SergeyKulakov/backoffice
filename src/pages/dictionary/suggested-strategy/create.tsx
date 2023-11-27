import { ReactElement } from "react";
import Head from "next/head";
import Link from "next/link";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import DashboardLayout from "../../../layouts/Dashboard";
import { paths } from "../../../paths";
import { CreateForm } from "../../../sections/dictionaries/suggested-strategy/create-form";

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
        <title>Create suggested strategy | Exactitude</title>
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
                <Link href={paths.dictionary.suggestedStrategy.index} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.suggestedStrategy.index}
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
                      Suggested strategy list
                    </Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            <CreateForm />
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
