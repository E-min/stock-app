import { useSelector } from "react-redux";
import axios from "axios";

const useAxiosWithToken = () => {
  const { token } = useSelector(({ auth }) => auth);
  const axiosWithToken = axios.create({
    baseURL: "https://12223.fullstack.clarusway.com",
    timeout: null,
    headers: { Authorization: `Token ${token}` },
  });
  return  axiosWithToken
};

export default useAxiosWithToken;
