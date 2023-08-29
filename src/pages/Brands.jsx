import { useSelector } from "react-redux";
import LoadingButton from "@mui/lab/LoadingButton";
import useStockCall from "../hooks/useStockCall";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Skeleton from "@mui/material/Skeleton";
import CommonModal from "../components/CommonModal";
import { useRef } from "react";
import ActionConfirmation from "../components/ActionConfirmation";
import BrandsForm from "../components/BrandsFrom";
import BrandsCard from "../components/BrandsCard";

const initialState = {
  name: "",
  image: "",
};

const Brands = () => {
  const { loading, brands } = useSelector((state) => state.stock);
  const { getStock, manageStocks } = useStockCall();
  const [openModal, setOpenModel] = useState(false);
  const actionType = useRef();
  const [newInputData, setNewInputData] = useState(initialState);

  useEffect(() => {
    getStock("brands");
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
      <BrandsCard />
    </Skeleton>
  ));

  const handleSubmit = (e) => {
    e.preventDefault();
    manageStocks(newInputData, actionType.current, 'brands');
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
        New Brands
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
          <BrandsForm
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
          : brands.map((firm) => (
              <BrandsCard
                firmInfos={firm}
                key={firm.id}
                handleOpen={handleOpen}
              />
            ))}
      </Box>
    </Box>
  );
};

export default Brands;
