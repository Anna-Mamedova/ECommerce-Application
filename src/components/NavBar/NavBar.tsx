import React, { useCallback, useContext, useEffect, useState } from 'react';
import { AppBar, Container, Typography, Box } from '@mui/material';
import { Link, NavLink } from 'react-router-dom';
import classes from './NavBar.module.css';
import './pageLinks.css';
import {
  LOGIN_ROUTE,
  MAIN_ROUTE,
  REGISTRATION_ROUTE,
  USER_PROFILE,
} from '../../utils/consts';
import {
  ShoppingBag,
  LockOpen,
  Person,
  Menu,
  Close,
  Logout,
  AccountCircleOutlined,
} from '@mui/icons-material';
import { AuthContext, СartQuantityContext } from '../../context';
import routes from '../../utils/routes';

export default function NavBar() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const { cartQuantity, setCartQuantity } = useContext(СartQuantityContext);

  document.body.style.overflowY = isMenuOpen ? 'hidden' : 'auto';

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const logout = useCallback(() => {
    setIsAuth(false);
    localStorage.clear();
    setCartQuantity(0);
  }, [setIsAuth]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 900 && isMenuOpen) {
        closeMenu();
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: 'white', boxShadow: '0 4px 6px -6px #222;' }}
      elevation={0}
    >
      <Container
        maxWidth="xl"
        sx={{ height: 63, display: 'flex', alignItems: 'center' }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexGrow: 1,
            alignItems: 'center',
          }}
        >
          <Link
            onClick={() => {
              if (isMenuOpen) closeMenu();
            }}
            to={MAIN_ROUTE}
            title="Go to Home"
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
              }}
            >
              <ShoppingBag sx={{ mr: 1, color: '#212121' }} />
              <Typography
                variant="h6"
                noWrap
                sx={{
                  mr: 2,
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  letterSpacing: '.2rem',
                  color: '#212121',
                }}
              >
                ETHNOWEAR
              </Typography>
            </Box>
          </Link>
          <Box
            data-testid="menu-btn"
            onClick={toggleMenu}
            sx={{ color: '#212121', display: { xs: 'block', md: 'none' } }}
          >
            {isMenuOpen ? <Close /> : <Menu />}
          </Box>
          <Box
            onClick={closeMenu}
            className={`${isMenuOpen ? classes.active : ''} ${classes.overlay}`}
          >
            <Box
              data-testid="nav-menu"
              onClick={(e) => e.stopPropagation()}
              className={`${isMenuOpen ? classes.active : ''} ${classes.menu}`}
            >
              {routes.map((route, index) => (
                <NavLink
                  key={index}
                  onClick={closeMenu}
                  to={route.path}
                  className="pages__link"
                  title={route.title}
                >
                  {<route.icon sx={{ mr: 0.5 }} />}
                  {route.name !== 'Cart' && route.name}
                  {route.name === 'Cart' ? (
                    <Typography>| {cartQuantity}</Typography>
                  ) : null}
                </NavLink>
              ))}
              {isAuth ? (
                <>
                  <NavLink
                    onClick={closeMenu}
                    to={USER_PROFILE}
                    className="pages__link"
                    title="User Profile"
                  >
                    <AccountCircleOutlined sx={{ mr: 0.5 }} />
                    User Profile
                  </NavLink>
                  <NavLink
                    onClick={() => {
                      logout();
                      closeMenu();
                    }}
                    to={MAIN_ROUTE}
                    className={classes.btn}
                    title="Log In"
                  >
                    <Logout sx={{ mr: 0.5 }} />
                    Logout
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink
                    onClick={closeMenu}
                    to={LOGIN_ROUTE}
                    className={classes.btn}
                    title="Log In"
                  >
                    <LockOpen sx={{ mr: 0.5 }} />
                    Log In
                  </NavLink>
                  <NavLink
                    onClick={closeMenu}
                    to={REGISTRATION_ROUTE}
                    className={classes.btn}
                    title="Sign Up"
                  >
                    <Person sx={{ mr: 0.5 }} />
                    Sign Up
                  </NavLink>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}
