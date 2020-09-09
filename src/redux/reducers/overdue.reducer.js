import moment from 'moment';
let todaysDate = moment(Date.now()).format('MMMM Do YYYY');
let overdueTasks;

const overdueReducer = (state = [], action) => {
  switch (action.type) {
    
    case 'SET_OVERDUE_TASKS':
            console.log(todaysDate);
                overdueTasks = action.payload.filter(( obj ) => {
                    return obj.due_date < todaysDate && obj.task_status === false;
                });
            console.log(overdueTasks);
            return overdueTasks;
 
    // case 'SET_OVERDUE_TASKS':
    //   return action.payload;
    case 'UNSET_TASKS':
      return [];
    default:
      return state;
  }
}

export default overdueReducer;