import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Box from '@mui/material/Box';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setIsAccordionExpanded,
  updateEditor,
  updateVariables,
} from '../features/graphql/graphqlSlice';
import { RootState } from '../store';
import { selectTranslations } from '../features/translation/translationSlice';
import {
  IconButton,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material';

export default function AccordionControls() {
  const t = useSelector(selectTranslations);
  const varPlaceholder = useSelector((state: RootState) => state.graphql.placeholderVar);
  const varEditorPlaceholder = useSelector((state: RootState) => state.graphql.placeholderVarCode);
  const dispatch = useDispatch();

  function onPasteButtonClick() {
    dispatch(updateEditor(varEditorPlaceholder));
    dispatch(updateVariables(varPlaceholder));
    dispatch(setIsAccordionExpanded(true));
  }
  function onClearButtonClick() {
    dispatch(updateVariables(''));
  }

  const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} placement="right" />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }));

  return (
    <React.Fragment>
      <Box
        sx={{
          marginLeft: '10px',
          marginTop: '10px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '5px',
          justifyContent: 'space-between',
        }}
      >
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">{t.mainSection.tooltipClickAction}</Typography>
              <Typography variant="body2" color="inherit">
                {t.mainSection.editorTooltipPlaceholder}
              </Typography>
              {varEditorPlaceholder}
              <Typography variant="body2" color="inherit">
                {t.mainSection.variablesTooltipPlaceholder}
              </Typography>
              {varPlaceholder}
            </React.Fragment>
          }
        >
          <IconButton color="info" onClick={() => onPasteButtonClick()}>
            <PostAddIcon />
          </IconButton>
        </HtmlTooltip>
        <IconButton color="info" onClick={() => onClearButtonClick()}>
          <Tooltip title={t.mainSection.variablesClearTooltip} placement="right">
            <DeleteSweepIcon />
          </Tooltip>
        </IconButton>
      </Box>
    </React.Fragment>
  );
}
