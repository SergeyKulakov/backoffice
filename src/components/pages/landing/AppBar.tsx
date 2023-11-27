import React from "react";
import styled from "@emotion/styled";
import { spacing, SpacingProps } from "@mui/system";
import Link from "next/link";
import { paths } from "../../../paths";
import {
  AppBar,
  Button as MuiButton,
  ButtonProps,
  Container,
  Grid,
  Toolbar,
} from "@mui/material";

import Logo from "../../../vendor/logo.svg";

const Button = styled(MuiButton)<
  SpacingProps & ButtonProps & { target?: string }
>(spacing);

const Brand = styled.div`
  font-size: ${(props) => props.theme.typography.h5.fontSize};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
  font-family: ${(props) => props.theme.typography.fontFamily};
`;

const BrandIcon = styled(Logo)`
  margin-right: ${(props) => props.theme.spacing(2)};
  margin-top: -2px;
  color: ${(props) => props.theme.sidebar.header.brand.color};
  fill: ${(props) => props.theme.sidebar.header.brand.color};
  width: 32px;
  height: 32px;

  vertical-align: middle;
  display: inline;
`;

const AppBarComponent = () => (
  <React.Fragment>
    <AppBar position="relative" color="transparent" elevation={0}>
      <Toolbar>
        <Container>
          <Grid container alignItems="center">
            <Grid item>
              <Brand>
                <BrandIcon /> Exactitude
              </Brand>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Link href={paths.users.index}>
                <Button ml={2} color="primary" variant="contained">
                  Sign In
                </Button>
              </Link>
            </Grid>
          </Grid>
        </Container>
      </Toolbar>
    </AppBar>
  </React.Fragment>
);

export default AppBarComponent;
