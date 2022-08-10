import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IAddTaskDefault {
  idUS: string;
  nameTasks: string;
  projeto: string;
  time: string;
  sprint: string;
}

const initialState: IAddTaskDefault = { idUS: '', nameTasks: 'null', projeto: '', time: '', sprint: '' };
export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    update: (state, action: PayloadAction<IAddTaskDefault>) => {
      state = action.payload;
    },
  },
});

export const { update } = userSlice.actions;

export default userSlice.reducer;
