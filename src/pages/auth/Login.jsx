import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "Yup";
import {
  TextField,
  Button,
  Typography,
  Link,
  Box,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";

const LoginSchema = Yup.object({
  role: Yup.string()
    .oneOf(["doctor", "user"], "Select a role")
    .required("Role is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const initialValues = { role: "user", email: "", password: "" };

  return (
    <AuthLayout
      title="Login"
      subtitle={
        <>
          New here?{" "}
          <Link
            component={RouterLink}
            to="/register"
            underline="hover"
            sx={{ fontWeight: 600, color: "primary.main" }}
          >
            Create an account
          </Link>
        </>
      }
    >
      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={(values, actions) => {
          // TODO: integrate API
          console.log("login:", values);
          actions.setSubmitting(false);
          // Role-based navigation (demo)
          navigate(values.role === "doctor" ? "/doctor" : "/user");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => (
          <Form noValidate>
            <FormControl sx={{ mt: 1 }}>
              <FormLabel>User Type</FormLabel>
              <RadioGroup
                row
                name="role"
                value={values.role}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="user"
                  control={<Radio color="primary" />}
                  label="User"
                />
                <FormControlLabel
                  value="doctor"
                  control={<Radio color="primary" />}
                  label="Doctor"
                />
              </RadioGroup>
            </FormControl>
            {touched.role && errors.role && (
              <Typography variant="caption" color="error">
                {errors.role}
              </Typography>
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
              label="Password"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: 1,
              }}
            >
              <Box />
              <Link
                component={RouterLink}
                to="/forgot"
                underline="hover"
                sx={{ fontWeight: 600, color: "primary.main" }}
              >
                Forgot password?
              </Link>
            </Box>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={isSubmitting}
              >
                Login
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default Login;
