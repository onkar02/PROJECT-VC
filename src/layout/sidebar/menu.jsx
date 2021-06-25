import {
  Home,
  Anchor,
  Headphones,
  Users,
  Book,
  Settings,
  ShoppingBag,
  Aperture,
  Cpu,
  Database,
} from "react-feather";
export const MENUITEMS = [
  {
    menutitle: "MENU ITEMS",
    menucontent: "SUBMENU ITEMS",
    Items: [
      {
        icon: Home,
        path: `${process.env.PUBLIC_URL}/dashboard/userDashboard`,
        title: "User Dashboard",
        type: "link",
      },
      {
        icon: Book,

        path: `${process.env.PUBLIC_URL}/UserDetailsForm/UserDetails`,
        title: "Personal details",
        type: "link",
      },
      {
        title: "About Us",
        icon: Users,
        type: "link",
        path: `${process.env.PUBLIC_URL}/dashboard/AboutUs`,
      },
      {
        icon: Settings,
        path: `${process.env.PUBLIC_URL}/dashboard/Services`,
        title: "Services",
        type: "link",
      },
      {
        icon: ShoppingBag,
        path: `${process.env.PUBLIC_URL}/dashboard/Products`,
        title: "Products",
        type: "link",
      },
      {
        icon: Aperture,
        path: `${process.env.PUBLIC_URL}/dashboard/Gallery`,
        title: "Gallery",
        type: "link",
      },
      {
        icon: Cpu,
        path: `${process.env.PUBLIC_URL}/dashboard/Social_URL`,
        title: "Social URL'S",
        type: "link",
      },
      {
        icon: Database,
        path: `${process.env.PUBLIC_URL}/dashboard/BankDetails`,
        title: "Bank Details",
        type: "link",
      },
    ],
  },
];
