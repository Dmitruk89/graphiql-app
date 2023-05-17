import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LabTabs from './Tabs';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';

export default function SimpleAccordion() {
  const [value, setValue] = React.useState('1');
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleTabClick = (val: string) => {
    setValue(val);
    if (!isExpanded) setIsExpanded(true);
  };

  return (
    <>
      <Accordion expanded={isExpanded}>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{ transform: 'rotate(180deg)' }}
              onClick={() => setIsExpanded(!isExpanded)}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              textColor="primary"
              indicatorColor="primary"
              aria-label="tabs example"
            >
              <Tab
                className="Variables"
                label="Variables"
                value="1"
                onClick={() => handleTabClick('1')}
              />
              <Tab
                className="Headers"
                label="Headers"
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
