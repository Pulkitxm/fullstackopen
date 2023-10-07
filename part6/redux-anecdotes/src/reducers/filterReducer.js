const filterReducer = (state="",action) => {
    switch(action.type){
        case "SET_FILTER":
            return action.payload
        default:
            return state;
    }
}

export const filterChange = type => {
    return {
        type:"SET_FILTER",
        payload:type
    }
}

export default filterReducer