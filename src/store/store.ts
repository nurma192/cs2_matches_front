import { configureStore } from "@reduxjs/toolkit";
import matchSlice from "./matchSlice";
import { api } from "../app/api";

export const store = configureStore({
    reducer: {
        match: matchSlice.reducer,
        [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
