import { IMAGE_UPLOAD } from '../constants/ConstActionTypes'

const initialState = {
  contentDisplay: false
}

const reducerLayout = (state = initialState, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD:
      return {
        ...state,
        contentDisplay: action.bool
      }
    default:
      return state
  }
}

export default reducerLayout
