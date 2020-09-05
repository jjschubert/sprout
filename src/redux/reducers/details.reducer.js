const detailsReducer = (state = {}, action) => {
    switch (action.type) {
        // case 'SEND_ID':
        //     console.log(action.payload)
        //     id = action.payload
        //     return state;
        case 'SET_DETAILS':
            console.log(action.payload)
            return action.payload
        default:
            return state;
    }
}

export default detailsReducer;