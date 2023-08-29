import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchStart,
  loginSuccess,
  logoutSuccess,
  registerSuccess,
  fetchFail,
} from "../features/authSlice";
import { useNavigate } from "react-router-dom";
import { toastErrorNotify, toastSuccessNotify } from "../helper/ToastNotify";
import store from "../app/store";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

function useAuthCall() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginReq = async (apiEndpoint, object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}/${apiEndpoint}`, object);
      dispatch(loginSuccess(data));
      navigate("/stock");
      if (data.user.is_superuser) {
        toastSuccessNotify("Super User, Welcome back!");
      } else {
        toastSuccessNotify("Login success");
      }
      const authSession = JSON.stringify(store.getState().auth)
      sessionStorage.setItem('auth', authSession);
    } catch (error) {
      dispatch(fetchFail());
      const errMsgs = error.response?.data ? Object.values(error.response.data) : [[error.message]]
      errMsgs?.forEach((msg) => {
        toastErrorNotify(msg[0]);
      });
    }
  };

  const registerReq = async (apiEndpoint, object) => {
    dispatch(fetchStart());
    try {
      const { data } = await axios.post(`${BASE_URL}/${apiEndpoint}`, object);
      dispatch(registerSuccess(data));
      toastSuccessNotify("Register success");
      navigate("/stock");
    } catch (error) {
      dispatch(fetchFail());
      const errMsgs = error?.response?.data;
      if (errMsgs) {
        for (const fieldName in errMsgs) {
          if (errMsgs.hasOwnProperty(fieldName)) {
            const value = errMsgs[fieldName];
            toastErrorNotify(`${fieldName}: ${value}`);
          }
        }
      } else {
        toastErrorNotify("Register failed with unknown error");
      }
    }
  };

  const logoutReq = async (apiEndpoint) => {
    try {
      const { data } = await axios.post(`${BASE_URL}/${apiEndpoint}`);
      dispatch(logoutSuccess());
      toastSuccessNotify("Logout success");
    } catch (error) {
      dispatch(fetchFail());
    }
  };

  return { loginReq, registerReq, logoutReq };
}

export default useAuthCall;
