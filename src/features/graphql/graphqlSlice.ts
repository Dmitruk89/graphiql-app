import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GraphqlState {
  editorCode: string;
  query: string;
  skipQuery: boolean;
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
  },
});

export const { updateEditor, createQuery, disableSkip } = graphqlSlice.actions;

export default graphqlSlice.reducer;
