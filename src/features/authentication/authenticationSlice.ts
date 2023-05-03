import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    currentState: 'signUp',
  },
  reducers: {
    changeAuthState(state, action: PayloadAction<string>) {
      state.currentState = action.payload;
    },
  },
});

export const { changeAuthState } = authSlice.actions;
export default authSlice.reducer;
