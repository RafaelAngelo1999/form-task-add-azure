import { combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import activeStepsReducer from './slices/activeStepsSlice';

const reducers = combineReducers({
  user: userReducer,
  activeSteps: activeStepsReducer,
});

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(thunk),
});

export default reducers;

export type AppDispatch = typeof store.dispatch;
export type State = ReturnType<typeof reducers>;
export type RootState = ReturnType<typeof store.getState>;
