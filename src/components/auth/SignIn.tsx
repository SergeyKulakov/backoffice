import React, { useState } from "react";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";
import Link from "next/link";
import { paths } from "../../paths";
import { useRouter } from "next/router";

import {
  Alert as MuiAlert,
  Button,
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import type { AuthContextType } from "../../contexts/auth/amplify-context";
import { useAuth } from "../../hooks/useAuth";
import { useMounted } from "../../hooks/use-mounted";

const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

function SignIn() {
  const router = useRouter();
  const isMounted = useMounted();
  const { signIn, completeNewPassword } = useAuth<AuthContextType>();
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        newPassword: "",
        passwordConfirm: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Must be a valid email")
          .max(255)
          .required("Email is required"),
        password: Yup.string().max(255).required("Password is required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const user = await signIn(values.email, values.password);
          if (!user && isMounted()) {
            router.push("/profiles-sellside/new");
          }
          user ? setStep(2) : null;
          if (step === 2) {
            await completeNewPassword(user, values.newPassword);
            await signIn(values.email, values.newPassword);
            if (isMounted()) {
              router.push("/profiles-sellside/new");
            }
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
            <Alert mt={2} mb={3} severity="warning">
              {errors.submit}
            </Alert>
          )}
          {step === 1 ? (
            <>
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
                my={2}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={showPassword ? "text" : "password"}
                name="password"
                label="Password"
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                fullWidth
                helperText={touched.password && errors.password}
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
                InputLabelProps={{ shrink: true }}
              />
            </>
          ) : (
            <>
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={showPassword ? "text" : "password"}
                label="New password"
                name="newPassword"
                value={values.newPassword}
                error={Boolean(touched.newPassword && errors.newPassword)}
                fullWidth
                helperText={touched.newPassword && errors.newPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="password visibility"
                        onClick={handleClickConfirmPassword}
                      >
                        {showConfirmPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                type={showConfirmPassword ? "text" : "password"}
                label="New Password Confirmation"
                name="passwordConfirm"
                value={values.passwordConfirm}
                error={Boolean(
                  touched.passwordConfirm && errors.passwordConfirm
                )}
                fullWidth
                helperText={touched.passwordConfirm && errors.passwordConfirm}
                onBlur={handleBlur}
                onChange={handleChange}
                my={2}
              />
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Sign in
          </Button>
          <Link href={paths.forgotPassword}>
            <Button fullWidth color="primary">
              Forgot password
            </Button>
          </Link>
        </form>
      )}
    </Formik>
  );
}

export default SignIn;
