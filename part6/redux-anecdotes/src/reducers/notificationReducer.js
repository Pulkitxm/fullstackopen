import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
    name:"notification",
    initialState:"Welcoe to Anecdotes Application",
    reducers:{
        changeNotification(state,action){
            return action.payload
        },
        removeNotification(state,action){
            return ""
        }
    }
})

export const {changeNotification,removeNotification} = notificationReducer.actions
export default notificationReducer.reducer