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
  getAllLanguage,
  getUnverifiedLanguages,
} from "../../../thunks/language";
import Loader from "../../../components/Loader";
import { LanguageUnverifiedListTable } from "../../../sections/dictionaries/languages/list-unverified";

function LanguageUnverified() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLanguage());
    dispatch(getUnverifiedLanguages());
  }, [dispatch]);

  const languageData = useSelector(
    (state) => state.language.languagesUnverified
  );
  const languages = useSelector((state) => state.language.language);
  const isSuccessLoad = useSelector((state) => state.language.isSuccess);
  const isNotSuccessLoad = useSelector((state) => state.language.isError);
  const isLoad = isSuccessLoad && languageData && languageData.data.length > 0;
  const isNotLoad =
    isNotSuccessLoad || (languageData && languageData.data.length < 1);
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
                <LanguageUnverifiedListTable
                  data={languageData}
                  //@ts-ignore
                  languages={languages}
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

LanguageUnverified.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default LanguageUnverified;
