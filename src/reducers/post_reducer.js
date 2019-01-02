import _ from 'lodash'
import { C } from '../actions/'

export default (state = {}, action) => {
   switch(action.type) {
      case C.FETCH_POST:
			return { ...state, [action.payload.data.id]: action.payload.data }
      case C.FETCH_POSTS:
			return _.mapKeys(action.payload.data, 'id')
		case C.DELETE_POST:
			return _.omit(state, action.payload.id)
      default:
         return state
   }
}