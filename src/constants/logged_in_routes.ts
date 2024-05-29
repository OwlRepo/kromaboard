import { Home, LineChart, Package, ArrowLeftRight } from "lucide-vue-next";

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
    name: "Transactions",
    path: "/transactions",
    icon: ArrowLeftRight,
  },
  {
    name: "Products",
    path: "/products",
    icon: Package,
  },
  {
    name: "Reports",
    path: "/reports",
    icon: LineChart,
  },
];

export default LOGGED_IN_ROUTES;
