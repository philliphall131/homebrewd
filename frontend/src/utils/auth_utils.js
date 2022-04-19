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

const tryCatchFetch = async (axiosCall) => {
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
    let response = await tryCatchFetch(()=> axios.post(`${BASE_URL}login/`, loginData, AuthAPI.getCsrfConfig()))
    return response
    
}

AuthAPI.signUp = async (signupData) => {
  let newUser = await tryCatchFetch(()=> axios.post(`${BASE_URL}users/`, signupData, AuthAPI.getCsrfConfig()))
  console.log('newUser', newUser)
  if (newUser){
    return await AuthAPI.logIn(signupData)
  }
}

AuthAPI.logOut = async () => {
    return await tryCatchFetch(() => axios.post(`${BASE_URL}logout/`, null, AuthAPI.getCsrfConfig()))
}

export default AuthAPI