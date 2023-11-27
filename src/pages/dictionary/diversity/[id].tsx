import { ReactElement, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "../../../store";
import { getOneDiversity } from "../../../thunks/diversity";
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
import { DiversityEditForm } from "../../../sections/dictionaries/diversity/edit-form";
import Loader from "../../../components/Loader";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function SinglePageDiversity() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const diversityData = useSelector((state) => state.diversity.diversityItem);
  const isSuccess = useSelector((state) => state.diversity.isSuccess);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getOneDiversity(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>Diversity | Exactitude</title>
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
                <Link href={paths.dictionary.diversity.index} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.diversity.index}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">List Diversity</Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            {isSuccess && diversityData ? (
              <Card>
                <DiversityEditForm data={diversityData} />
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

SinglePageDiversity.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(
  SinglePageDiversity
);
