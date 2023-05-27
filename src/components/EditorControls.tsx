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
  setVariablesState,
  updateVariablesForQuery,
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
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { HeadersStateType, VariablesStateType } from 'types/types';

export default function EditorControls() {
  const t = useSelector(selectTranslations);
  const code = useSelector((state: RootState) => state.graphql.editorCode);
  const placeholder = useSelector((state: RootState) => state.graphql.placeholderCode);
  const headersEditorCode = useSelector((state: RootState) => state.graphql.headersEditor);
  const varaiblesEditorCode = useSelector((state: RootState) => state.graphql.varQueryCode);
  const dispatch = useDispatch();

  function jsonHandler(
    jsonCode: string,
    setter:
      | ActionCreatorWithPayload<HeadersStateType, 'characters/setHeadersState'>
      | ActionCreatorWithPayload<VariablesStateType, 'characters/setVariablesState'>
  ) {
    try {
      if (jsonCode === '') throw new Error('emptyCode');
      const objFromEditor = JSON.parse(jsonCode);
      dispatch(setter('parsed'));
      return objFromEditor;
    } catch (error) {
      if (error instanceof Error && error.message === 'emptyCode') {
        dispatch(setter('empty'));
      } else {
        dispatch(setter('notParsed'));
      }
    }
  }

  function onSendButtonClick() {
    const headersObject = jsonHandler(headersEditorCode, setHeadersState);
    const variablesObject = jsonHandler(varaiblesEditorCode, setVariablesState);
    if (headersObject) dispatch(updateHeadersForQuery(Object.entries(headersObject)));
    dispatch(updateVariablesForQuery(variablesObject));
    dispatch(disableSkip());
    dispatch(createQuery(code));
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
          color="info"
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
          <IconButton color="primary" onClick={() => onPasteButtonClick()}>
            <PostAddIcon />
          </IconButton>
        </HtmlTooltip>
        <IconButton color="primary" onClick={() => onClearButtonClick()}>
          <Tooltip title={t.mainSection.editorClearTooltip} placement="right">
            <DeleteSweepIcon />
          </Tooltip>
        </IconButton>
      </Box>
    </React.Fragment>
  );
}
