import * as React from 'react';
import Box from '@mui/material/Box';
import TabContext from '@mui/lab/TabContext';
import TabPanel from '@mui/lab/TabPanel';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';

interface IProps {
  value: string;
  handleChange?: () => void;
}
export default function LabTabs(props: IProps) {
  const t = useSelector(selectTranslations);
  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={props.value}>
        <TabPanel value="1">{t.tabs.variables}</TabPanel>
        <TabPanel value="2">{t.tabs.headers}</TabPanel>
      </TabContext>
    </Box>
  );
}
