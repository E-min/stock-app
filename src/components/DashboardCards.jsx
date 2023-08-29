import { Avatar, Paper, Typography, Box } from "@mui/material";

const DashboardCards = ({ name, content, icon }) => {
  return (
    <Paper sx={{ width: 300, p: 2, textAlign: "center" }}>
      <Typography variant="h5">{name}</Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ width: 70, height: 70, bgcolor: "crimson" }}>
          {icon}
        </Avatar>
        <Typography variant="h4" sx={{ width: 190 }}>
          {content}
        </Typography>
      </Box>
    </Paper>
  );
};

export default DashboardCards;
