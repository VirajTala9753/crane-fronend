import api from './message'

export class searchApi {
  static searchemail = async ({ email }) => {
    console.log(email, 'email')
    try {
      const res = await api.get(`users/searchEmail?key=${email}`)
      console.log(res, 'response')

      return res
    } catch (error) {
      console.log(error)
      return { error }
    }
  }
}     

export class updateApi {
  static updateId = async ({ selectedUserId, channelId }) => {
    console.log(selectedUserId, channelId, 'mmm')
    try {
      const res = await api.put('users/searchEmail', {
        selectedUserId,
        channelId,
      })
      console.log(res, 'resid')
      return res
    } catch (error) {
      console.log(error, 'error id')
      return error
    }
  }
}
