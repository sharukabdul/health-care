import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Link,
  Alert,
  Box,
  RadioGroup,
  Radio,
  FormControl,
  FormLabel,
  InputAdornment,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthLayout from "../../components/auth/AuthLayout";

const assessPassword = (pwd) => {
  const hasUpper = /[A-Z]/.test(pwd || "");
  const hasLower = /[a-z]/.test(pwd || "");
  const hasNumber = /\d/.test(pwd || "");
  const hasSpecial = /[^A-Za-z0-9]/.test(pwd || "");
  const lengthOk = (pwd || "").length >= 10;
  const metCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
    Boolean
  ).length;
  return { hasUpper, hasLower, hasNumber, hasSpecial, lengthOk, metCount };
};

const strongPasswordTest = (value) => {
  const { hasUpper, hasLower, hasNumber, hasSpecial, lengthOk } =
    assessPassword(value);
  const metCount = [hasUpper, hasLower, hasNumber, hasSpecial].filter(
    Boolean
  ).length;
  return Boolean(lengthOk && metCount >= 3);
};

const RegisterSchema = Yup.object({
  role: Yup.string()
    .oneOf(["doctor", "user"], "Select a role")
    .required("Role is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  confirmEmail: Yup.string()
    .oneOf([Yup.ref("email"), null], "Emails must match")
    .required("Confirm your email"),
  password: Yup.string()
    .test(
      "strong-password",
      "Password must be ≥10 chars and include 3 of: uppercase, lowercase, number, special",
      strongPasswordTest
    )
    .required("Password is required"),
  terms: Yup.boolean().oneOf([true], "You must accept the terms"),
});

const Register = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = React.useState(false);
  const initialValues = {
    role: "user",
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
          const payload = {
            id: `${values.role}:${values.email}`,
            role: values.role,
            email: values.email,
            createdAt: new Date().toISOString(),
          };
          localStorage.setItem("auth:user", JSON.stringify(payload));
          actions.setStatus({ ok: true, msg: "Registered successfully" });
          actions.setSubmitting(false);
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
          status,
        }) => {
          const pw = assessPassword(values.password);
          const colorize = (ok) => ({ color: ok ? "#2e7d32" : "#d32f2f" }); // green/red

          return (
            <Form noValidate>
              {status?.ok && (
                <Alert sx={{ mb: 2 }} severity="success">
                  {status.msg}
                </Alert>
              )}

              {/* Role selection (on Register only) */}
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
                type={showPwd ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPwd((s) => !s)}
                        edge="end"
                        aria-label="toggle password visibility"
                      >
                        {showPwd ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              {/* Live password criteria */}
              <Box sx={{ mt: 1 }}>
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: "primary.main" }}
                >
                  Password requirements
                </Typography>
                <List dense sx={{ mt: 0.5 }}>
                  <ListItem sx={colorize(pw.lengthOk)}>
                    - Minimum 10 characters
                  </ListItem>
                  <ListItem sx={colorize(pw.hasUpper)}>
                    - Contains an uppercase letter
                  </ListItem>
                  <ListItem sx={colorize(pw.hasLower)}>
                    - Contains a lowercase letter
                  </ListItem>
                  <ListItem sx={colorize(pw.hasNumber)}>
                    - Contains a number
                  </ListItem>
                  <ListItem sx={colorize(pw.hasSpecial)}>
                    - Contains a special character
                  </ListItem>
                  <ListItem sx={colorize(pw.lengthOk && pw.metCount >= 3)}>
                    - Meets at least 3 of the 4 categories above
                  </ListItem>
                </List>
              </Box>

              <FormControlLabel
                sx={{ mt: 1 }}
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
          );
        }}
      </Formik>
    </AuthLayout>
  );
};

export default Register;
