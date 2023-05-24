import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocsType, DocsField, DocsListItem } from '../../types/docsTypes';
import { HeadersStateType } from '../../types/types';

export interface GraphqlState {
  editorCode: string;
  query: string;
  headersEditor: string;
  headersForQuery: [string, string | unknown][];
  headersState: HeadersStateType;
  skipQuery: boolean;
  isDocsOpen: boolean;
  isTypeQuery: boolean;
  docsWidth: number;
  docsType: DocsType | null;
  docsTypeName: string | undefined;
  docsListName: string | undefined;
  docsField: DocsField | null;
  docsListStack: DocsListItem[];
}

const initialState: GraphqlState = {
  editorCode: ` query {
    characters(page: 2, filter: { name: "rick" }) {
      info {
        count
      }
      results {
        name
      }
    }
    location(id: 1) {
      id
    }
    episodesByIds(ids: [1, 2]) {
      id
    }
  }`,
  query: '',
  headersEditor: '',
  headersForQuery: [['x-custom-headers', '123']],
  headersState: 'empty',
  skipQuery: true,
  isDocsOpen: false,
  isTypeQuery: true,
  docsType: null,
  docsTypeName: 'Query',
  docsListName: 'Query',
  docsField: null,
  docsListStack: [{ name: 'Query', isType: true }],
  docsWidth: 320,
};

export const graphqlSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateEditor: (state, action: PayloadAction<string>) => {
      state.editorCode = action.payload;
    },
    updateHeadersEditor: (state, action: PayloadAction<string>) => {
      state.headersEditor = action.payload;
    },
    updateHeadersForQuery: (state, action: PayloadAction<[string, string | unknown][]>) => {
      state.headersForQuery = action.payload;
    },
    setHeadersState: (state, action: PayloadAction<HeadersStateType>) => {
      state.headersState = action.payload;
    },
    createQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    disableSkip: (state) => {
      state.skipQuery = false;
    },
    setDocsOpen: (state, action: PayloadAction<boolean>) => {
      state.isDocsOpen = action.payload;
    },
    setIsTypeQuery: (state, action: PayloadAction<boolean>) => {
      state.isTypeQuery = action.payload;
    },
    setDocsType: (state, action: PayloadAction<DocsType>) => {
      state.docsType = action.payload;
    },
    setDocsTypeName: (state, action: PayloadAction<string>) => {
      state.docsTypeName = action.payload;
    },
    setDocsListName: (state, action: PayloadAction<DocsListItem>) => {
      state.docsListName = action.payload.name;
      state.docsListStack.push(action.payload);
    },
    setDocsField: (state, action: PayloadAction<DocsField>) => {
      state.docsField = action.payload;
    },
    setPrevListName: (state) => {
      if (state.docsListStack.at(-1) !== undefined) {
        state.docsListStack.pop();
        state.docsListName = state.docsListStack.at(-1)?.name;
        if (state.docsListStack.at(-1)?.isType) {
          state.docsTypeName = state.docsListStack.at(-1)?.name;
          state.isTypeQuery = true;
        } else {
          state.isTypeQuery = false;
        }
      }
    },
  },
});

export const {
  updateEditor,
  updateHeadersEditor,
  updateHeadersForQuery,
  setHeadersState,
  createQuery,
  disableSkip,
  setDocsOpen,
  setDocsType,
  setDocsTypeName,
  setDocsListName,
  setPrevListName,
  setDocsField,
  setIsTypeQuery,
} = graphqlSlice.actions;

export default graphqlSlice.reducer;
