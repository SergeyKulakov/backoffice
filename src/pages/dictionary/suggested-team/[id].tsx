import { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { useDispatch, useSelector } from "../../../store";
import { getOneSuggestedTeam } from "../../../thunks/suggested-team";
import DashboardLayout from "../../../layouts/Dashboard";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { EditForm } from "../../../sections/dictionaries/suggested-team/edit-form";
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

function SinglePage() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const data = useSelector((state) => state.suggestedTeam.suggestedTeamItem);
  const isSuccess = useSelector((state) => state.suggestedTeam.isSuccess);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getOneSuggestedTeam(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>Suggested team | Exactitude</title>
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
                <Link href={paths.dictionary.suggestedTeam.index} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.suggestedTeam.index}
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
                      Suggested team list
                    </Typography>
                  </MuiLink>
                </Link>
              </div>
            </Stack>
            {isSuccess && data ? (
              <Card>
                <EditForm data={data} />
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

SinglePage.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(SinglePage);
