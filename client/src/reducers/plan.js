const planReducer = (state = null, action) => {
    switch(action.type){
        case 'FETCH_ALL_PLANS':
            return action.payload;
        default:
            return state;
    }
}


export default planReducer;