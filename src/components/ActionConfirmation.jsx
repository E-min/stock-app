import { Typography, Box, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ActionConfirmation = ({ handleClose, handleSubmit, loading, name }) => {
  return (
    <Box sx={{}}>
      <Typography>
        Are you sure? <strong>{name}</strong> will be deleted.
      </Typography>
      <Box sx={{ marginTop: "1rem" }}>
        <LoadingButton
          loading={loading}
          onClick={handleSubmit}
          variant="contained"
          color="error"
        >
          Yes
        </LoadingButton>
        <Button
          sx={{ marginLeft: "1rem" }}
          onClick={handleClose}
          variant="contained"
        >
          No
        </Button>
      </Box>
    </Box>
  );
};

export default ActionConfirmation;
