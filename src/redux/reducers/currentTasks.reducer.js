import moment from 'moment';
let todaysDate = moment(Date.now()).format('MMMM Do YYYY');
let todaysTasks;

const currentTasksReducer = (state = [], action) => {
  switch (action.type) {
    
    case 'SET_CURRENT_TASKS':
            console.log(todaysDate);
                todaysTasks = action.payload.filter(( obj ) => {
                    return moment(obj.due_date).format('MMMM Do YYYY') === todaysDate && obj.task_status === false;
                });
            console.log(todaysTasks);
            return todaysTasks;
 
    // case 'SET_OVERDUE_TASKS':
    //   return action.payload;
    case 'UNSET_TASKS':
      return [];
    default:
      return state;
  }
}

export default currentTasksReducer;