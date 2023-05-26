import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HeadersStateType, VariablesStateType } from '../../types/types';
import { DocsType, DocsField, DocsListItem } from '../../types/docsTypes';

export interface GraphqlState {
  placeholderVar: string;
  placeholderVarCode: string;
  placeholderCode: string;
  editorCode: string;
  varQueryCode: string;
  variablesState: VariablesStateType;
  query: string;
  varQuery: string;
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
  isAccordionExpanded: boolean;
}

const initialState: GraphqlState = {
  placeholderVar: `
  { 
    "id": 1
  }`,
  placeholderVarCode: `
  query GetCharacter($id: ID!) {
    character(id: $id) {
      name
      status
      species
      type
      gender
    }
  }
`,
  placeholderCode: `query {
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
  editorCode: '',
  varQueryCode: '',
  variablesState: 'empty',
  query: '',
  varQuery: '',
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
  isAccordionExpanded: false,
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
    setVariablesQuery: (state) => {
      state.varQuery = state.varQueryCode;
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
    setIsAccordionExpanded: (state, action: PayloadAction<boolean>) => {
      state.isAccordionExpanded = action.payload;
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
  setVariablesQuery,
  disableSkip,
  setDocsOpen,
  setDocsType,
  setDocsTypeName,
  setDocsListName,
  setPrevListName,
  setDocsField,
  setIsTypeQuery,
  setIsAccordionExpanded,
} = graphqlSlice.actions;

export default graphqlSlice.reducer;
