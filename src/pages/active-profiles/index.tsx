import { ReactElement, useEffect, useState, ChangeEvent } from "react";

import {
  Box,
  Container,
  InputAdornment,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "react-feather";
import CircularProgress from "@mui/material/CircularProgress";
import DashboardLayout from "../../layouts/Dashboard";
import { useDispatch, useSelector } from "../../store";

import { getSearchProfile } from "../../thunks/userList";
import { Helmet } from "react-helmet-async";
import withAccessControl from "../../layouts/accessControl";
import { ROLE } from "../../constants";
import { useDebounce } from "../../hooks/useDebounce";
import PeopleList from "../../sections/people/people-list";

function Users() {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");

  const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (value.length > 1) {
      debouncedSearch(newValue);
    }
  };

  const debouncedSearch = useDebounce((searchValue: string) => {
    dispatch(getSearchProfile(searchValue));
  }, 400);

  const profileData = useSelector((state) => state.users.searchInfo);
  const isSuccessLoad = useSelector((state) => state.users.isSuccess);

  useEffect(() => {
    dispatch(getSearchProfile(""));
  }, []);

  return (
    <>
      <Helmet title="Users" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <Stack spacing={1}>
                <Typography variant="h3" gutterBottom display="inline">
                  Search Profile
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1} />
              </Stack>
              <Stack alignItems="center" direction="row" spacing={2}>
                <TextField
                  label="Search..."
                  onChange={handleSearch}
                  value={value}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>
            </Stack>
            <Grid xs={12} height="100%">
              {isSuccessLoad && profileData ? (
                <PeopleList people={profileData.data} />
              ) : (
                <Stack
                  alignItems="center"
                  justifyContent="center"
                  height="100%"
                >
                  <CircularProgress />
                </Stack>
              )}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

Users.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(Users);
