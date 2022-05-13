import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import avatarImage from '../../assets/images/2.jpg';
import { shallowEqual, useSelector } from 'react-redux';




export default function ProfileInfo({user}) {

  const jobName = useSelector((state) => state.auth.userJobName, shallowEqual);

  return (
    <Box sx={{ flexGrow: 1, overflow: 'hidden', p: 3 }}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
          <Avatar alt="Travis Howard" src={avatarImage} />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{user.email}</Typography>
            <Typography variant='caption' noWrap>{jobName}</Typography>
          </Grid>
        </Grid>
    </Box>
  );
}
