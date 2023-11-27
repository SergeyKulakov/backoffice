import React, { ReactElement, useEffect } from "react";
import DashboardLayout from "../../../layouts/Dashboard";
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
import { paths } from "../../../paths";
import { useDispatch, useSelector } from "../../../store";
import {
  getAllEducation,
  getUnverifiedEducation,
} from "../../../thunks/education";
import Loader from "../../../components/Loader";
import { EducationUnverifiedListTable } from "../../../sections/dictionaries/education/list-unverified";

function EducationUnverified() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUnverifiedEducation());
    dispatch(getAllEducation());
  }, [dispatch]);

  const educationData = useSelector(
    (state) => state.education.educationUnverified
  );
  const educationUniversities = useSelector(
    (state) => state.education.education
  );
  const isSuccessLoad = useSelector((state) => state.education.isSuccess);
  const isNotSuccessLoad = useSelector((state) => state.education.isError);
  const isLoad =
    isSuccessLoad && educationData && educationData.data.length > 0;
  const isNotLoad =
    isNotSuccessLoad || (educationData && educationData.data.length < 1);
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
                <EducationUnverifiedListTable
                  data={educationData}
                  //@ts-ignore
                  dataUniversities={educationUniversities}
                />
              </Card>
            ) : isNotLoad ? (
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

EducationUnverified.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default EducationUnverified;
