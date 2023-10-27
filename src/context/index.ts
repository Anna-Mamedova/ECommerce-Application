import { createContext } from "react";
import { IAccessTolenContext, IAuthContext, ICartQuantityContext } from "../interfaces/context.interface";

const authInitialValue = {
  isAuth: false,
  setIsAuth: () => {}
}

const cartQuantityInitalValue = {
  cartQuantity: 0,
  setCartQuantity: () => {}
}

const accessTokenInitalValue = {
  token: '',
  setToken: () => {}
}

export const AuthContext = createContext<IAuthContext>(authInitialValue);
export const СartQuantityContext = createContext<ICartQuantityContext>(cartQuantityInitalValue);
export const AccessTokenContext = createContext<IAccessTolenContext>(accessTokenInitalValue);