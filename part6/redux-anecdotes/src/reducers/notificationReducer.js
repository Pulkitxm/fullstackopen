import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
    name:"notification",
    initialState:"Welcoe to Anecdotes Application",
    reducers:{
        changeNotification(state,action){
            console.log("notification to be changed");
        }
    }
})

export const {changeNotification} = notificationReducer.actions
export default notificationReducer.reducer