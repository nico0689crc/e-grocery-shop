// Third-party Imports
import { configureStore } from '@reduxjs/toolkit';

import basicReducer from '@/redux-store/slices/basic';

export const store = configureStore({
  reducer: {
    basicReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
