import { Home, LineChart, Package, ShoppingCart, Users } from "lucide-vue-next";

type LoggedInRoute = {
  name: string;
  path: string;
  icon: any;
};

const LOGGED_IN_ROUTES: Array<LoggedInRoute> = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: Home,
  },
  {
    name: "Orders",
    path: "/orders",
    icon: ShoppingCart,
  },
  {
    name: "Products",
    path: "/products",
    icon: Package,
  },
  {
    name: "Customers",
    path: "/customers",
    icon: Users,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: LineChart,
  },
];

export default LOGGED_IN_ROUTES;
