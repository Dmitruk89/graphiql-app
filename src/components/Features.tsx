import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { titleStyle } from '../utils/style-const';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';

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

export default function Features() {
  const t = useSelector(selectTranslations);
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        position: 'relative',
        minHeight: 200,
        width: '40%',
        margin: '20px auto',
        '@media (max-width: 915px)': {
          width: '90%',
        },
      }}
    >
      <Typography variant="h1" component="h4" sx={titleStyle}>
        {t.welcomeSection.project}
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
          <Tab label={t.about.about1} {...a11yProps(0)} />
          <Tab label={t.about.about2} {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Typography component="p">{t.about.features1}</Typography>
          <Typography component="p">{t.about.features2}</Typography>
          <Typography component="p">{t.about.features3}</Typography>
          <Typography component="p">{t.about.features4}</Typography>
          <Typography component="p">{t.about.features5}</Typography>
          <Typography component="p">{t.about.features6}</Typography>
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
    </Box>
  );
}
