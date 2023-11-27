import React, { ReactElement, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import DashboardLayout from "../../../layouts/Dashboard";
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
import DegreeTypesUnverified from "../degree-types-unverified";
import DegreeTypes from "../degree-types";
import TabPanel from "../tab-panel";
import LanguageUnverified from "./language-unverified";
import Languages from ".";
const styles = {
  tab: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
};
function DegreeTypesMain() {
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
        <Languages />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LanguageUnverified />
      </TabPanel>
    </>
  );
}

DegreeTypesMain.getLayout = function getLayout(page: ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DegreeTypesMain;
