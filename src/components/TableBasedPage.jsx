import useStockCall from "../hooks/useStockCall";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { IconButton, Paper } from "@mui/material";
import { useState } from "react";
import { useRef } from "react";
import CommonModal from "../components/CommonModal";
import { Delete } from "@mui/icons-material";
import ActionConfirmation from "../components/ActionConfirmation";
import { DataGrid } from "@mui/x-data-grid";

const TableBasedPage = ({
  stockData,
  stockType,
  columns,
  initialState,
  modalForm: CustomModalForm,
}) => {
  const { getStock, manageStocks } = useStockCall();
  const { loading } = useSelector(({ stock }) => stock);
  const [openModal, setOpenModel] = useState(false);
  const actionType = useRef();
  const [selectedRows, setSelectedRows] = useState([]);
  const [newInputData, setNewInputData] = useState(initialState);

  const handleSelectionChange = (selection) => {
    let filteredItems = stockData.filter((item) => selection.includes(item.id));
    setSelectedRows(filteredItems);
  };

  useEffect(() => {
    getStock(stockType);
  }, []);

  const handleClose = () => {
    setOpenModel(false);
  };
  const handleOpen = (firmInfos, type) => {
    if (type === "post") {
      getStock("brands");
      setNewInputData(initialState);
    } else {
      setNewInputData(firmInfos);
    }
    actionType.current = type;
    setOpenModel(true);
  };

  const handleChange = (type, id) => {
    setNewInputData({ ...newInputData, [type]: id });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (actionType.current === "delete") {
      manageStocks(selectedRows, actionType.current, stockType);
    } else {
      manageStocks(newInputData, actionType.current, stockType);
    }
    handleClose();
  };

  return (
    <div style={{ height: "calc(100vh - 150px)", width: "100%" }}>
      <CommonModal openModal={openModal} handleClose={handleClose}>
        {actionType.current === "delete" ? (
          <ActionConfirmation
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            loading={loading}
            name={selectedRows.map((row) => row.id).join(", ")}
          />
        ) : (
          <CustomModalForm 
          handleChange={handleChange}
          inputValues={newInputData}
          handleSubmit={handleSubmit} />
        )}
      </CommonModal>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: 50,
          p: 1,
        }}
      >
        <LoadingButton
          variant="contained"
          loading={loading}
          onClick={() => handleOpen("", "post")}
        >
          New {stockType}
        </LoadingButton>
        {selectedRows.length !== 0 && (
          <IconButton color="error" onClick={() => handleOpen("", "delete")}>
            <Delete />
          </IconButton>
        )}
      </Paper>
      <DataGrid
        rows={stockData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowSelectionModelChange={handleSelectionChange}
        loading={loading}
      />
    </div>
  );
};
export default TableBasedPage;
