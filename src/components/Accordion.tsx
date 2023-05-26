import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LabTabs from './Tabs';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Box from '@mui/material/Box';
import { RootState } from '../store';
import { useSelector, useDispatch } from 'react-redux';
import { selectTranslations } from '../features/translation/translationSlice';
import AccordionControls from './AccordionControls';
import { setIsAccordionExpanded } from '../features/graphql/graphqlSlice';

export default function SimpleAccordion() {
  const t = useSelector(selectTranslations);
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('1');
  const isExpanded = useSelector((state: RootState) => state.graphql.isAccordionExpanded);

  const handleTabClick = (val: string) => {
    setValue(val);
    if (!isExpanded) dispatch(setIsAccordionExpanded(true));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        alignItems: 'flex-start',
      }}
    >
      <Accordion expanded={isExpanded} sx={{ marginTop: '16px', width: '100%' }}>
        <AccordionSummary
          expandIcon={
            <ExpandLessIcon
              sx={{ transform: 'rotate(180deg)', pointerEvents: 'auto' }}
              onClick={() => dispatch(setIsAccordionExpanded(!isExpanded))}
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
      <AccordionControls></AccordionControls>
    </Box>
  );
}
