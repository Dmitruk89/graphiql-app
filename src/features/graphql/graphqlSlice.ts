import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DocsType, DocsField, DocsListItem } from '../../types/docsTypes';
export interface GraphqlState {
  editorCode: string;
  query: string;
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
