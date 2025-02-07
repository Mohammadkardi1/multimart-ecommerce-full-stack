import { useEffect } from "react";
import "./App.css";
import { Layout } from "./components/Layout/Layout";
import { useDispatch } from 'react-redux';
import { authThunks } from './redux/slices/authSlice';
import decodeJWT from './utils/decodeJWT';



function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('profile'))?.token
    if (token) {
      const decodedToken = decodeJWT(token)
      if (decodedToken.exp * 1000 > new Date().getTime()) {
        try {
          dispatch(authThunks.loginByToken())
        } catch (error) {
          console.log(error)
        }
      } else {
        try {
          dispatch(authThunks.logout())
        } catch (error) {
            console.log(error)
        }
      }
    }
  }, [])

  return <Layout/>;
}

export default App;
