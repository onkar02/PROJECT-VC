// dashbaord
import Ecommerce from "../components/dashboard/ecommerce";

// starter kits
import Starterkits from "../components/starter-kits";
import SignIn from "../components/signin/SignIn";
import Home from "../Home";
import Default from "../components/dashboard/default";
import UserDetails from "../components/UserDetailsForm/UserDetails";
import AboutUs from "../components/SideBarComponent/AboutUS";
import Services from "../components/SideBarComponent/Services";
import Gallery from "../components/SideBarComponent/Gallery";
import Products from "../components/SideBarComponent/Products";
import SocialUrls from "../components/SideBarComponent/SocialUrls";
import BankDetails from "../components/SideBarComponent/BankDetails";
export const routes = [
  { path: `${process.env.PUBLIC_URL}/SignIn`, Component: SignIn },
  {
    path: `${process.env.PUBLIC_URL}//dashboard/userDashboard`,
    Component: Default,
  },
  { path: "/dashboard/userDashboard", Component: Default },
  { path: "/dashboard/AboutUs", Component: AboutUs },
  { path: "/dashboard/Services", Component: Services },
  { path: "/dashboard/Products", Component: Products },
  { path: "/dashboard/Gallery", Component: Gallery },
  { path: "/dashboard/Social_URL", Component: SocialUrls },
  { path: "/dashboard/BankDetails", Component: BankDetails },

  {
    path: `${process.env.PUBLIC_URL}/UserDetailsForm/UserDetails`,
    Component: UserDetails,
  },
];
