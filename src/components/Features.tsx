import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { SxProps } from '@mui/system';
import { titleStyle } from '../utils/style-const';

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: string | number) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function Features() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'secondary',
      sx: fabStyle as SxProps,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'secondary',
      sx: fabStyle as SxProps,
      icon: <EditIcon />,
      label: 'Edit',
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        position: 'relative',
        minHeight: 200,
        width: '40%',
        margin: '20px auto',
      }}
    >
      <Typography variant="h1" component="h4" sx={titleStyle}>
        Used technologes
      </Typography>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Features" {...a11yProps(0)} />
          <Tab label="Technologes" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Typography component="p">Query editor</Typography>
          <Typography component="p">Response section</Typography>
          <Typography component="p">Variables and Headers editors</Typography>
          <Typography component="p">
            Documentation explorer with ability to navigate back in queries
          </Typography>
          <Typography component="p">Multiple languages supported</Typography>
          <Typography component="p">Firebase authentication with auto-logout</Typography>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Typography component="p">GraphQL</Typography>
          <Typography component="p">React, Vite</Typography>
          <Typography component="p">Material UI</Typography>
          <Typography component="p">Redux Toolkit, RTK Query</Typography>
          <Typography component="p">Firebase API</Typography>
          <Typography component="p">i18n</Typography>
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
}
