import { useDispatch } from "react-redux";
import { fetchFail, fetchStart, fetchSuccess } from "../features/stockSlice";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import useAxiosWithToken from "./useAxiosWithToken";

const useStockCall = () => {
  const dispatch = useDispatch();
  const axiosWithToken = useAxiosWithToken();

  const getStock = async (type) => {
    dispatch(fetchStart());
    try {
      const { data } = await axiosWithToken.get(`/stock/${type}/`);
      dispatch(fetchSuccess({ data, type }));
    } catch (error) {
      dispatch(fetchFail());
      const errMsgs = error.response?.data
        ? Object.values(error.response.data)[0]
        : error.message;
      toastErrorNotify(errMsgs);
    }
  };
  const manageStocks = async (object, actionType, requestType) => {
    dispatch(fetchStart());
    let successMsg;
    try {
      switch (actionType) {
        case "post":
          {
            const { data } = await axiosWithToken.post(
              `/stock/${requestType}/`,
              object
            );
          }
          successMsg = "New items successfully added.";
          break;
        case "delete":
          if (Array.isArray(object)) {
            const requests = object.map((item) =>
              axiosWithToken.delete(`/stock/${requestType}/${item.id}/`)
            );
            const responses = await Promise.all(requests);
          } else {
            const { data } = await axiosWithToken.delete(
              `/stock/${requestType}/${object.id}/`
            );
          }
          successMsg = "Selected item(s) successfully deleted.";
          break;
        case "put":
          {
            const { data } = await axiosWithToken.put(
              `/stock/${requestType}/${object.id}/`,
              object
            );
          }
          successMsg = "Selected item successfully changed.";
          break;
      }
      getStock(requestType);
      toastSuccessNotify(successMsg);
    } catch (error) {
      dispatch(fetchFail());
      const errMsgs = error.response?.data
        ? Object.values(error.response.data)[0]
        : error.message;
      toastErrorNotify(errMsgs);
      console.log(error);
    }
  };
  return { getStock, manageStocks };
};

export default useStockCall;
