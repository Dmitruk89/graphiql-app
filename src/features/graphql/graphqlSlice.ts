import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocsType } from '../../types/docsTypes';

export interface GraphqlState {
  editorCode: string;
  varCode: string;
  query: string;
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
  varCode: ` {
   "name": "rick"
  }`,
  query: '',
  skipQuery: true,
  isDocsOpen: false,
  docsType: null,
  docsTypeName: 'Query',
  typeNameStack: ['Query'],
  docsWidth: 400,
};

export const graphqlSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    updateEditor: (state: GraphqlState, action: PayloadAction<string>) => {
      state.editorCode = action.payload;
    },
    updateVariables: (state: GraphqlState, action: PayloadAction<string>) => {
      state.varCode = action.payload;
    },
    createQuery: (state: GraphqlState, action: PayloadAction<string>) => {
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
  createQuery,
  updateVariables,
  disableSkip,
  setDocsOpen,
  setDocsType,
  setDocsTypeName,
  setPrevTypeName,
} = graphqlSlice.actions;

export default graphqlSlice.reducer;
