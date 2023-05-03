import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authSlice',
  initialState: {
    currentState: localStorage.getItem('authState') || 'signUp',
  },
  reducers: {
    changeAuthState(state, action: PayloadAction<string>) {
      state.currentState = action.payload;
      localStorage.setItem('authState', action.payload);
    },
  },
});

export const { changeAuthState } = authSlice.actions;
export default authSlice.reducer;
