import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

interface IProps {
  value: string;
  handleChange?: () => void;
}
export default function LabTabs(props: IProps) {
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={props.value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          {/* <TabList onChange={handleChange} aria-label="tabs">
            <Tab label="Variables" value="1" />
            <Tab label="Headers" value="2" />
          </TabList> */}
        </Box>
        <TabPanel value="1">Variables</TabPanel>
        <TabPanel value="2">Headers</TabPanel>
      </TabContext>
    </Box>
  );
}
