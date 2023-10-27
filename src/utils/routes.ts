import AboutUs from "../views/about-us/AboutUs";
import Basket from "../views/basket/Basket";
import Catalog from "../views/catalog/Catalog";
import Home from "../views/home/Home";
import { ABOUTUS_ROUTE, CART_ROUTE, CATALOG_ROUTE, MAIN_ROUTE } from "./consts";
import { HomeOutlined, InfoOutlined, LibraryBooksOutlined, ShoppingCart } from '@mui/icons-material';

const routes = [
  {
    name: 'Home',
    path: MAIN_ROUTE,
    element: Home,
    title: "Go to Home",
    icon: HomeOutlined
  },
  {
    name: 'About Us',
    path: ABOUTUS_ROUTE,
    element: AboutUs,
    title: "About Us",
    icon: InfoOutlined
  },
  {
    name: 'Catalog',
    path: CATALOG_ROUTE,
    element: Catalog,
    title: "Catalog",
    icon: LibraryBooksOutlined
  },
  {
    name: 'Cart',
    path: CART_ROUTE,
    element: Basket,
    title: "Cart",
    icon: ShoppingCart
  }
];

export default routes;