import { createSlice } from '@reduxjs/toolkit';

interface IUserForm {
  user: number;
}

const initialState: IUserForm = {
  user: 0,
};

export const activeStepsSlice = createSlice({
  name: 'activeStepsSlice',
  initialState,
  reducers: {
    addActiveStepUser: (state) => {
      state.user += 1;
    },
    removeActiveStepUser: (state) => {
      state.user -= 1;
    },
  },
});

export const { addActiveStepUser, removeActiveStepUser } = activeStepsSlice.actions;

export default activeStepsSlice.reducer;
