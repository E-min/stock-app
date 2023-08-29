import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";

const FirmsForm = ({ handleChange, handleSubmit, inputValues, loading }) => {
  return (
    <Box
      component={"form"}
      id="edit"
      onSubmit={handleSubmit}
      sx={{ textAlign: "center" }}
    >
      <TextField
        fullWidth
        id="name"
        label="Name"
        variant="outlined"
        onChange={handleChange}
        value={inputValues.name}
        type="text"
        margin="dense"
        required
      />
      <TextField
        fullWidth
        id="address"
        label="Adress"
        variant="outlined"
        onChange={handleChange}
        value={inputValues.address}
        type="address"
        margin="dense"
        multiline
        rows={3}
        required
      />
      <TextField
        fullWidth
        id="phone"
        label="Phone"
        variant="outlined"
        onChange={handleChange}
        value={inputValues.phone}
        type="tel"
        margin="dense"
        required
      />
      <TextField
        fullWidth
        id="image"
        label="Photo Url"
        variant="outlined"
        onChange={handleChange}
        value={inputValues.image}
        type="url"
        margin="dense"
        required
      />
      <LoadingButton
        loading={loading}
        sx={{ marginTop: "1rem", width: '100%' }}
        variant="contained"
        type="submit"
      >
        Submit
      </LoadingButton>
    </Box>
  );
};

export default FirmsForm;
