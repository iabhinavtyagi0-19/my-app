import { useState } from 'react';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import AuthProvider  from './context/AuthContext';
import Landing from './pages/Landing';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Test from './pages/Test';
import SignIn from './pages/SignIn';
import AddProduct from './pages/AddProduct';
import ProductPage from './pages/ProductPage';
import Account from './pages/Account';
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import SellerInfo from "./pages/SellerInfo.jsx";
import Test1 from "./pages/Test1.jsx";
// import Order from "./pages/Order.jsx";
export default function App() {

    const router = createBrowserRouter([


                { path: '/', element: <Landing/> },
                { path: '/signUp', element: <SignUp/> },
                { path: '/home', element: <Home/> },
               {  path: '/login', element: <SignIn/> },
              {path: '/addProduct', element: <AddProduct/> },
               {path: '/product/:id', element: <ProductPage/> },
               {path: '/account', element: <Account/> },
        {path: '/t1', element: <Test1/> },
        {path: '/test', element: <Test/> },
        {path: '/about', element: <About/> },
        {path:'/contact', element: <Contact/> },
        {path:'/seller/:id',element:<SellerInfo/>}
              // {path: '/orders/:id', element: <Order/> },
        ])


    return  <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>

        ;
}