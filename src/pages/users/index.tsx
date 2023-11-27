import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Link from "next/link";
import DashboardLayout from "../../layouts/Dashboard";
import { useDispatch, useSelector } from "../../store";
import { paths } from "../../paths";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import { UserListTable } from "../../sections/user/user-list-table";
import React, { ReactElement, useEffect } from "react";
import { getAllUsers, getUserInfo } from "../../thunks/userList";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet-async";
import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../contexts/auth/amplify-context";
import withAccessControl from "../../layouts/accessControl";
import { ROLE } from "../../constants";

function Users() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const userData = useSelector((state) => state.users.user);
  const isSuccessLoad = useSelector((state) => state.users.isSuccess);

  return (
    <>
      <Helmet title="Users" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h3" gutterBottom display="inline">
                  Users
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1} />
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Link href={paths.users.create}>
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Add
                  </Button>
                </Link>
              </Stack>
            </Stack>
            {isSuccessLoad && userData ? (
              <Card>
                <UserListTable users={userData} />
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

Users.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN])(Users);
