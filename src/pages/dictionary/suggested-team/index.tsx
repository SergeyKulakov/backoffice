import { ReactElement, useEffect } from "react";
import Link from "next/link";
import { Helmet } from "react-helmet-async";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import DashboardLayout from "../../../layouts/Dashboard";
import { paths } from "../../../paths";
import { useDispatch, useSelector } from "../../../store";
import { getAllSuggestedTeam } from "../../../thunks/suggested-team";
import Loader from "../../../components/Loader";
import { ListTable } from "../../../sections/dictionaries/suggested-team/list-table";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function Index() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSuggestedTeam());
  }, [dispatch]);

  const data = useSelector((state) => state.suggestedTeam.suggestedTeam);
  const isSuccessLoad = useSelector((state) => state.suggestedTeam.isSuccess);
  const isLoadData = isSuccessLoad && data && data.length > 0;
  const isNotFoundData = data && data.length === 0;

  return (
    <>
      <Helmet title="Suggested Team" />
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
                  Suggested team list
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1} />
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Link href={paths.dictionary.suggestedTeam.create}>
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
            {isLoadData ? (
              <Card>
                <ListTable data={data} />
              </Card>
            ) : isNotFoundData ? (
              <Stack alignItems="center">
                <Typography variant="h6">No suggested team found</Typography>
              </Stack>
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

Index.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(Index);
