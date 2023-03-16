import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

export const authUserSlice = createSlice({
  name: 'authUser',
  initialState,
  reducers: {
    loginCrane: (state, action) => {
      const user = action.payload
      console.log(typeof user)
      return (state = { ...user })
    },
    logOutToCrane: (state, action) => {
      return (state = {})
    },
  },
})

export const { loginCrane, logOutToCrane } = authUserSlice.actions

export const authUserData = (state) => state.authUser
export default authUserSlice.reducer
