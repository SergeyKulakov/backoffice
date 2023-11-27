import { ReactElement, useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import DashboardLayout from "../../../layouts/Dashboard";
import { EducationCreateForm } from "../../../sections/dictionaries/education/create-form";
import { paths } from "../../../paths";

import {
  Box,
  Container,
  Stack,
  SvgIcon,
  Link as MuiLink,
  Typography,
} from "@mui/material";
import { getAllDCountries } from "../../../thunks/countries";
import { useDispatch, useSelector } from "../../../store";
import { useRouter } from "next/router";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function Create() {
  const router = useRouter();
  const [university, setUniversity] = useState<string | undefined>();
  useEffect(() => {
    if (router.isReady) {
      setUniversity(router.query.university as string | undefined);
    }
  }, [router.isReady, router.query]);
  return (
    <>
      <Head>
        <title>Universities | Exactitude</title>
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
                <Link href={paths.dictionary.education.educationMain} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.education.educationMain}
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
                      List Universities
                    </Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            {university !== undefined && (
              <EducationCreateForm data={university} />
            )}
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
