export interface IAuthContext {
  isAuth: boolean,
  setIsAuth: (newState: boolean) => void
}

export interface ICartQuantityContext {
  cartQuantity: number,
  setCartQuantity: (newState: number) => void
}

export interface IAccessTolenContext {
  token: string,
  setToken: (newState: string) => void
}