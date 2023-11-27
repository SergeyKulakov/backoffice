import { ReactElement, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import DashboardLayout from "../../../layouts/Dashboard";
import { paths } from "../../../paths";

import {
  Box,
  Container,
  Stack,
  SvgIcon,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { LanguageCreateForm } from "../../../sections/dictionaries/languages/create-form";
import { useRouter } from "next/router";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function Create() {
  const router = useRouter();
  const [language, setLanguage] = useState<string | undefined>();
  useEffect(() => {
    if (router.isReady) {
      setLanguage(router.query.language as string | undefined);
    }
  }, [router.isReady, router.query]);
  return (
    <>
      <Head>
        <title>Create Language | Exactitude</title>
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
            {language !== undefined && <LanguageCreateForm data={language} />}
          </Stack>
        </Container>
      </Box>
    </>
  );
}

Create.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(Create);
