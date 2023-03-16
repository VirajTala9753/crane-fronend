import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    active: true,
    src: 'https://filmfare.wwmindia.com/content/2021/jun/rashmikamandanna41624856553.jpg',
    username: 'rashmika.piyush143',
    email: 'piyush.vaviya27@gmail.com',
    _id: '63332c201a1b6747543dbfcf',
    isLogin: true,
    selected: false,
  },
  {
    active: true,
    src: 'https://i.pinimg.com/736x/58/1e/fa/581efa65cec3ff19597aabfdfcb0a2d5.jpg',
    username: 'kiara.yagnesh7446',
    email: 'yasanghani7446@gmail.com',
    _id: '63355f7239091f4cd46bed8a',
    isLogin: '',
    selected: false,
  },
  {
    active: false,
    src: '',
    // src: "https://assets.vogue.in/photos/601bfddd3514c40d2b37e596/master/pass/jacqueline%20fernandez%20makeup%20skincare.jpg",
    username: 'jacqueline.fernandez45',
    _id: '63355f7539091f4cd43bed8a',
    selected: false,
  },
  {
    active: true,
    //  src :"https://assets.vogue.in/photos/601bfddd3514c40d2b37e596/master/pass/jacqueline%20fernandez%20makeup%20skincare.jpg",
    src: 'https://www.the-sun.com/wp-content/uploads/sites/6/2021/01/NINTCHDBPICT000631473456.jpg',
    username: 'mia.malkova69',
    _id: '63355g7539091f8cd43bed8a',
    selected: false,
  },
]

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const userInformation = action.payload
      const isUserExist = state.findIndex(({ email }) => userInformation.email === email)
      if (isUserExist === -1) {
        return [...state, { ...userInformation }]
      }
      state[isUserExist].isLogin = true
    },

    setLoginFalse: (state, action) => {
      const isUserLoginIndex = state.findIndex(({ isLogin }) => isLogin === true)

      state[isUserLoginIndex].isLogin = false
    },
  },
})

export const { addUser, setLoginFalse } = userSlice.actions

export const userData = (state) => state.user

export default userSlice.reducer
