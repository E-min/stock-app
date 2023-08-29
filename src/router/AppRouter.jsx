import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Sales from "../pages/Sales";
import Firms from "../pages/Firms";
import Brands from "../pages/Brands";
import Products from "../pages/Products";
import Purchases from "../pages/Purchases";
import DrawerAndNavbar from "../components/DrawerAndNavbar";
import Dashboard from "../pages/Dashboard";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="stock" element={<PrivateRouter />}>
          <Route path="" element={<DrawerAndNavbar />}>
            <Route index element={<Dashboard />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="sales" element={<Sales />} />
            <Route path="firms" element={<Firms />} />
            <Route path="brands" element={<Brands />} />
            <Route path="products" element={<Products />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
