const subReducer = (state = null, action) => {
    switch(action.type){
        case 'CREATE_SUBSCRIPTION':
            return action.payload;
        default:
            return state;
    }
}


export default subReducer;