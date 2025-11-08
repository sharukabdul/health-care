import React from "react";
import { Container, Box, Card, CardContent, Typography } from "@mui/material";

const AuthLayout = ({ title, subtitle, children }) => (
  <Container maxWidth="sm" sx={{ py: 6 }}>
    <Box sx={{ textAlign: "center", mb: 3 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, color: "primary.main" }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
    <Card>
      <CardContent>{children}</CardContent>
    </Card>
  </Container>
);

export default AuthLayout;
