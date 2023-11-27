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
import { UserCreateForm } from "../../sections/user/user-create-form";
import withAccessControl from "../../layouts/accessControl";
import { ROLE } from "../../constants";

function UsersCreate() {
  return (
    <>
      <Head>
        <title>Dashboard: User Create | Exactitude</title>
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
                    <Typography variant="subtitle2">Users List</Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            <UserCreateForm />
          </Stack>
        </Container>
      </Box>
    </>
  );
}

UsersCreate.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN])(UsersCreate);
