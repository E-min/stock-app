import { useSelector } from "react-redux";
import ProductsFrom from "../components/ProductsForm";
import TableBasedPage from "../components/TableBasedPage";

const initialState = {
  name: "",
  category_id: "",
  brand_id: "",
};

const Products = () => {
  const { products } = useSelector(({ stock }) => stock);
  const columns = [
    {
      field: "id",
      headerName: "#",
      align: "center",
      headerAlign: "center",
      width: 80,
      filterable: false,
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 110,
      flex: 2,
    },
    {
      field: "category",
      headerName: "Catagory",
      minWidth: 130,
      flex: 2,
    },
    {
      field: "brand",
      headerName: "Brand",
      minWidth: 110,
      flex: 2,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      align: "center",
      headerAlign: "center",
      minWidth: 120,
      flex: 2,
    },
  ];
  return (
    <TableBasedPage
      stockData={products}
      columns={columns}
      stockType={"products"}
      initialState={initialState}
      modalForm={ProductsFrom}
    />
  );
};

export default Products;
