import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Box, TextField } from "@mui/material";
import Select from "@mui/material/Select";
import { LoadingButton } from "@mui/lab";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import useStockCall from "../hooks/useStockCall";

const ProductsFrom = ({ handleChange, handleSubmit, inputValues }) => {
  const {getStock} = useStockCall()
  const {loading, brands, categories} = useSelector(({stock}) => stock)

  useEffect(() => {
    getStock('brands')
    getStock('categories')
  },[])

  return (
    <Box component={'form'} onSubmit={handleSubmit}>
      <FormControl fullWidth margin="dense">
        <InputLabel id="brand">Brand</InputLabel>
        <Select
          labelId="brand"
          id="brand_id"
          value={inputValues.brand_id}
          label="Brand"
          onChange={(e) => handleChange('brand_id', e.target.value)}
        >
          {brands.map((brand) => (
            <MenuItem key={brand.id} value={brand.id}>
              {brand.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth margin="dense">
        <InputLabel id="category">Category</InputLabel>
        <Select
          labelId="category"
          id="category_id"
          value={inputValues.category_id}
          label="Category"
          onChange={(e) => handleChange('category_id', e.target.value)}
        >
          {categories.map((category) => (
            <MenuItem key={category.id} value={category.id}>
              {category.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        fullWidth
        id="name"
        label="Product Name"
        variant="outlined"
        onChange={(e)=> handleChange('name', e.target.value)}
        value={inputValues.name}
        type="text"
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
export default ProductsFrom;
