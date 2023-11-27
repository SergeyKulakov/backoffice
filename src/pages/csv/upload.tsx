import React, { ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "../../layouts/Dashboard";
import { CsvListTable } from "../../sections/csv/csv-list-table";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { paths } from "../../paths";
import withAccessControl from "../../layouts/accessControl";
import { ROLE } from "../../constants";

const mockDataCsv = [
  {
    id: 0,
    title: "File 1",
    timestamp: "2023/02/31 16:45",
    researcher: "Robert Johnes",
    type: "Sellside",
  },
  {
    id: 1,
    title: "File 2",
    timestamp: "2023/02/31 16:45",
    researcher: "Jane Ostin",
    type: "Buyside",
  },
  {
    id: 2,
    title: "File 3",
    timestamp: "2023/02/31 16:45",
    researcher: "William White",
    type: "Sellside",
  },
];

function Upload() {
  return (
    <>
      <Helmet title="Upload CSV" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h3" gutterBottom display="inline">
                  Upload CSV
                </Typography>
                <Stack alignItems="center" direction="row" spacing={1} />
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Link href={paths.csv.create}>
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    New CSV
                  </Button>
                </Link>
              </Stack>
            </Stack>
            <Card>
              <CsvListTable files={mockDataCsv} />
            </Card>
          </Stack>
        </Container>
      </Box>
    </>
  );
}

Upload.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(Upload);
