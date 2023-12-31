import React from "react";
import type { ReactElement } from "react";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet-async";

import { Paper, Typography } from "@mui/material";

import AuthLayout from "../layouts/Auth";

import ForgetPasswordComponent from "../components/auth/ForgetPassword";

import Logo from "../vendor/logo.svg";

const Brand = styled(Logo)`
  fill: ${(props) => props.theme.palette.primary.main};
  width: 64px;
  height: 64px;
  margin-bottom: 32px;
`;

const Wrapper = styled(Paper)`
  padding: ${(props) => props.theme.spacing(6)};

  ${(props) => props.theme.breakpoints.up("md")} {
    padding: ${(props) => props.theme.spacing(10)};
  }
`;

function ResetPassword() {
  return (
    <React.Fragment>
      <Brand />
      <Wrapper>
        <Helmet title="Reset Password" />

        <Typography component="h1" variant="h4" align="center" gutterBottom>
          Forgot Password
        </Typography>
        <Typography component="h2" variant="body1" align="center">
          Enter your email to reset your password
        </Typography>

        <ForgetPasswordComponent />
      </Wrapper>
    </React.Fragment>
  );
}

ResetPassword.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default ResetPassword;
