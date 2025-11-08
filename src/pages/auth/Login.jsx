import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Favorite, Menu, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  TextField,
  Button,
  Link,
  Box,
  InputAdornment,
  IconButton,
  AppBar,
  Toolbar,
  Grid,
  useMediaQuery,
  List,
  ListItem,
  Container,
  FormLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/auth/AuthLayout";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const initialValues = { email: "", password: "" };

  // ✅ Auto-redirect if already logged in
  useEffect(() => {
    const user = localStorage.getItem("auth:user");
    if (user) {
      navigate("/user/dashboard", { replace: true });
    }
  }, [navigate]);

  return (
    <>
      {/* ---------- Header ---------- */}
      <AppBar position="sticky" color="inherit" elevation={0}>
        <Toolbar>
          <Grid container alignItems="center">
            <Grid item>
              <Favorite sx={{ fontSize: 32, color: "primary.contrastText" }} />
            </Grid>
            <Grid item>
              <FormLabel
                component="div"
                sx={{
                  fontSize: "1.25rem",
                  fontWeight: "bold",
                  color: "primary.contrastText",
                  cursor: "pointer",
                  "&:hover": { opacity: 0.8 },
                }}
                onClick={() => navigate("/")}
              >
                HealthCare+
              </FormLabel>
            </Grid>
          </Grid>

          {isMobile && (
            <IconButton
              edge="end"
              color="inherit"
              onClick={() => setMobileMenuOpen(true)}
              sx={{ ml: "auto" }}
            >
              <Menu />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* ---------- Login Form ---------- */}
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
            // ✅ Simulate login API and save user info to localStorage
            const userData = {
              email: values.email,
              role: "user", // change to 'doctor' if login is for doctor
              name: values.email.split("@")[0],
              loggedInAt: new Date().toISOString(),
            };

            // Store user details in localStorage
            localStorage.setItem("auth:user", JSON.stringify(userData));

            // Redirect to dashboard
            navigate("/user/dashboard", { replace: true });

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
          }) => (
            <Form noValidate>
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
                  {isSubmitting ? "Signing in..." : "Login"}
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </AuthLayout>

      {/* ---------- Footer ---------- */}
      <Grid container component="footer" className="home__footer">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Grid container direction="column">
                <Grid
                  item
                  container
                  alignItems="center"
                  spacing={1}
                  sx={{ mb: 2 }}
                >
                  <Grid item>
                    <Favorite color="primary" />
                  </Grid>
                  <Grid item>
                    <FormLabel
                      component="span"
                      sx={{
                        fontWeight: "bold",
                        fontSize: "1.25rem",
                        color: "text.primary",
                      }}
                    >
                      HealthCare+
                    </FormLabel>
                  </Grid>
                </Grid>
                <Grid item>
                  <FormLabel component="p" sx={{ color: "text.secondary" }}>
                    Providing quality healthcare services with compassion and
                    excellence.
                  </FormLabel>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormLabel
                component="h4"
                sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}
              >
                Services
              </FormLabel>
              <List>
                {[
                  "Primary Care",
                  "Specialist Consultations",
                  "Emergency Services",
                  "Preventive Care",
                ].map((item) => (
                  <ListItem key={item} sx={{ py: 0.5 }}>
                    <FormLabel
                      component="span"
                      sx={{ color: "text.secondary" }}
                    >
                      {item}
                    </FormLabel>
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormLabel
                component="h4"
                sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}
              >
                Company
              </FormLabel>
              <List>
                {["About Us", "Our Team", "Careers", "Contact"].map((item) => (
                  <ListItem key={item} sx={{ py: 0.5 }}>
                    <FormLabel
                      component="span"
                      sx={{ color: "text.secondary" }}
                    >
                      {item}
                    </FormLabel>
                  </ListItem>
                ))}
              </List>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormLabel
                component="h4"
                sx={{ fontWeight: 600, mb: 2, color: "text.primary" }}
              >
                Contact
              </FormLabel>
              <List>
                {[
                  "123 Healthcare Ave",
                  "Medical City, MC 12345",
                  "Phone: (555) 123-4567",
                  "Email: info@healthcareplus.com",
                ].map((item) => (
                  <ListItem key={item} sx={{ py: 0.5 }}>
                    <FormLabel
                      component="span"
                      sx={{ color: "text.secondary" }}
                    >
                      {item}
                    </FormLabel>
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>

          <Grid container justifyContent="center" sx={{ mt: 3 }}>
            <FormLabel component="p" sx={{ color: "text.secondary" }}>
              © {new Date().getFullYear()} HealthCare+. All rights reserved.
            </FormLabel>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default Login;
