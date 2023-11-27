import { ReactElement, useEffect } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "../../../store";
import { getOneStrategy } from "../../../thunks/suggestedStrategy";
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
import { EditForm } from "../../../sections/dictionaries/suggested-strategy/edit-form";
import Loader from "../../../components/Loader";
import withAccessControl from "../../../layouts/accessControl";
import { ROLE } from "../../../constants";

function SinglePage() {
  const dispatch = useDispatch();

  const router = useRouter();
  const { id } = router.query;

  const data = useSelector((state) => state.strategy.dataItem);
  const isSuccess = useSelector((state) => state.strategy.isSuccess);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getOneStrategy(id));
    }
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>Suggested strategy | Exactitude</title>
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
                <Link href={paths.dictionary.suggestedStrategy.index} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.dictionary.suggestedStrategy.index}
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
                      Suggested strategy list
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
