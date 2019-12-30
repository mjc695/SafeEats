import axios from 'axios'

// ACTION TYPE
const GET_USER = 'GET_USER'

// INITIAL STATE
const defaultUser = {}

// ACTION CREATOR
const getUser = user => ({ type: GET_USER, user })

// THUNK CREATOR

export const me = () => async dispatch => {
  try {
    const { data } = await axios.get('/auth/me')
    dispatch(getUser(data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

// REDUCER

export default function (state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    default:
      return state
  }
}
