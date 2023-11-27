import { ReactElement, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "../../../store";
import { getOneDegreeTypes } from "../../../thunks/degree";
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
import { DegreeEditForm } from "../../../sections/dictionaries/degree-edit-form";
import Loader from "../../../components/Loader";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function SinglePageDegree() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const degreeData = useSelector((state) => state.degree.degreeItem);
  const isSuccess = useSelector((state) => state.degree.isSuccess);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getOneDegreeTypes(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>Degree Types | Exactitude</title>
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
            {isSuccess && degreeData ? (
              <Card>
                <DegreeEditForm data={degreeData} />
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

SinglePageDegree.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(
  SinglePageDegree
);
