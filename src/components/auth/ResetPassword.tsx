import React, { useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Alert as MuiAlert,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField as MuiTextField,
} from "@mui/material";
import { spacing } from "@mui/system";
import { useAuth } from "../../hooks/useAuth";
import { AuthContextType } from "../../contexts/auth/amplify-context";
import { MuiOtpInput } from "mui-one-time-password-input";
import { paths } from "../../paths";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const Alert = styled(MuiAlert)(spacing);

const TextField = styled(MuiTextField)<{ my?: number }>(spacing);

const useParams = (): { username?: string } => {
  const router = useRouter();
  const searchParams = new URLSearchParams(router.asPath.split(/\?/)[1]);
  const username = searchParams.get("username") || undefined;

  return {
    username,
  };
};

function ResetPassword() {
  const router = useRouter();
  const { username } = useParams();
  const { forgotPasswordSubmit } = useAuth<AuthContextType>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <Formik
      initialValues={{
        code: "",
        email: username || "",
        password: "",
        passwordConfirm: "",
        submit: false,
      }}
      validationSchema={Yup.object().shape({
        code: Yup.string().min(6).max(6).required("Code is required"),
        password: Yup.string()
          .min(8, "Must be at least 8 characters")
          .max(255)
          .matches(/(?=.*\d)/, "Password must contain at least one number")
          .matches(
            /(?=.*[a-z])/,
            "Password must contain at least one lowercase letter"
          )
          .matches(
            /(?=.*[A-Z])/,
            "Password must contain at least one uppercase letter"
          )
          .required("Required"),
        passwordConfirm: Yup.string()
          .oneOf([Yup.ref("password")], "Passwords must match")
          .required("Required"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await forgotPasswordSubmit(
            values.email,
            values.code,
            values.password
          );
          router.push(paths.index);
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
        setFieldValue,
        setFieldTouched,
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
          <FormControl error={!!(touched.code && errors.code)}>
            <FormLabel
              sx={{
                display: "block",
                mb: 2,
              }}
            >
              Verification code
            </FormLabel>
            <MuiOtpInput
              length={6}
              onBlur={() => handleBlur("code")}
              onChange={(value) => setFieldValue("code", value)}
              onFocus={() => setFieldTouched("code")}
              sx={{
                "& .MuiFilledInput-input": {
                  p: "14px",
                },
              }}
              value={values.code}
            />
            {!!(touched.code && errors.code) && (
              <FormHelperText>{errors.code}</FormHelperText>
            )}
          </FormControl>
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
            my={3}
          />
          <TextField
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            type={showConfirmPassword ? "text" : "password"}
            name="passwordConfirm"
            label="Password Confirmation"
            value={values.passwordConfirm}
            error={Boolean(touched.passwordConfirm && errors.passwordConfirm)}
            fullWidth
            helperText={touched.passwordConfirm && errors.passwordConfirm}
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
