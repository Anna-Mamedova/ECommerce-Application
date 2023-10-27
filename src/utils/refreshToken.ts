import { refreshToken } from "../views/authorization/log-in/Api-Login";
import { expiredInSeconds } from "./consts";

export async function scheduleTokenRefresh() {
  const time = localStorage.getItem('expiredIn');

  if (time !== null) {
    const timeNumeric = parseInt(time);
    const currTime = Date.now();
    const timeUntilExpiration = timeNumeric - currTime;
    const refreshTenMinutes = 600;

    if (timeUntilExpiration <= refreshTenMinutes) {
      const getIsAuth = localStorage.getItem('isAuth') === 'true';
      const refreshTokenSaved = getIsAuth ? localStorage.getItem('refreshToken') : localStorage.getItem('refreshAnonToken');
      if (refreshTokenSaved !== null) {
        const refToken = await refreshToken({
          refreshToken: refreshTokenSaved,
        });
        getIsAuth ? localStorage.setItem('authToken', refToken.access_token) : localStorage.setItem('anonToken', refToken.access_token);
        localStorage.setItem('expiredIn', `${Date.now() + expiredInSeconds}`)
        return refToken;
      } else {
        console.log('No refreshToken saved');
      }
    } else {
      console.log('No expired in');
    }
  }
}
