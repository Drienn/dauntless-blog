let initialState = []

export default (state = initialState, action) => {
  switch(action.type){
    case 'FETCH_COMMENTS_PENDING':
      return state
    case 'FETCH_COMMENTS_FULFILLED':
      return [...action.payload.data]
    case 'FETCH_COMMENTS_REJECTED':
      return state
      case 'ADD_COMMENTS_PENDING':
        return state
      case 'ADD_COMMENTS_FULFILLED':
        return [action.payload.data, ...state]
      case 'ADD_COMMENTS_REJECTED':
        return state
    default:
      return state
  }
}
