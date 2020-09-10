import moment from 'moment';
let todaysDate = moment(Date.now()).format('MMMM Do YYYY');
let upcomingTasks;
let dateFrom = moment().add(3,'d').format('MMMM Do YYYY');

const upcomingReducer = (state = [], action) => {
  switch (action.type) {
    
    case 'SET_UPCOMING_TASKS':
            console.log(todaysDate);
            console.log(dateFrom)
                upcomingTasks = action.payload.filter(( obj ) => {
                    return obj.due_date > todaysDate && obj.due_date < (todaysDate +3) && obj.task_status === false;
                });
            console.log(upcomingTasks);
            return upcomingTasks;
 
    case 'UNSET_TASKS':
      return [];
    default:
      return state;
  }
}

export default upcomingReducer;