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
import { getAllEducation } from "../../../thunks/education";
import Loader from "../../../components/Loader";
import { EducationListTable } from "../../../sections/dictionaries/education/list-table";
import router from "next/router";

function Education() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllEducation());
  }, [dispatch]);

  const educationData = useSelector((state) => state.education.education);
  const isSuccessLoad = useSelector((state) => state.education.isSuccess);
  const isLoadData = isSuccessLoad && educationData && educationData.length > 0;
  const isNotFoundData = educationData && educationData.length === 0;
  const handleCreateNewClick = () => {
    router.push({
      pathname: paths.dictionary.education.create,
      query: { university: "" },
    });
  };
  return (
    <>
      <Helmet title="Education" />
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
                  Universities list
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1} />
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  startIcon={
                    <SvgIcon>
                      <PlusIcon />
                    </SvgIcon>
                  }
                  variant="contained"
                  onClick={() => handleCreateNewClick()}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            {isLoadData ? (
              <Card>
                <EducationListTable data={educationData} />
              </Card>
            ) : isNotFoundData ? (
              <Stack alignItems="center">
                <Typography variant="h6">No universities found</Typography>
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

Education.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default Education;
