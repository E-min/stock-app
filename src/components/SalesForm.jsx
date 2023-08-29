import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux/es/hooks/useSelector";
import useStockCall from "../hooks/useStockCall";
import { useEffect } from "react";

const SalesFrom = ({ handleChange, handleSubmit, inputValues }) => {
  const { getStock } = useStockCall();
  const { loading, products, brands } = useSelector(({ stock }) => stock);

  useEffect(() => {
    getStock("products");
    getStock("brands");
  }, []);
  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <FormControl fullWidth margin="dense">
        <InputLabel id="brand">Brand</InputLabel>
        <Select
          labelId="brand"
          id="brand_id"
          value={inputValues.brand_id}
          label="Brand"
          onChange={(e) => handleChange("brand_id", e.target.value)}
        >
          {brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel id="product">Product</InputLabel>
        <Select
          labelId="product"
          id="product_id"
          value={inputValues.product_id}
          label="Product"
          onChange={(e) => handleChange("product_id", e.target.value)}
        >
          {products.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        id="quantity"
        label="Quantity"
        variant="outlined"
        onChange={(e) => handleChange("quantity", +e.target.value)}
        value={inputValues.quantity}
        type="number"
        margin="dense"
        required
      />
      <TextField
        fullWidth
        id="price"
        label="Price"
        variant="outlined"
        onChange={(e) => handleChange("price", +e.target.value)}
        value={inputValues.price}
        type="number"
        margin="dense"
        required
      />
      <LoadingButton
        loading={loading}
        sx={{ marginTop: "1rem", width: "100%" }}
        variant="contained"
        type="submit"
      >
        Submit
      </LoadingButton>
    </Box>
  );
};
export default SalesFrom;
