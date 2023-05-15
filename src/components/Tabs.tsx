import * as React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

interface IProps {
  value: string;
  handleChange?: () => void;
}
export default function LabTabs(props: IProps) {
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={props.value}>
        <TabPanel value="1">Variables</TabPanel>
        <TabPanel value="2">Headers</TabPanel>
      </TabContext>
    </Box>
  );
}
