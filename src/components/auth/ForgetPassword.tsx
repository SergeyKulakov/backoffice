import React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Button,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";

import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../contexts/auth/amplify-context";
import { paths } from "../../paths";
import { useMounted } from "../../hooks/use-mounted";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

function ResetPassword() {
  const router = useRouter();
  const isMounted = useMounted();
  const { forgotPassword } = useAuth<AuthContextType>();

  return (
    <Formik
      initialValues={{
        email: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          forgotPassword(values.email);
          if (isMounted()) {
            const searchParams = new URLSearchParams({
              username: values.email,
            }).toString();
            const href = paths.resetPassword + `?${searchParams}`;
            router.push(href);
          }
        } catch (error: any) {
          const message = error.message || "Something went wrong";

          setStatus({ success: false });
          setErrors({ submit: message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          {errors.submit && (
            <Alert mt={2} mb={1} severity="warning">
              {errors.submit}
            </Alert>
          )}
          <TextField
            type="email"
            name="email"
            label="Email Address"
            value={values.email}
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            onBlur={handleBlur}
            onChange={handleChange}
            my={3}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Reset password
          </Button>
        </form>
      )}
    </Formik>
  );
}

export default ResetPassword;
