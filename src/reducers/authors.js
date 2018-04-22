let initialState = []

export default (state = initialState, action) => {
  switch(action.type){
    case 'FETCH_AUTHORS_PENDING':
      return state
    case 'FETCH_AUTHORS_FULFILLED':
      return [...action.payload.data]
    case 'FETCH_AUTHORS_REJECTED':
      return state
    default:
      return state;
  }
}
