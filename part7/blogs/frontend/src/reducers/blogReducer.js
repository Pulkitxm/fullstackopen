import {createSlice} from '@reduxjs/toolkit';

const blogSlice = createSlice({
	name:"blogs",
	initialState:[],
	reducers:{
		createBlog(state,action){
			return state.concat(action.payload)
		},
		initializeBlogs(state,action){
			return action.payload
		}
	}
})

export const {createBlog} = blogSlice.actions
export default blogSlice.reducer

