import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocsType } from '../../types/docsTypes';
import { HeadersStateType, VariablesStateType } from '../../types/types';

export interface GraphqlState {
  editorCode: string;
  varQueryCode: string;
  variablesState: VariablesStateType;
  query: string;
  headersEditor: string;
  headersForQuery: [string, string | unknown][];
  headersState: HeadersStateType;
  skipQuery: boolean;
  isDocsOpen: boolean;
  docsWidth: number;
  docsType: DocsType | null;
  docsTypeName: string | undefined;
  typeNameStack: string[];
}

const initialState: GraphqlState = {
  editorCode: `query ($name: String) {
    characters(page: 2, filter: { name: $name }) {
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
  varQueryCode: '',
  variablesState: 'empty',
  query: '',
  headersEditor: '',
  headersForQuery: [['x-custom-headers', '123']],
  headersState: 'empty',
  skipQuery: true,
  isDocsOpen: false,
  docsType: null,
  docsTypeName: 'Query',
  typeNameStack: ['Query'],
  docsWidth: 320,
};

export const graphqlSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateEditor: (state: GraphqlState, action: PayloadAction<string>) => {
      state.editorCode = action.payload;
    },
    updateVariables: (state: GraphqlState, action: PayloadAction<string>) => {
      state.varQueryCode = action.payload;
    },
    setVariablesState: (state, action: PayloadAction<VariablesStateType>) => {
      state.variablesState = action.payload;
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
    disableSkip: (state: GraphqlState) => {
      state.skipQuery = false;
    },
    setDocsOpen: (state: GraphqlState, action: PayloadAction<boolean>) => {
      state.isDocsOpen = action.payload;
    },
    setDocsType: (state, action: PayloadAction<DocsType>) => {
      state.docsType = action.payload;
    },
    setDocsTypeName: (state, action: PayloadAction<string>) => {
      state.docsTypeName = action.payload;
      state.typeNameStack.push(action.payload);
    },
    setPrevTypeName: (state) => {
      if (state.typeNameStack.at(-1) !== undefined) {
        state.typeNameStack.pop();
        state.docsTypeName = state.typeNameStack.at(-1);
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
  updateVariables,
  setVariablesState,
  disableSkip,
  setDocsOpen,
  setDocsType,
  setDocsTypeName,
  setPrevTypeName,
} = graphqlSlice.actions;

export default graphqlSlice.reducer;
