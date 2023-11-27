import React, { ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "../../layouts/Dashboard";
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
import Link from "next/link";
import { paths } from "../../paths";
import { useDispatch, useSelector } from "../../store";
import { getAllDegree } from "../../thunks/degree";
import { DegreeListTable } from "../../sections/dictionaries/degree-list-table";
import Loader from "../../components/Loader";
import router from "next/router";

function DegreeTypes() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDegree());
  }, [dispatch]);

  const degreeData = useSelector((state) => state.degree.degree);
  const isSuccessLoad = useSelector((state) => state.degree.isSuccess);
  const handleCreateNewClick = () => {
    router.push({
      pathname: paths.dictionary.createDegreeTypes,
      query: { degree: "" },
    });
  };
  return (
    <>
      <Helmet title="Degree Types" />
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
                  Degree types list
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
            {isSuccessLoad && degreeData && degreeData.length > 0 ? (
              <Card>
                <DegreeListTable data={degreeData} />
              </Card>
            ) : degreeData && degreeData.length === 0 ? (
              <Stack alignItems="center">
                <Typography variant="h6">No degrees types found</Typography>
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

DegreeTypes.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DegreeTypes;
