import React, { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Collapse,
  Link as MuiLink,
  Stack,
  SvgIcon,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import Image01Icon from "@untitled-ui/icons-react/build/esm/Image01";
import ArrowLeftIcon from "@untitled-ui/icons-react/build/esm/ArrowLeft";
import { useDispatch, useSelector } from "../../store";
import DashboardLayout from "../../layouts/Dashboard";
import withAccessControl from "../../layouts/accessControl";
import { getSearchProfile, updateActiveProfile } from "../../thunks/userList";
import { ROLE } from "../../constants";
import { paths } from "../../paths";

const styles = {
  profileImage: {
    alignItems: "center",
    backgroundColor: "#eaecec",
    borderRadius: 1,
    display: "flex",
    height: 200,
    mb: "15px",
    justifyContent: "center",
    width: 200,
  },
};

function SinglePageProfile() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [isSubtitleBioOpen, setIsSubtitleBioOpen] = useState(false);

  useEffect(() => {
    dispatch(getSearchProfile(""));
  }, []);

  const profileData = useSelector((state) => state.users.searchInfo);

  const selectedProfiles =
    profileData?.data?.filter(
      (profile: { profileId: string | string[] | undefined }) =>
        profile.profileId === id
    ) || [];

  useEffect(() => {
    if (selectedProfiles[0]?.subTitle || selectedProfiles[0]?.summary) {
      setIsSubtitleBioOpen(true);
    }
  }, []);

  const toggleSubtitleBio = () => {
    setIsSubtitleBioOpen(!isSubtitleBioOpen);
  };

  const initialValues: any = {
    sub_title: selectedProfiles[0]?.subTitle,
    summary: selectedProfiles[0]?.summary,
    id: selectedProfiles[0]?._id,
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({}),
    onSubmit: async (values, helpers): Promise<void> => {
      try {
        await dispatch(updateActiveProfile(values)).unwrap();
        toast.success("Profile success updated");
        router.push(paths.activeProfiles.index);
      } catch (err: any) {
        toast.error(err.message[0]);
      }
    },
  });

  return (
    <>
      <Head>
        <title>Profile Card | Exactitude</title>
      </Head>
      <Box component="main" sx={{ flexGrow: 1, py: 2 }}>
        {selectedProfiles.length > 0 ? (
          <form onSubmit={formik.handleSubmit}>
            <Card>
              <Stack spacing={4} padding={4}>
                <Link href={paths.activeProfiles.index} passHref>
                  <MuiLink
                    color="text.primary"
                    href={paths.activeProfiles.index}
                    sx={{
                      alignItems: "center",
                      display: "inline-flex",
                    }}
                    underline="hover"
                  >
                    <SvgIcon sx={{ mr: 1 }}>
                      <ArrowLeftIcon />
                    </SvgIcon>
                    <Typography variant="subtitle2">Active profiles</Typography>
                  </MuiLink>
                </Link>
              </Stack>
              <CardContent sx={{ pt: 0 }}>
                <Grid container spacing={3} rowGap={3}>
                  <Grid
                    xs={12}
                    my={5}
                    ml="50px"
                    display="flex"
                    justifyContent="space-between"
                  >
                    <Box>
                      {selectedProfiles[0]?.profilePicture ? (
                        <Box
                          component="img"
                          sx={{
                            width: "200px",
                            mb: "15px",
                          }}
                          alt="Profile image."
                          src={selectedProfiles[0]?.profilePicture}
                        />
                      ) : (
                        <Box sx={styles.profileImage}>
                          <SvgIcon>
                            <Image01Icon />
                          </SvgIcon>
                        </Box>
                      )}
                      <Box>
                        <Button
                          href={`https://www.linkedin.com/in/${selectedProfiles[0]?.profileId}`}
                          sx={{ width: 200, height: 35 }}
                          variant="contained"
                          target="_blank"
                        >
                          View LinkedIn profile
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid xs={12} display="flex" alignItems="center" mr={13}>
                    <TextField
                      fullWidth
                      label="First Name"
                      InputProps={{ readOnly: true }}
                      onChange={formik.handleChange}
                      value={selectedProfiles[0].firstName}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid xs={12} display="flex" mr={13} alignItems="center">
                    <TextField
                      fullWidth
                      InputProps={{ readOnly: true }}
                      label="Last Name"
                      onChange={formik.handleChange}
                      value={selectedProfiles[0].lastName}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>
                  <Grid xs={12} display="flex" mr={13} flexDirection="column">
                    <Typography
                      variant="h3"
                      mt={5}
                      mb={5}
                      onClick={toggleSubtitleBio}
                      sx={{ cursor: "pointer" }}
                    >
                      {isSubtitleBioOpen
                        ? "- Subtitle and full bio"
                        : "+ Subtitle and full bio"}
                    </Typography>
                    <Collapse
                      in={isSubtitleBioOpen}
                      timeout="auto"
                      unmountOnExit
                    >
                      <TextField
                        fullWidth
                        label="Subtitle"
                        name="sub_title"
                        InputLabelProps={{ shrink: true }}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        value={formik.values.sub_title}
                        sx={{ mb: "20px" }}
                      />
                      <TextField
                        rows={5}
                        multiline
                        name="summary"
                        style={{ width: "100%" }}
                        placeholder="Write your biography here..."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.summary}
                      />
                    </Collapse>
                  </Grid>
                </Grid>
              </CardContent>
              <Stack
                direction={{
                  xs: "column",
                  sm: "row",
                }}
                flexWrap="wrap"
                spacing={3}
                sx={{ p: 3, justifyContent: "space-between" }}
              >
                <Button
                  disabled={formik.isSubmitting}
                  type="submit"
                  variant="contained"
                >
                  Update
                </Button>
              </Stack>
            </Card>
          </form>
        ) : (
          <Stack alignItems="center" justifyContent="center" height="100%">
            <CircularProgress />
          </Stack>
        )}
      </Box>
    </>
  );
}

SinglePageProfile.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(
  SinglePageProfile
);
