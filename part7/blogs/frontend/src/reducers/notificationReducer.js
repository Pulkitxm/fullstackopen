import { createSlice } from "@reduxjs/toolkit";

const notificationReducer = createSlice({
    name:"notification",
    initialState:"",
    reducers:{
        changeNotification(state,action){
        	console.log(`notification is changed with payload ${action.payload}`)
		return action.payload
        },
        removeNotification(state,action){
            return ""
        }
    }
})

export const {changeNotification,removeNotification} = notificationReducer.actions
export default notificationReducer.reducer
