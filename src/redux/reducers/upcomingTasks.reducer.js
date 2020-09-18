import moment from 'moment';

const upcomingReducer = (state = [], action) => {
  switch (action.type) {

    case 'SET_UPCOMING_TASKS':
      let todaysDate = moment('05/15/2020')
      let dateBefore = moment('05/15/2020').add(8, 'd').startOf('day');
      let upcomingTasks;
      upcomingTasks = action.payload.filter((obj) => {
        return moment(obj.due_date).isAfter(todaysDate, 'day') && obj.task_status === false && moment(obj.due_date).isBefore(dateBefore, 'day')
      });
      return upcomingTasks;

    case 'UNSET_TASKS':
      return [];
    default:
      return state;
  }
}

export default upcomingReducer;