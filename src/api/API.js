import axios from 'axios'



// creates an instance of axios named API.
// configure common options baseURL and headers for all HTTP requests made with this API instance
const API = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
})


// add the following headers to each outgoing HTTP request
API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
      req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
  }
  return req
})


const AUTH_PATH = '/api/auth'
const PRODUCT_PATH = '/api/product' 




export const authAPI = {
  registerUser: (userInfo) => API.post(`${AUTH_PATH}/register`, userInfo),
  loginUser : (userInfo) => API.post(`${AUTH_PATH}/login`, userInfo),
  verifyEmail : (userInfo) => API.get(`${AUTH_PATH}/${userInfo.id}/verify/${userInfo.token}`),

}



export const productAPI = {
  addProduct: (productInfo) => API.post(`${PRODUCT_PATH}/addProduct`, productInfo)
//   fetchDoctors: () => API.get(`${PRODUCT_PATH}/fetchDoctors`),
//   fetchDoctor: (doctorID) => API.get(`${PRODUCT_PATH}/fetchDoctor/${doctorID}`),
//   updateDoctor: (loggedInUser) => API.patch(`${PRODUCT_PATH}/updateDoctor/${loggedInUser._id}`, loggedInUser),
//   deleteDoctor: (doctorID) => API.delete(`${PRODUCT_PATH}/deleteDoctor/${doctorID}`),
//   submitReview: (doctorID, reviewData) => API.post(`${PRODUCT_PATH}/${doctorID}/review`, reviewData), 
//   searchDoctors: (doctorName) => API.get(`${PRODUCT_PATH}/search?doctorName=${doctorName}`), 

}

// export const patientAPI = {
//   deletePatient: (patientID) => API.delete(`${PATIENT_PATH}/deletePatient/${patientID}`),
  
// }