import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: '',
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = '';
        },

    }
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: any) => state.user.user;

export default userSlice.reducer;