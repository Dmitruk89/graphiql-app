import DeveloperCard from '../components/Card';
import React from 'react';
import Box from '@mui/material/Box';
import { developers } from '../utils/constants';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function Welcome() {
  return (
    <>
    <Typography variant="h1" component="h2" sx={{ fontSize: '48px', fontWeight: 500, textAlign: 'center' }}>
        GraphiQL-clone
    </Typography>;
    <Typography component="p" sx={{ fontSize: '28px', width: '60%', textAlign: 'center', margin: '0 auto  20px' }}>
        GraphQL is a syntax that describes how to query data, and is mainly used by the client to download data from the server. GraphQL has three main characteristics:
    </Typography>
    <Typography component="p" sx={{ fontSize: '28px', width: '60%', margin: '0 auto' }}>
    Allows the client to specify exactly what data they need.
    </Typography>
    <Typography component="p" sx={{ fontSize: '28px', width: '60%', margin: '0 auto' }}>
    Facilitates the aggregation of data from multiple sources.
    </Typography>
    <Typography component="p" sx={{ fontSize: '28px', width: '60%', margin: '0 auto' }}>
    Uses a type system to describe data.
    </Typography>
        <Box component="div" sx={{ width: '1400px', margin: ' 20px auto 0', display: 'flex', justifyContent: 'space-around' }}>
           {developers.map(dev => <DeveloperCard name={dev.name} altText={dev.altText} descr={dev.descr} image={dev.image} />)}
        </Box>

    </>
  );
}

export default Welcome;
