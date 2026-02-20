import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
      // initially state is null, when we dispatch addUser action with user data, we want to update the state with that user data
      return action.payload; // this will replace the entire state with the new user data
    },
    removeUser: (state, action) => {
      // when we want to remove the user data, we can set the state back to null
      return null;
    },
  },
});

// this will generate action creators for us, which we can use to dispatch actions to update the state
export const { addUser, removeUser } = userSlice.actions;
// this will export the reducer function, which we can use to configure our store
export default userSlice.reducer;
