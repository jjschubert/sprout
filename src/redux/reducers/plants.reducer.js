const plantsReducer = (state=[], action) => {
    switch (action.type) {
        case 'SET_PLANTS':
          return action.payload;
          //must unset to protect data. Anytime you set, you must unset
          //would be dispatched when you click logout
        case 'UNSET_PLANTS':
          return [];
        default:
          return state;
      }
}

export default plantsReducer;