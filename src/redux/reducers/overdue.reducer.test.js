import overdue from './overdueTasks.reducer.js';

describe('TESTING OVERDUE REDUCER', () => {

    test('initial state is an array', () => {
        let testAction = {}
        let returnedState = overdue(undefined, testAction)

        expect(returnedState).toEqual([])
    })

})