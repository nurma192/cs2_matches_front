import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Match } from "../types/types";

interface MatchState {
    match: Match | null;
}

const initialState: MatchState = {
    match: null,
}

const matchSlice = createSlice({
    name: "match",
    initialState,
    reducers: {
        setMatch: (state, action: PayloadAction<Match>) => {
            state.match = action.payload;
        },
        updateMatch: (state, action: PayloadAction<Match>) => {
            state.match = action.payload;
        }
    }
})

export const {setMatch, updateMatch} = matchSlice.actions;
export default matchSlice;