import { ReactElement, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "../../../store";
import { getOneLanguage } from "../../../thunks/language";
import { useRouter } from "next/router";
import DashboardLayout from "../../../layouts/Dashboard";
import Head from "next/head";
import {
  Box,
  Card,
  Container,
  Link as MuiLink,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import { paths } from "../../../paths";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { LanguageEditForm } from "../../../sections/dictionaries/languages/edit-form";
import Loader from "../../../components/Loader";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function SinglePageLanguage() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const languageData = useSelector((state) => state.language.languageItem);
  const isSuccess = useSelector((state) => state.language.isSuccess);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getOneLanguage(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>Language | Exactitude</title>
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
                <Link href={paths.dictionary.language.languageMain} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.language.languageMain}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">List Languages</Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            {isSuccess && languageData ? (
              <Card>
                <LanguageEditForm data={languageData} />
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

SinglePageLanguage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(
  SinglePageLanguage
);
