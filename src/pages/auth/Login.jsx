import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Favorite, Menu } from "@mui/icons-material";
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
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AuthLayout from "../../components/auth/AuthLayout";

const LoginSchema = Yup.object({
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPwd, setShowPwd] = React.useState(false);
  const initialValues = { email: "", password: "" };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <>
      <AppBar
        position="sticky"
        color="inherit"
        elevation={0}
        className="home__header"
      >
        <Toolbar>
          <Grid container alignItems="center" className="home__header-logo">
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
            // Decide role from registration saved in localStorage
            const stored = localStorage.getItem("auth:user");
            let role = "user";
            if (stored) {
              try {
                const parsed = JSON.parse(stored);
                if (parsed && parsed.role) role = parsed.role;
              } catch {}
            }
            actions.setSubmitting(false);
            navigate(role === "doctor" ? "/doctor" : "/user");
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
                  Login
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
      </AuthLayout>
      <Grid container id="contact" component="footer" className="home__footer">
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <Grid
                container
                direction="column"
                className="home__footer-section"
              >
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
              <Grid
                container
                direction="column"
                className="home__footer-section"
              >
                <Grid item>
                  <FormLabel
                    component="h4"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      mb: 2,
                      display: "block",
                    }}
                  >
                    Services
                  </FormLabel>
                </Grid>
                <Grid item>
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
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <Grid
                container
                direction="column"
                className="home__footer-section"
              >
                <Grid item>
                  <FormLabel
                    component="h4"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      mb: 2,
                      display: "block",
                    }}
                  >
                    Company
                  </FormLabel>
                </Grid>
                <Grid item>
                  <List>
                    {["About Us", "Our Team", "Careers", "Contact"].map(
                      (item) => (
                        <ListItem key={item} sx={{ py: 0.5 }}>
                          <FormLabel
                            component="span"
                            sx={{ color: "text.secondary" }}
                          >
                            {item}
                          </FormLabel>
                        </ListItem>
                      )
                    )}
                  </List>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={3}>
              <Grid
                container
                direction="column"
                className="home__footer-section"
              >
                <Grid item>
                  <FormLabel
                    component="h4"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      mb: 2,
                      display: "block",
                    }}
                  >
                    Contact
                  </FormLabel>
                </Grid>
                <Grid item>
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
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="center"
            className="home__footer-copyright"
          >
            <Grid item>
              <FormLabel component="p" sx={{ color: "text.secondary" }}>
                © 2024 HealthCare+. All rights reserved.
              </FormLabel>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default Login;
