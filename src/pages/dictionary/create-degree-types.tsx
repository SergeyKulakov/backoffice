import { ReactElement, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import DashboardLayout from "../../layouts/Dashboard";
import { paths } from "../../paths";

import {
  Box,
  Container,
  Stack,
  SvgIcon,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { DegreeCreateForm } from "../../sections/dictionaries/degree-create-form";
import { useRouter } from "next/router";
import withAccessControl from "../../layouts/accessControl";
import { ROLE } from "../../constants";

function Create() {
  const router = useRouter();
  const [degree, setDegree] = useState<string | undefined>();
  useEffect(() => {
    if (router.isReady) {
      setDegree(router.query.degree as string | undefined);
    }
  }, [router.isReady, router.query]);
  return (
    <>
      <Head>
        <title>Create Degree Types | Exactitude</title>
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
                <Link href={paths.dictionary.degreeMain} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.degreeMain}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">
                      List Degree Types
                    </Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            {degree !== undefined && <DegreeCreateForm data={degree} />}
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
