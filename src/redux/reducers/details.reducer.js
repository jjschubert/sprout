// let details;
// let noNullTasks;

const detailsReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload
        case 'UNSET_DETAILS':
            return {}
        default:
            return state;
    }
}

export default detailsReducer;