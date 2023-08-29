import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { useSelector } from "react-redux";

const dashboardItems = [
  {
    icon: <DashboardCustomizeIcon />,
    title: "Dashboard",
    url: "/stock",
  },
  {
    title: "Purchases",
    icon: <ShoppingCartIcon />,
    url: "/stock/purchases",
  },
  {
    title: "Sales",
    icon: <AttachMoneyIcon />,
    url: "/stock/sales",
  },
  {
    title: "Firms",
    icon: <StoreIcon />,
    url: "/stock/firms",
  },
  {
    title: "Brands",
    icon: <StarsIcon />,
    url: "/stock/brands",
  },
  {
    title: "Products",
    icon: <InventoryIcon />,
    url: "/stock/products",
  },
];

const DrawerItems = () => {
  const currentUser = useSelector((state) => state.auth.isAdmin);
  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {dashboardItems.map(({ title, icon, url }) => (
          <ListItem key={title} disablePadding component={Link} to={url} sx={{color: 'primary.dark'}}>
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={title} />
            </ListItemButton>
          </ListItem>
        ))}
        {currentUser && (
          <ListItem
            disablePadding
            component={Link}
            to={`${import.meta.env.VITE_APP_BASE_URL}/admin/`}
            sx={{color: 'primary.dark'}}
          >
            <ListItemButton>
              <ListItemIcon>
                <SupervisorAccountIcon />
              </ListItemIcon>
              <ListItemText primary={"Admin panel"} />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </div>
  );
};
export default DrawerItems;
