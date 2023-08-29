import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouter = () => {
  const currentUser = useSelector(({ auth }) => auth.currentUser);

  return currentUser ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouter;
