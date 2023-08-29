import TableBasedPage from "../components/TableBasedPage";
import { useSelector } from "react-redux";
import PurchasesForm from "../components/PurchasesForm";

const initialState = {
  firm_id: "",
  brand_id: "",
  product_id: "",
  quantity: "",
  price: "",
};

const Purchases = () => {
  const { purchases } = useSelector(({ stock }) => stock);
  
  const columns = [
    {
      field: "id",
      headerName: "#",
      align: "center",
      headerAlign: "center",
      width: 50,
      filterable: false,
    },
    {
      field: "product",
      headerName: "Product",
      minWidth: 100,
      flex: 2,
    },
    {
      field: "user",
      headerName: "User",
      minWidth: 70,
      flex: 2,
    },
    {
      field: "firm",
      headerName: "Firm",
      minWidth: 70,
      flex: 2,
    },
    {
      field: "brand",
      headerName: "Brand",
      minWidth: 70,
      flex: 2,
    },
    {
      field: "category",
      headerName: "Category",
      minWidth: 80,
      flex: 2,
      renderCell: (params) => params.row.category[0].name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      minWidth: 70,
      flex: 2,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 60,
      flex: 2,
    },
    {
      field: "price_total",
      headerName: "Total price",
      type: "number",
      minWidth: 90,
      flex: 2,
    },
    {
      field: "createds",
      headerName: "Created",
      minWidth: 100,
      flex: 2,
    },
  ];

  return (
    <TableBasedPage
      stockData={purchases}
      columns={columns}
      stockType={"purchases"}
      initialState={initialState}
      modalForm={PurchasesForm}
    />
  );
};

export default Purchases;
