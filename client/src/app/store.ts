import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});

// // comment in if any error occur
// export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
