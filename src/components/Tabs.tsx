import * as React from 'react';
import Box from '@mui/material/Box';
import Variables from './Variables';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';

import { Headers } from './Headers';

interface Props {
  value: string;
  handleChange?: () => void;
}

export default function LabTabs(props: Props) {
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={props.value}>
        <TabPanel sx={{ padding: '0' }} value="1">
          <Variables />
        </TabPanel>
        <TabPanel sx={{ padding: '0' }} value="2">
          <Headers />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
