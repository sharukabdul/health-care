import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "Yup";
import { TextField, Button, Alert, Box, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";

const ForgotSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
});

const ForgotPassword = () => {
  const initialValues = { email: "" };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle={
        <>
          Remembered it?{" "}
          <Link
            component={RouterLink}
            to="/login"
            underline="hover"
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Back to login
          </Link>
        </>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={ForgotSchema}
        onSubmit={(values, actions) => {
          // TODO: integrate API
          console.log("forgot:", values);
          actions.setStatus({
            ok: true,
            msg: "Reset link sent if the email exists (demo)",
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

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
              >
                Send Reset Link
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgotPassword;
