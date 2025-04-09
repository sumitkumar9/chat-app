import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
    _id: string;
    name: string;
    email: string;
    username: string;
    avatar: {
        public_id: string;
        url: string;
    };
    createdAt: string;
    updatedAt: string;
    __v: number;
}
type InitialState = {
    user: User | null;
    isAuthenticated: boolean;
    loader: boolean;
};

const initialState: InitialState = {
        user: null,
        isAuthenticated: false,
        loader: true,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userExists: (state, action: PayloadAction<User>) => {
            console.log("userExists", action);
            state.user = action.payload;
            state.isAuthenticated = !!action.payload;
            state.loader = false
        },
        userNotExists: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.loader = false
        }
    }
})

export default authSlice;
export const { userExists, userNotExists } = authSlice.actions;