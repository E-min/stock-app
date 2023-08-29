import { Box, Paper, Toolbar, Typography } from "@mui/material"
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DashboardCards from "../components/DashboardCards";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { useSelector } from "react-redux";
import useStockCall from "../hooks/useStockCall";
import { useEffect } from "react";


const Dashboard = () => {
  const { getStock } = useStockCall();
  const { sales, purchases } = useSelector(({ stock }) => stock);

  useEffect(() => {
    getStock("sales");
    getStock("purchases");
  }, []);

  const salesNum =
    sales.length !== 0 && sales.reduce((acc, cur) => +cur.price_total + acc, 0);
  const purchasesNum =
    sales.length !== 0 &&
    purchases.reduce((acc, cur) => +cur.price_total + acc, 0);

  const digits = (num, type) => {
    if (num >= 1e6) {
      return (num / 1e6).toFixed(2) + "M";
    }
    if (num >= 1e3) {
      return (num / 1e3).toFixed(2) + "K";
    }
    if (num < 0) {
      num = -num;
      type = "-" + type;
    }
    return type + num.toString();
  };

  const cardData = [
    {
      id: 101,
      name: "Sales",
      content: digits(salesNum, "$"),
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 102,
      name: "Purchases",
      content: digits(purchasesNum, "$"),
      icon: <ShoppingCartIcon sx={{ fontSize: 40 }} />,
    },
    {
      id: 103,
      name: "Profit",
      content: digits(salesNum - purchasesNum, "$"),
      icon: <MonetizationOnIcon sx={{ fontSize: 40 }} />,
    },
  ];
  return (
    <Box>
      <Typography variant="h4" component={"h2"}>
        Dashboard
      </Typography>
      <Toolbar />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
        }}
      >
        {cardData.map(({ id, name, content, icon }) => (
          <DashboardCards key={id} name={name} content={content} icon={icon} />
        ))}
      </Box>
      <Toolbar />
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Paper>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
