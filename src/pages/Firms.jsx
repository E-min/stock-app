import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import useStockCall from "../hooks/useStockCall";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import CommonModal from "../components/CommonModal";
import { useRef } from "react";
import FirmsForm from "../components/FirmsForm";
import ActionConfirmation from "../components/ActionConfirmation";
import FirmsCard from "../components/FirmsCard";

const initialState = {
  name: "",
  address: "",
  phone: "",
  image: "",
};

const Firms = () => {
  const { loading, firms } = useSelector((state) => state.stock);
  const { getStock, manageStocks } = useStockCall();
  const [openModal, setOpenModel] = useState(false);
  const actionType = useRef();
  const [newInputData, setNewInputData] = useState(initialState);

  useEffect(() => {
    getStock("firms");
  }, []);

  const handleClose = () => {
    setOpenModel(false);
  };
  const handleOpen = (firmInfos, type) => {
    if (type === "post") {
      setNewInputData(initialState);
    } else {
      setNewInputData(firmInfos);
    }
    actionType.current = type;
    setOpenModel(true);
  };

  const skeletons = Array.from({ length: 4 }, (_, index) => (
    <Skeleton variant="rounded" key={index}>
      <FirmsCard />
    </Skeleton>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    manageStocks(newInputData, actionType.current, 'firms');
    handleClose();
  };

  const handleChange = (e) => {
    setNewInputData({ ...newInputData, [e.target.id]: e.target.value });
  };

  return (
    <Box>
      <LoadingButton
        loading={loading}
        variant="contained"
        onClick={() => handleOpen({}, "post")}
      >
        New Firms
      </LoadingButton>
      <CommonModal handleClose={handleClose} openModal={openModal}>
        {actionType.current === "delete" ? (
          <ActionConfirmation
            handleSubmit={handleSubmit}
            handleClose={handleClose}
            loading={loading}
            name={newInputData.name}
          />
        ) : (
          <FirmsForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            loading={loading}
            inputValues={newInputData}
          />
        )}
      </CommonModal>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          p: "2rem 0",
        }}
      >
        {loading
          ? skeletons
          : firms.map((firm) => (
              <FirmsCard
                firmInfos={firm}
                key={firm.id}
                handleOpen={handleOpen}
              />
            ))}
      </Box>
    </Box>
  );
};

export default Firms;
