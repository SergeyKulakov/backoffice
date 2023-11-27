import React, { ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "../../../layouts/Dashboard";
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
import { paths } from "../../../paths";
import { useDispatch, useSelector } from "../../../store";
import { getAllLanguage } from "../../../thunks/language";
import { LanguageListTable } from "../../../sections/dictionaries/languages/list-table";
import Loader from "../../../components/Loader";
import router from "next/router";

function LanguageDictionaries() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllLanguage());
  }, [dispatch]);

  const languageData = useSelector((state) => state.language.language);
  const isSuccessLoad = useSelector((state) => state.language.isSuccess);
  const handleCreateNewClick = () => {
    router.push({
      pathname: paths.dictionary.language.create,
      query: { language: "" },
    });
  };
  return (
    <>
      <Helmet title="Languages" />
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
                  Languages list
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
            {isSuccessLoad && languageData && languageData.length > 0 ? (
              <Card>
                <LanguageListTable data={languageData} />
              </Card>
            ) : languageData && languageData.length === 0 ? (
              <Stack alignItems="center">
                <Typography variant="h6">No languages types found</Typography>
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

LanguageDictionaries.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default LanguageDictionaries;
