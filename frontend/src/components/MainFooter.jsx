import React from "react";
import { Box, Container, Typography, Stack, Link } from "@mui/material";

function MainFooter() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#2A2A2A',
        color: '#F7F7F7',
        py: 1,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <Typography variant="body2" color="#CCCCCC">
            &copy; {new Date().getFullYear()} <strong>Pensasha Houses</strong>. All rights reserved.
          </Typography>

        </Stack>
      </Container>
    </Box>
  );
}

export default MainFooter;
