import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    email: '' as string,
    role: '' as string
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.email = payload.email;
      state.role = payload.role;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
