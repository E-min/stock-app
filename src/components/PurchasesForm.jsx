import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import { LoadingButton } from "@mui/lab";
import useStockCall from "../hooks/useStockCall";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const PurchasesFrom = ({ handleChange, handleSubmit, inputValues }) => {
  const { getStock } = useStockCall();
  const { loading, firms, products, brands } = useSelector(
    ({ stock }) => stock
  );

  useEffect(() => {
    getStock("brands");
    getStock("products");
    getStock("firms");
  }, []);

  return (
    <Box component={"form"} onSubmit={handleSubmit}>
      <FormControl fullWidth margin="dense">
        <InputLabel id="brand">Firm</InputLabel>
        <Select
          labelId="firm"
          id="firm_id"
          value={inputValues.firm_id}
          label="Firm"
          onChange={(e) => handleChange("firm_id", e.target.value)}
        >
          {firms.length === 0 && <MenuItem disabled>No Item</MenuItem>}
          {firms?.map((firm) => (
            <MenuItem key={firm.id} value={firm.id}>
              {firm.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel id="brand">Brand</InputLabel>
        <Select
          labelId="brand"
          id="brand_id"
          value={inputValues.brand_id}
          label="Brand"
          onChange={(e) => handleChange("brand_id", e.target.value)}
        >
          {brands.length === 0 && <MenuItem disabled>No Item</MenuItem>}
          {brands?.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel id="category">Product</InputLabel>
        <Select
          labelId="product"
          id="product_id"
          value={inputValues.product_id}
          label="Product"
          onChange={(e) => handleChange("product_id", e.target.value)}
        >
          {products.length === 0 && <MenuItem disabled>No Item</MenuItem>}
          {products?.map((product) => (
            <MenuItem key={product.id} value={product.id}>
              {product.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        id="price"
        label="Product Price"
        variant="outlined"
        onChange={(e) => handleChange("price", +e.target.value)}
        value={inputValues.price}
        type="number"
        margin="dense"
        required
      />
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
export default PurchasesFrom;
