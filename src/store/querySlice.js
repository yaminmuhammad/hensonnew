import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
    name: 'query',
    initialState: {
        value: [],
    },
    reducers: {
        setGif: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setGif } = querySlice.actions

export default querySlice.reducer