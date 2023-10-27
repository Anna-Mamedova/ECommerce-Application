import React from 'react';
import { Container, Box, Grid } from '@mui/material';
import classes from './Home.module.css';
import routes from '../../utils/routes';
import { Link } from 'react-router-dom';
import {
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  USER_PROFILE,
} from '../../utils/consts';
import CardPromoCode from './CardPromoCode';

const Home = () => {
  return (
    <>
      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            justifyContent: 'space-evenly',
            flexWrap: 'wrap',
            gap: '30px',
            mt: 4,
          }}
        >
          {routes.map((route, index) => (
            <Link
              key={index}
              to={route.path}
              title={route.title}
              className={classes.link}
            >
              {route.name.toUpperCase()}
            </Link>
          ))}
          <Link to={USER_PROFILE} className={classes.link} title="User profile">
            USER PROFILE
          </Link>
          <Link to={LOGIN_ROUTE} className={classes.link} title="Log In">
            LOG IN
          </Link>
          <Link
            to={REGISTRATION_ROUTE}
            className={classes.link}
            title="Sign Up"
          >
            SIGN UP
          </Link>
        </Box>
      </Container>
      <Container maxWidth="md" sx={{ pt: '50px' }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <CardPromoCode
              title="30% off all womens jewelry on orders over $200"
              promocode="Barbie10"
            />
          </Grid>
          <Grid item xs={6}>
            <CardPromoCode
              title="discount for orders over 300$"
              promocode="FormulaOne"
            />
          </Grid>
          <Grid item xs={6}>
            <CardPromoCode
              title="10% for all mens shirts for orders over 400$"
              promocode="Fire"
            />
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
