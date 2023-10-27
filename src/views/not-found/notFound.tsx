import React from 'react';
import Lottie from 'lottie-react';
import notFoundAnimation from './notFoundAnimation.json';
import { Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import classes from './NotFound.module.css';

const NotFound = () => {
  return (
    <Container maxWidth="sm">
      <Lottie
        animationData={notFoundAnimation}
        loop={true}
        height={50}
        width={50}
      />
      <Typography variant="h3" align="center">
        Page not found
      </Typography>
      <Link to="/" className={classes.link}>
        Go home
      </Link>
    </Container>
  );
};

export default NotFound;
