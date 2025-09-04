import React from "react";
import { Box, Card, CardContent, Typography, CardActions, Button } from "@mui/material";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import DescriptionIcon from "@mui/icons-material/Description";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DownloadIcon from "@mui/icons-material/Download";

function DocumentItem({ document }) {
  const getIcon = () => {
    return document.type === "PDF" ? (
      <PictureAsPdfIcon sx={{ fontSize: { xs: 36, md: 40 }, color: "#c59000" }} />
    ) : (
      <DescriptionIcon sx={{ fontSize: { xs: 36, md: 40 }, color: "#c59000" }} />
    );
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        boxShadow: 2,
        bgcolor: "#fff",
        p: { xs: 2, sm: 2.5 },
        "&:hover": { boxShadow: 4 },
        transition: "box-shadow 0.3s ease",
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "center" },
          gap: { xs: 2, sm: 2.5 },
          textAlign: { xs: "center", sm: "left" },
        }}
      >
        {getIcon()}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ fontSize: { xs: "1.1rem", md: "1.125rem" }, color: "#2a2a2a" }}
          >
            {document.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {document.date}
          </Typography>
        </Box>
      </CardContent>

      <CardActions
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: { xs: "center", sm: "flex-start" }, // centered on mobile
          alignItems: "center",
          gap: 1.5,
          mt: { xs: 1.5, sm: 0 },
        }}
      >
        <Button
          size="small"
          variant="outlined"
          startIcon={<VisibilityIcon />}
          sx={{
            color: "#c59000",
            borderColor: "#c59000",
            "&:hover": { backgroundColor: "#f8b50030", borderColor: "#c59000" },
            width: { xs: "80%", sm: "auto" }, // centered width on mobile
            transition: "all 0.3s ease",
          }}
        >
          View
        </Button>
        <Button
          size="small"
          variant="contained"
          startIcon={<DownloadIcon />}
          sx={{
            backgroundColor: "#f8b500",
            color: "#111",
            "&:hover": { backgroundColor: "#c59000" },
            width: { xs: "80%", sm: "auto" }, // centered width on mobile
            transition: "all 0.3s ease",
          }}
        >
          Download
        </Button>
      </CardActions>
    </Card>
  );
}

export default DocumentItem;
