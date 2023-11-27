import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "../../../store";
import { getOneEducation } from "../../../thunks/education";
import DashboardLayout from "../../../layouts/Dashboard";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { EducationEditForm } from "../../../sections/dictionaries/education/edit-form";
import Loader from "../../../components/Loader";
import { paths } from "../../../paths";
import {
  Box,
  Card,
  Container,
  Link as MuiLink,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function SinglePageEducation() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const educationData = useSelector((state) => state.education.educationItem);
  const isSuccess = useSelector((state) => state.education.isSuccess);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getOneEducation(id));
    }
  }, [dispatch, id]);

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
                      Universities list
                    </Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            {isSuccess && educationData ? (
              <Card>
                <EducationEditForm data={educationData} />
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

SinglePageEducation.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(
  SinglePageEducation
);
