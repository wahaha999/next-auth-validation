import { createSlice } from "@reduxjs/toolkit/react";
import { useAppSelector } from "@/redux/hooks";
import { UserData } from "@/types/user";

export interface UserState {
    user: UserData
}

const initialState: UserState = {
    user: {
        id: "",
        name: "",
        email: "",
        password: ""
    }
}
export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },

        resetUser() {
            return initialState
        }
    }
});

export const {setUser, resetUser} = userSlice.actions;
export const useUserState = () => useAppSelector((state) => state.user)
export default userSlice.reducer;