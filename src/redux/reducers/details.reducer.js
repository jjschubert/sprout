// let details;
// let noNullTasks;

const detailsReducer = (state = {}, action) => {
    switch (action.type) {
    
        //return includes only tasks with due date for that plant
        //not currently in use
        // case 'SET_LIMITED_DETAILS':
        //     console.log(action.payload)

        //         details = action.payload
        //         noNullTasks = details.filter(( obj ) => {
        //             return obj.due_date !== null;
        //         });
        //     console.log(noNullTasks);
        //     return noNullTasks;
        //return includes all tasks for that plant
        case 'SET_DETAILS':
            return action.payload
        default:
            return state;
    }
}

export default detailsReducer;