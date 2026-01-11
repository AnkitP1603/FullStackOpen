import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: '',
    type: '',
  },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return {
        message: '',
        type: '',
      }
    },
  },
})

let timeoutId = null

export const notify = (message, type = 'success', timeout = 5) => {
  console.log('showing notification', message, type)
  return (dispatch) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    dispatch(setNotification({ message, type }))

    timeoutId = setTimeout(() => {
      dispatch(resetNotification())
      timeoutId = null
    }, timeout * 1000)
  }
}

export const { setNotification, resetNotification } = notificationSlice.actions
export default notificationSlice.reducer
