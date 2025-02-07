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
const CART_PATH = '/api/cart'


export const authAPI = {
  registerUser: (userInfo) => API.post(`${AUTH_PATH}/register`, userInfo),
  loginUser : (userInfo) => API.post(`${AUTH_PATH}/login`, userInfo),
  verifyEmail : (userInfo) => API.get(`${AUTH_PATH}/${userInfo.id}/verify/${userInfo.token}`),
}

export const productAPI = {
  addProduct: (productInfo) => API.post(`${PRODUCT_PATH}/addProduct`, productInfo),
  getRandomProducts: (count) => API.get(`${PRODUCT_PATH}/randomProducts?count=${count}`),
  filteredProducts: (queryParams) => API.get(`${PRODUCT_PATH}/filteredProducts?${queryParams}`),
  getProductByID: (productID) => API.get(`${PRODUCT_PATH}/productByID/${productID}`),
  deleteProduct: (productID) => API.delete(`${PRODUCT_PATH}/deleteProduct/${productID}`),
}

// http://localhost:5000/api/cart/add
export const cartAPI = {
  addCart: (cartInfo) => API.post(`${CART_PATH}/add`, cartInfo),
  removeCart: (productID) => API.delete(`${CART_PATH}/remove/${productID}`),

}