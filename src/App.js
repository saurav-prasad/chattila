import { useEffect, useRef } from 'react';
import './App.css';
import Home from './components/home/Home';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login/Login';
import Signup from './components/Signup/Signup';
import { ErrorPage } from './components/errorPage/ErrorPage'
import { useDispatch, } from 'react-redux';
import { login } from './redux/functions/auth';
import { setConvos } from './redux/functions/convos';
import { setAllUsers } from './redux/functions/allUsers';
import fetchUsers from './functions/fetchUser';
import getAllUsers from './functions/getAllUsers'
import fetchConvos from './functions/fetchConvos'

function App() {

  const divRef = useRef(null);
  const dispatch = useDispatch()

  useEffect(() => {
    if (divRef.current) {
      divRef.current.style.height = `${window.innerHeight}px`;
    }
  }, []);

  useEffect(() => {
    async function fetchData() {

      if (localStorage.getItem('token')) {
        try {
          // console.log(localStorage.getItem('token'));
          const user = await fetchUsers()
          // console.log("fetchUsers", fetchUsers.data);
          dispatch(login({ ...user.data }))

          const allUsers = await getAllUsers()
          // console.log("getAllUsers", getAllUsers);
          dispatch(setAllUsers(allUsers.data))

          const convos = await fetchConvos()
          // console.log(convos);
          // console.log("fetchConvos", convos);
          dispatch(setConvos({ ...convos.data }))
        } catch (error) {
          console.log(error);
        }
      }
    }
    fetchData()
  }, [])


  const router = createBrowserRouter([
    {
      path: '/',
      element: <>
        <Home />
      </>
    },
    {
      path: '/:userid',
      element: <>
        <Home />
      </>
    },
    {
      path: "/login",
      element: <>
        <Login />
      </>
    },
    {
      path: "/signup",
      element: <>
        <Signup />
      </>
    },
    {
      path: "*",
      element: <>
        <ErrorPage />
      </>
    }
  ])

  return (
    <div ref={divRef} >
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
