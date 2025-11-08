import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "Yup";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Alert,
  Box,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]|;:"<>,.?/]).{8,}$/;

const RegisterSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Emails must match")
    .required("Confirm your email"),
  password: Yup.string()
    .matches(passwordRules, "Min 8 chars with upper, lower, number, special")
    .required("Password is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const Register = () => {
  const initialValues = {
    email: "",
    confirmEmail: "",
    password: "",
    terms: false,
  };

  return (
    <AuthLayout
      title="Create Account"
      subtitle={
        <>
          Already a user?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Login
          </Link>
        </>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={RegisterSchema}
        onSubmit={(values, actions) => {
          // TODO: integrate API
          console.log("register:", values);
          actions.setStatus({
            ok: true,
            msg: "Registered successfully (demo)",
          });
          actions.setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          status,
        }) => (
          <Form noValidate>
            {status?.ok && (
              <Alert sx={{ mb: 2 }} severity="success">
                {status.msg}
              </Alert>
            )}

            <TextField
              fullWidth
              margin="normal"
              label="Email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Confirm Email"
              name="confirmEmail"
              value={values.confirmEmail}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmEmail && Boolean(errors.confirmEmail)}
              helperText={touched.confirmEmail && errors.confirmEmail}
            />

            <TextField
              fullWidth
              margin="normal"
              label="Create Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="terms"
                  checked={values.terms}
                  onChange={handleChange}
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{" "}
                  <Link
                    href="#"
                    underline="hover"
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >
                    Terms & Conditions
                  </Link>
                </Typography>
              }
            />
            {touched.terms && errors.terms && (
              <Typography
                variant="caption"
                color="error"
                sx={{ display: "block", mt: -1, mb: 1 }}
              >
                {errors.terms}
              </Typography>
            )}

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
              >
                Register
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Register;
