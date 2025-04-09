import { configureStore } from '@reduxjs/toolkit';
import authSlice from './reducers/auth';

const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
    },
})

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;