import React from 'react';
import { Box, Container, Divider, Link, Typography } from '@mui/material';
import TeamMemebrCard from '../../components/TeamMemebrCard/TeamMemebrCard';

import rsLogo from '../../assets/rs_school_js.svg';

const AboutUs = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ maxWidth: '900px', margin: '0 auto', mt: 2, mb: 10 }}>
        <Divider
          sx={{
            color: '#5b5b5b',
            fontWeight: 700,
            fontSize: '18px',
            mb: 3,
            mt: 5,
          }}
        >
          chatGPT team
        </Divider>
        <Typography paragraph textAlign="left">
          Hello! We are a team of Ukrainian developers and this site is our team
          training project eCommerce Application in
          <Link
            href="https://rs.school/js/"
            underline="none"
            target="_blank"
            sx={{ ml: 1 }}
          >
            {' '}
            <img width={70} src={rsLogo}></img>
          </Link>
        </Typography>
        <Typography paragraph textAlign="left">
          Users can browse through a vast range of products 📚👗👟, view
          detailed descriptions, add their items to the basket 🛒, and proceed
          to checkout 💳. It includes features such as user registration and
          login 📝🔐, product search 🔍, product categorization, and sorting to
          make the shopping experience more streamlined and convenient.
        </Typography>
        <Typography
          paragraph
          sx={{ mb: 5 }}
          textAlign="left"
          position="relative"
        >
          <b>Stack of technologies used:</b> React, Typescript, JavaScript,
          HTML, CSS, Node.js, Commercetools was used as a database
        </Typography>
        <TeamMemebrCard />
      </Box>
    </Container>
  );
};

export default AboutUs;
