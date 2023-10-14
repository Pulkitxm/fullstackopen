import {createSlice} from '@reduxjs/toolkit'

const usersReducer = createSlice({
    name:"users",
    initialState:[],
    reducers:{
        initialize(state,action){
            return action.payload
        }
    }
})

export const {initialize} = usersReducer.actions
export default usersReducer.reducer