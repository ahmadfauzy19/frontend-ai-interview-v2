import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        px: 3,
        borderTop: "1px solid #e0e0e0",
        textAlign: "center",
        backgroundColor: "#fafafa",
        padding: "40px"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} AI Interview Platform • Built by Mini Padepokan 79
      </Typography>
    </Box>
  );
};

export default Footer;