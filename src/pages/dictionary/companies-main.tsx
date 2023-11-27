import React, { ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "../../layouts/Dashboard";
import PlusIcon from "@untitled-ui/icons-react/build/esm/Plus";
import {
  Box,
  Button,
  Card,
  Container,
  Stack,
  SvgIcon,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import TabPanel from "./tab-panel";
import CompaniesUnverified from "./companies-unverified";
import Companies from "./companies";
import withAccessControl from "../../layouts/accessControl";
import { ROLE } from "../../constants";
const styles = {
  tab: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};

function CompaniesMain() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Tabs value={value} onChange={handleChange} aria-label="tabs">
        <Tab label="Verified" id="tab-0" sx={styles.tab} />
        <Tab label="Unverified" id="tab-1" sx={styles.tab} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <Companies />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CompaniesUnverified />
      </TabPanel>
    </>
  );
}

CompaniesMain.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default withAccessControl([ROLE.ADMIN, ROLE.SUPERVISOR])(CompaniesMain);
