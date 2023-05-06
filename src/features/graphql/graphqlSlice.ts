import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GraphqlState {
  editorCode: string;
  query: string;
  isDocsOpen: boolean;
  docsWidth: number;
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
  isDocsOpen: false,
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
    setDocsOpen: (state, action: PayloadAction<boolean>) => {
      state.isDocsOpen = action.payload;
    },
  },
});

export const { updateEditor, createQuery, setDocsOpen } = graphqlSlice.actions;

export default graphqlSlice.reducer;
