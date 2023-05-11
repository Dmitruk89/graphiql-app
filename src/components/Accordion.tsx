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
  const [isExpanded, setIsExpanded] = React.useState('auto');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClick = (event: React.SyntheticEvent) => {
    const target = event.currentTarget.firstChild?.firstChild?.firstChild?.firstChild?.textContent;
    // if (target) {
    //   setIsExpanded('none');
    // } else {
    //   setIsExpanded('auto');
    // }
  };

  return (
    <>
      <Accordion>
        <AccordionSummary
          expandIcon={
            <ExpandMoreIcon
              sx={{ transform: 'rotate(180deg)', pointerEvents: 'auto' }}
              onClick={() => setIsExpanded('auto')}
            />
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
          sx={{ pointerEvents: `${isExpanded}` }}
        >
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }} onClick={handleClick}>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="tabs example"
            >
              <Tab className="Variables" label="Variables" value="1" />
              <Tab className="Headers" label="Headers" value="2" />
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
