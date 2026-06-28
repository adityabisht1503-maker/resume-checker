import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './store/store.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Home from './Home.jsx';
import About from './About.jsx';
import Faq from './Faq.jsx';
import ResumeAnalyzer from './ResumeAnalyser.jsx';
import Pro from './Pro.jsx';

const route = createBrowserRouter([{path:"/",element:<App/>,
  children:[ {path:"/",element:<Home/>},
    {path:"home",element:<Home/>},
    
     { path: 'Login', element: <Login /> }, 
    {path:"Signup",element:<Signup/>},
     {path:"Faq",element:<Faq/>},
    {path:"About",element:<About/>},
  {element:<ProtectedRoute/>,
    children:[{path:"Resume",element:<ResumeAnalyzer/>},
    {path:"Pro",element:<Pro/>}]
  }]
}])
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <RouterProvider router={route}/>
  </Provider>
)
