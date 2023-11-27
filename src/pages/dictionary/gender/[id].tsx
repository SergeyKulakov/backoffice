import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "../../../store";
import { getOneGender } from "../../../thunks/gender";
import DashboardLayout from "../../../layouts/Dashboard";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { GenderEditForm } from "../../../sections/dictionaries/gender/edit-form";
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

function SinglePageGender() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const genderData = useSelector((state) => state.gender.genderItem);
  const isSuccess = useSelector((state) => state.gender.isSuccess);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getOneGender(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>Gender | Exactitude</title>
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
                <Link href={paths.dictionary.gender.index} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.gender.index}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">Gender list</Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            {isSuccess && genderData ? (
              <Card>
                <GenderEditForm data={genderData} />
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

SinglePageGender.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(
  SinglePageGender
);
