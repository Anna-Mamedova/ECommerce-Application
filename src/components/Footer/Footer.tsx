import { Container, Typography, Link } from '@mui/material';
import React from 'react';
import rsLogo from '../../assets/rs_school_js.svg';

const Footer = () => {
  return (
    <footer>
      <Container
        maxWidth="xl"
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          p: 2,
          alignItems: 'center',
          color: 'black',
          columnGap: '40px',
          rowGap: '20px',
          flexWrap: 'wrap',
        }}
      >
        <Typography>2023</Typography>
        <Link
          href="https://rs.school/js/"
          underline="none"
          target="_blank"
          sx={{ ml: 1 }}
        >
          {' '}
          <img width={70} src={rsLogo}></img>
        </Link>
      </Container>
    </footer>
  );
};

export default Footer;
