import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LabTabs from './Tabs';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';

export default function SimpleAccordion() {
  const t = useSelector(selectTranslations);
  const [value, setValue] = React.useState('1');
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleTabClick = (val: string) => {
    setValue(val);
    if (!isExpanded) setIsExpanded(true);
  };

  return (
    <>
      <Accordion expanded={isExpanded} sx={{ marginTop: '16px' }}>
        <AccordionSummary
          expandIcon={
            <ExpandLessIcon
              sx={{ transform: 'rotate(180deg)', pointerEvents: 'auto' }}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ pointerEvents: 'none' }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider', pointerEvents: 'auto' }}>
            <Tabs
              value={value}
              textColor="primary"
              indicatorColor="primary"
              aria-label="tabs example"
            >
              <Tab
                className="variables"
                label={t.tabs.variables}
                value="1"
                onClick={() => handleTabClick('1')}
              />
              <Tab
                className="headers"
                label={t.tabs.headers}
                value="2"
                onClick={() => handleTabClick('2')}
              />
            </Tabs>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <LabTabs value={value} />
        </AccordionDetails>
      </Accordion>
    </>
  );
}
