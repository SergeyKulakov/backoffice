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
import { getAllGender } from "../../../thunks/gender";
import Loader from "../../../components/Loader";
import { GenderListTable } from "../../../sections/dictionaries/gender/list-table";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function Gender() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllGender());
  }, [dispatch]);

  const genderData = useSelector((state) => state.gender.gender);
  const isSuccessLoad = useSelector((state) => state.gender.isSuccess);
  const isLoadData = isSuccessLoad && genderData && genderData.length > 0;
  const isNotFoundData = genderData && genderData.length === 0;

  return (
    <>
      <Helmet title="Gender" />
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
                  Gender list
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1} />
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Link href={paths.dictionary.gender.create}>
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
                <GenderListTable data={genderData} />
              </Card>
            ) : isNotFoundData ? (
              <Stack alignItems="center">
                <Typography variant="h6">No gender found</Typography>
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

Gender.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(Gender);
