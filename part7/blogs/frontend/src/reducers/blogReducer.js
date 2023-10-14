import {createSlice} from '@reduxjs/toolkit';
import { all } from 'axios';

const blogSlice = createSlice({
	name:"blogs",
	initialState:[],
	reducers:{
		createBlog(state,action){
			return state.concat(action.payload)
		},
		initializeBlogs(state,action){
			return action.payload
		},
		addLike(state,action){
			const ID = action.payload
			const allBlogs = JSON.parse(JSON.stringify(state))
			// console.log(ID,allBlogs.map(i=>i.id));
			return allBlogs.map(b => {
				if (b.id==ID){
					return {...b,likes:b.likes+1}
				}
				return b
			});
		},
		deleteBlog(state,action){
			const allBlogs = JSON.parse(JSON.stringify(state))
			return (allBlogs.filter(b => {
				if (b.id==action.payload)
					return false
				return true
			}));
		}
	}
})

export const {createBlog,addLike} = blogSlice.actions
export default blogSlice.reducer

