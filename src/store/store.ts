import { configureStore } from "@reduxjs/toolkit";
import matchSlice from "./matchSlice";

export const store = configureStore({
    reducer: {
        match: matchSlice.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;