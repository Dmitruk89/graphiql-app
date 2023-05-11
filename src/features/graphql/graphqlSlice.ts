import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocsType } from '../../types/docsTypes';
export interface GraphqlState {
  editorCode: string;
  query: string;
  skipQuery: boolean;
  isDocsOpen: boolean;
  docsWidth: number;
  docsType: DocsType | null;
  docsTypeName: string | undefined;
  typeNameStack: string[];
}
//const vari = { $id: 1 };

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
    updateEditor: (state, action: PayloadAction<string>) => {
      state.editorCode = action.payload;
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

[1, 2, 3];

export const {
  updateEditor,
  createQuery,
  disableSkip,
  setDocsOpen,
  setDocsType,
  setDocsTypeName,
  setPrevTypeName,
} = graphqlSlice.actions;

export default graphqlSlice.reducer;
