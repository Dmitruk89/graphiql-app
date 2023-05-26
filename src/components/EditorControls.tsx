import SendIcon from '@mui/icons-material/Send';
import PostAddIcon from '@mui/icons-material/PostAdd';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import Box from '@mui/material/Box';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateEditor,
  createQuery,
  disableSkip,
  updateHeadersForQuery,
  setHeadersState,
  setVariablesQuery,
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

export default function EditorControls() {
  const t = useSelector(selectTranslations);
  const code = useSelector((state: RootState) => state.graphql.editorCode);
  const placeholder = useSelector((state: RootState) => state.graphql.placeholderCode);
  const headersEditorCode = useSelector((state: RootState) => state.graphql.headersEditor);
  const dispatch = useDispatch();

  function onSendButtonClick() {
    try {
      if (headersEditorCode === '') throw new Error('emptyHeaders');
      const objFromHeadersEditor = JSON.parse(headersEditorCode);
      dispatch(setHeadersState('parsed'));
      dispatch(updateHeadersForQuery(Object.entries(objFromHeadersEditor)));
    } catch (error) {
      if (error instanceof Error && error.message === 'emptyHeaders') {
        dispatch(setHeadersState('empty'));
      } else {
        dispatch(setHeadersState('notParsed'));
      }
    }
    dispatch(disableSkip());
    dispatch(createQuery(code));
    dispatch(setVariablesQuery());
  }

  function onPasteButtonClick() {
    dispatch(updateEditor(placeholder));
  }
  function onClearButtonClick() {
    dispatch(updateEditor(''));
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
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '5px',
          justifyContent: 'space-between',
        }}
      >
        <IconButton
          color="primary"
          aria-label="add to shopping cart"
          onClick={() => onSendButtonClick()}
        >
          <Tooltip title={t.mainSection.sendButton} placement="right">
            <SendIcon />
          </Tooltip>
        </IconButton>
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">{t.mainSection.tooltipClickAction}</Typography>
              <Typography variant="body2" color="inherit">
                {t.mainSection.editorTooltipPlaceholder}
              </Typography>
              {placeholder}
            </React.Fragment>
          }
        >
          <IconButton color="info" onClick={() => onPasteButtonClick()}>
            <PostAddIcon />
          </IconButton>
        </HtmlTooltip>
        <IconButton color="info" onClick={() => onClearButtonClick()}>
          <Tooltip title={t.mainSection.editorClearTooltip} placement="right">
            <DeleteSweepIcon />
          </Tooltip>
        </IconButton>
      </Box>
    </React.Fragment>
  );
}
