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
import { getAllDegree, getUnverifiedDegree } from "../../thunks/degree";
import Loader from "../../components/Loader";
import { DegreeUnverifiedListTable } from "../../sections/dictionaries/degree-unferified-list";

function DegreeTypesUnverified() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDegree());
    dispatch(getUnverifiedDegree());
  }, [dispatch]);

  const degreeData = useSelector((state) => state.degree.degreeUnverified);
  const allDegrees = useSelector((state) => state.degree.degree);
  const isSuccessLoad = useSelector((state) => state.degree.isSuccess);
  const isNotSuccessLoad = useSelector((state) => state.degree.isError);
  const isLoad = isSuccessLoad && degreeData && degreeData.data.length > 0;
  const isNotLoad =
    isNotSuccessLoad || (degreeData && degreeData.data.length < 1);
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            {isLoad ? (
              <Card>
                <DegreeUnverifiedListTable
                  data={degreeData}
                  unverifiedDegree={allDegrees}
                />
              </Card>
            ) : isNotLoad ? (
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

DegreeTypesUnverified.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DegreeTypesUnverified;
