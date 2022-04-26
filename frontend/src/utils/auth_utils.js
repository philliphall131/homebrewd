import axios from "axios"
import Cookie from "js-cookie"

const AuthAPI = {}
const BASE_URL = 'http://localhost:8000/api/'

// added for authentication
AuthAPI.getCsrfConfig = () => {
  return { 
    withCredentials: true, 
    headers: {
      'X-CSRFToken': Cookie.get("csrftoken")
    }
  }
}

AuthAPI.tryCatchFetch = async (axiosCall) => {
    try {
        const response = await axiosCall()
        return response.data
    }
    catch (e) {
        console.log('tryCatchFetch ERROR:', e)
        return null
    }
}

AuthAPI.logIn = async (loginData) => {
    let response = await AuthAPI.tryCatchFetch(()=> axios.post(`${BASE_URL}login/`, loginData, AuthAPI.getCsrfConfig()))
    return response
    
}

AuthAPI.signUp = async (signupData) => {
  console.log(signupData)
  let newUser = await AuthAPI.tryCatchFetch(()=> axios.post(`${BASE_URL}users/`, signupData, AuthAPI.getCsrfConfig()))
  if (newUser){
    return await AuthAPI.logIn(signupData)
  }
}

AuthAPI.logOut = async () => {
    return await AuthAPI.tryCatchFetch(() => axios.post(`${BASE_URL}logout/`, null, AuthAPI.getCsrfConfig()))
}

AuthAPI.deleteAccount = async (userId) => {
  return await AuthAPI.tryCatchFetch(() => axios.delete(`${BASE_URL}users/${userId}`, AuthAPI.getCsrfConfig()))
}

AuthAPI.updateUser = async (userId) => {
  return await AuthAPI.tryCatchFetch(() => axios.get(`${BASE_URL}users/${userId}`, AuthAPI.getCsrfConfig()))
}

AuthAPI.updateUserInfo = async (userId, data) => {
  return await AuthAPI.tryCatchFetch(() => axios.patch(`${BASE_URL}users/${userId}/`,data, AuthAPI.getCsrfConfig()))
}

AuthAPI.bfCreds = async (userId, data) => {
  return await AuthAPI.tryCatchFetch(() => axios.patch(`${BASE_URL}users/${userId}/`, data, AuthAPI.getCsrfConfig()))
}

AuthAPI.resetPassword = async (data) => {
  return await AuthAPI.tryCatchFetch(() => axios.post(`${BASE_URL}reset_password/`, data, AuthAPI.getCsrfConfig()))
}

export default AuthAPI