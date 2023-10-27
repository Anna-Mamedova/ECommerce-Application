import React from 'react';
import { teamMembers } from '../../utils/teamMemebrsData';
import {
  Avatar,
  Card,
  CardContent,
  Chip,
  Typography,
  Link,
  Grid,
  Box,
} from '@mui/material';
import { GitHub } from '@mui/icons-material';

function TeamMemebrCard() {
  return (
    <Grid
      container
      sx={{ gap: '20px', textAlign: 'center' }}
      columns={{ xs: 4, sm: 8, md: 12 }}
    >
      {teamMembers.map((member) => (
        <Grid
          item
          key={member.githubUrl}
          sx={{ maxWidth: 275, margin: '0 auto' }}
        >
          <Link
            href={member.githubUrl}
            underline="none"
            target="_blank"
            sx={{ m: 0 }}
          >
            <Card
              sx={{
                minWidth: 275,
                maxWidth: 275,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                m: 0,
              }}
            >
              <CardContent
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Avatar
                  alt={member.name}
                  src={member.avatarSrc}
                  sx={{ width: '150px', height: '150px', mb: 2 }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    columnGap: '10px',
                  }}
                >
                  <Typography variant="h5">{member.name}</Typography>
                  <Link
                    href={member.githubUrl}
                    color="black"
                    underline="none"
                    target="_blank"
                  >
                    <GitHub />
                  </Link>
                </Box>
                <Typography>{member.role.join(', ')}</Typography>
                <Typography
                  color="text.secondary"
                  variant="caption"
                  sx={{ mb: 1, fontStyle: 'italic' }}
                >
                  {member.bio}
                </Typography>
                <Chip label="Main contributions " variant="outlined" />
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {member.contributions.join(', ')}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

export default TeamMemebrCard;
